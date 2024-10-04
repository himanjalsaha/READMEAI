"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { GithubIcon, AlertCircle, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Component() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark")
  }

  const handleSignIn = async () => {
    setIsLoading(true)
    setError("")
    try {
      await signIn("github", { callbackUrl: "/home" })
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
    setIsLoading(false)
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">README Creator</h1>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md mb-4"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {session ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Welcome, {session.user.name || session.user.email}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">You're ready to create awesome READMEs!</p>
            <button
              onClick={() => router.push("/home")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {isLoading ? "Let's go..." : "Start Creating READMEs"}
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">Sign in to edit your README files</p>
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 py-2 px-4 rounded-md hover:bg-gray-900 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-800 mr-2"></span>
                  Processing...
                </span>
              ) : (
                <>
                  <GithubIcon className="mr-2 h-5 w-5" />
                  Sign in with GitHub
                </>
              )}
            </button>
          </div>
        )}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {session && (
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none focus:underline transition-colors duration-200"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  )
}