"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default function AuthHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white">
            AI Resume Scanner
          </Link>
          
          {session ? (
            <div className="flex items-center space-x-4">
              <Link href="/auth/profile">
                <Button variant="ghost" className="text-white hover:bg-gray-800">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-gray-800"
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}