import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import api from '@/lib/axios'
import { toast } from '@/components/ui/use-toast'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/token/', {
        username,
        password,
      })
      login(response.data)
      navigate('/dashboard')
      toast({
        title: "Success!",
        description: "Welcome back!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Welcome back!</h2>
            <p className="mt-2 text-gray-400">
              Sign in to your ContentBuddy account
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
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Don't have an account? Register
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
              Your AI companion for creating engaging content. Generate ideas, write scripts, and manage your content effortlessly.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Smart Content Generation</h3>
                <p className="text-gray-400">Generate engaging content ideas and scripts powered by AI</p>
              </div>
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Effortless Management</h3>
                <p className="text-gray-400">Organize and manage your content ideas in one place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 