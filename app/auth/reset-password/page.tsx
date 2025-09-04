"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get token from URL params (in a real app, you would validate this token)
  const token = searchParams.get("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    
    setLoading(true)
    setMessage("")
    setError("")

    try {
      // In a real application, you would make an API call to reset the password
      // using the token to identify which user's password to change
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage("Password successfully reset. You can now sign in with your new password.")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // In a real application, you would validate the token first
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl space-y-6">
          <h1 className="text-3xl font-bold text-center">Invalid Request</h1>
          <p className="text-gray-300 text-center">
            This password reset link is invalid or has expired.
          </p>
          <div className="text-center">
            <Link href="/auth/login" className="text-blue-400 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <p className="text-gray-300 text-center">
          Enter your new password below.
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
        
        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Reset Password"}
            </Button>
          </form>
        )}
        
        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}