"use client"

import { useState, useRef, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, User, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfilePopover() {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={popoverRef}>
      {/* Avatar Button */}
      <Button
        variant="ghost"
        className="rounded-full p-2 hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile"
      >
        <User className="h-5 w-5 text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 z-50"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/95 backdrop-blur-xl shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                <div>
                  <h3 className="text-lg font-semibold text-white">Profile</h3>
                  <p className="text-xs text-gray-400">Manage your account</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-1 h-auto"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info */}
              <div className="px-4 py-5">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-base">
                      {session?.user?.name || "Guest User"}
                    </p>
                    <p className="text-sm text-gray-400">{session?.user?.email || "N/A"}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-700"></div>

                {/* Extra Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-gray-300 font-mono text-xs">
                      {session?.user?.id?.substring(0, 8) || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-800/70">
                <Button
                  variant="outline"
                  className="w-full border-gray-100 text-gray-500 hover:bg-red-600 hover:text-white transition"
                  onClick={() => {
                    setIsOpen(false)
                    signOut({ callbackUrl: "/auth/login" })
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
