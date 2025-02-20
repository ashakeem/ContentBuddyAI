import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // API call would go here
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setLoading(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Notification Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-gray-400 text-sm">Receive notifications about your content generation</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <div>
                <h3 className="text-white font-medium">Marketing Emails</h3>
                <p className="text-gray-400 text-sm">Receive updates about new features</p>
              </div>
              <button
                onClick={() => setMarketingEmails(!marketingEmails)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  marketingEmails ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  marketingEmails ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">API Settings</h2>
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter your API key"
              />
            </div>

            {message.text && (
              <div className={`p-3 rounded-lg ${
                message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}