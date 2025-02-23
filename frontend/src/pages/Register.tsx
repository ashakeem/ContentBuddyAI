import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import api from '@/lib/axios'
import { toast } from '@/components/ui/use-toast'
import { PasswordInput } from '@/components/PasswordInput'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/register/', {
        username,
        password,
      })
      navigate('/login')
      toast({
        title: "Success!",
        description: "Account created! Please login to continue.",
      })
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Join ContentBuddy.ai today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Choose a username"
                  />
                </div>

                <PasswordInput
                  label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  "Create Account"
                )}
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
      </div>

      {/* Right side - Content */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        
        <div className="relative max-w-xl space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Create Amazing Content with AI
            </h2>
          </div>

          <div className="grid gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Streamline Your Content Creation
              </h3>
              <p className="text-gray-300">
                Generate engaging content ideas, outlines, and scripts in seconds using advanced AI technology.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Target Your Audience
              </h3>
              <p className="text-gray-300">
                Create content tailored to your specific audience and niche with AI-powered insights.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Boost Your Productivity
              </h3>
              <p className="text-gray-300">
                Save hours of brainstorming and planning with our intelligent content generation tools.
              </p>
            </div>
          </div>

          <div className="text-center text-gray-400 mt-8">
            Join thousands of content creators who trust ContentBuddy.ai
          </div>
        </div>
      </div>
    </div>
  )
} 