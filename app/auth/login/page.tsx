"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2, Mail, HardDrive } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            setError("Invalid email or password")
        } else {
            window.location.href = "/"
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center">Login</h1>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-md p-3 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-blue-400 hover:underline"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Login"}
                    </Button>
                </form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center space-x-2 bg-red-500 hover:bg-red-600"
                    >
                        <Mail className="h-5 w-5" /> <span>Google</span>
                    </Button>


                </div>

                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-blue-400 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}