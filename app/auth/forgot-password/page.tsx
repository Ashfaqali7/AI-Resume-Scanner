"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      // In a real application, you would make an API call to send a password reset email
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage("If an account exists with that email, you will receive a password reset link.")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        <p className="text-gray-300 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        {message && (
          <div className="bg-green-500/20 border border-green-500 rounded-md p-3 text-sm">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-md p-3 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}