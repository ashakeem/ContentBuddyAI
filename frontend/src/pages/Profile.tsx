import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import api from '@/lib/axios'
import Layout from '@/components/Layout'
import { useNavigate } from 'react-router-dom'
import { PasswordInput } from '@/components/PasswordInput'

export default function Profile() {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.put('/users/me/', {
        username,
        ...(password && { password })
      })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setPassword('')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setLoading(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    setDeleteLoading(true)
    try {
      await api.delete('/users/me/')
      logout()
      navigate('/login')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account' })
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your account preferences</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <PasswordInput
              label="New Password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />

            {message.text && (
              <div className={`p-3 rounded-lg ${
                message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {deleteLoading ? "Deleting Account..." : "Delete Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
} 