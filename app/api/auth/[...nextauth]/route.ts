import NextAuth, { AuthOptions, SessionStrategy, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// In a real application, you would use a database to store users
// For now, we'll use an in-memory array to simulate user storage
let users: { id: string; name: string; email: string; password: string }[] = []

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/drive.readonly'
                }
            }
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                // Find user in our "database"
                const user = users.find(
                    u => u.email === credentials.email && u.password === credentials.password
                )

                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
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
                token.name = user.name
            }
            return token
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                }
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }