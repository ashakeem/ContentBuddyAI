import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <h1 className="text-8xl font-bold text-white relative">404</h1>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">Page not found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Oops! It seems like this page has wandered off into the digital void.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}