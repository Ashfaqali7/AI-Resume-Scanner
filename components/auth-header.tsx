"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import ProfilePopover from "@/components/profile-popover"

export default function AuthHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white">
            AI Resume Scanner
          </Link>

          {session ? (
            <div className="flex items-center space-x-2">
              <ProfilePopover />
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-gray-800 flex items-center space-x-1">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}