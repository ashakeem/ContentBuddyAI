import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/axios'
import { toast } from '@/components/ui/use-toast'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      await api.post('/register/', {
        username,
        password,
      })
      toast({
        title: "Success!",
        description: "Account created successfully. Please login.",
      })
      navigate('/login')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Username might be taken.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Create an account</h2>
            <p className="mt-2 text-gray-400">
              Join ContentBuddy and start creating amazing content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image/Content */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="text-center space-y-6">
            <div className="text-4xl font-bold text-white">
              ContentBuddy<span className="text-blue-500">.ai</span>
            </div>
            <p className="text-xl text-gray-300 max-w-md">
              Join our community of content creators and start generating engaging content with AI today.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Content</h3>
                <p className="text-gray-400">Create engaging content with the help of advanced AI technology</p>
              </div>
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Free to Use</h3>
                <p className="text-gray-400">Get started with ContentBuddy at no cost</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 