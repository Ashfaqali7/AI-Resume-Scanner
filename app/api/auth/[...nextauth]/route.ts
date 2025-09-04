import NextAuth, { AuthOptions, SessionStrategy } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Simple hardcoded user example (replace with API/DB later if needed)
                const user = { id: "1", name: "Test User", email: "test@example.com", password: "123456" }

                if (
                    credentials?.email === user.email &&
                    credentials?.password === user.password
                ) {
                    return user
                }
                return null
            },
        }),
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                }
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }