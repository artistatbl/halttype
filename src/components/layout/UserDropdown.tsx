"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"
import { UserIcon } from "lucide-react"

interface UserDropdownProps {
  className?: string
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { data: session, isPending } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get user info from session - only first name
  const displayUser = session?.user ? {
    name: (session.user.name || session.user.email?.split('@')[0] || 'User').split(' ')[0],
    email: session.user.email || '',
    image: session.user.image || ''
  } : {
    name: "Guest",
    email: "",
    image: ""
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {session ? (
        /* User Avatar Button when signed in */
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-800/50 transition-colors"
        >
          {/* User Avatar or Initials Circle */}
          {displayUser.image ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image 
                src={displayUser.image}
                alt={`${displayUser.name}'s avatar`}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-zinc-900 text-xs font-medium">
              {getInitials(displayUser.name || '')}
            </div>
          )}
          
          {/* Username */}
          <span className="text-sm text-zinc-300">{displayUser.name}</span>
          
          {/* Dropdown Arrow */}
          <svg
            className={cn(
              "w-3 h-3 text-zinc-500 transition-transform",
              isOpen && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        /* User Icon Button when signed out */
        <button
          onClick={() => router.push('/sign')}
          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-800/50 transition-colors"
        >
          <UserIcon className="w-5 h-5 text-zinc-400" />
          <span className="text-sm text-zinc-400">Sign In</span>
        </button>
      )}

      {/* Dropdown Menu - only show when signed in and dropdown is open */}
      {session && isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-zinc-900 border border-zinc-800/50 rounded shadow-lg py-1 z-50 text-xs">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-zinc-800/50">
            <p className="font-medium text-zinc-300">{displayUser.name}</p>
            <p className="text-zinc-500 text-xs">{displayUser.email}</p>
          </div>
          
          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
            
            <Link
              href="/account"
              className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Account Settings
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              User Settings
            </Link>
          </div>
          
          {/* Divider */}
          <div className="border-t border-zinc-800/50 my-0.5"></div>
          
          {/* Sign Out */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-zinc-800/50 transition-colors w-full text-left"
            onClick={() => {
              setIsOpen(false)
              signOut()
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}