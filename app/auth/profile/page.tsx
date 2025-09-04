"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else if (status === "authenticated") {
      setLoading(false)
    }
  }, [status, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">User Information</h2>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span>{session?.user?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span>{session?.user?.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span>{session?.user?.id || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}