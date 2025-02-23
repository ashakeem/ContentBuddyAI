import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useUser } from '@/contexts/UserContext'
import api from '@/lib/axios'
import { toast } from '@/components/ui/use-toast'
import ContentSkeleton from '@/components/ContentSkeleton'
import ConfirmDialog from '@/components/ConfirmDialog'
import Layout from '@/components/Layout'
import { Loader2 } from 'lucide-react'

interface ContentIdea {
  id: number
  title: string
  target_audience: string
  description: string
  hook: string
  outline: string[]
  tags: string[]
  status: string
  script?: {
    content: string
    version: number
  }
}

export default function Dashboard() {
  // const navigate = useNavigate()
  // const location = useLocation()
  // const { logout } = useUser()
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [title, setTitle] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null)
  const [scriptContent, setScriptContent] = useState('')
  const [isEditingScript, setIsEditingScript] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  // const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/content-ideas/')
      setIdeas(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch content ideas",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredIdeas = ideas
    .filter(idea =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/generate/', {
        title,
        target_audience: targetAudience
      })
      setIdeas([response.data, ...ideas])
      setTitle('')
      setTargetAudience('')
      toast({
        title: "Success!",
        description: "Content generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteIdea = async (id: number) => {
    try {
      await api.delete(`/content-ideas/${id}/`)
      setIdeas(ideas.filter(idea => idea.id !== id))
      toast({
        title: "Success",
        description: "Content idea deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content idea",
        variant: "destructive"
      })
    }
  }

  const handleUpdateScript = async (contentIdeaId: number) => {
    try {
      await api.put(`/content-ideas/${contentIdeaId}/script/`, {
        content: scriptContent
      })
      fetchIdeas() // Refresh to get updated version
      setIsEditingScript(false)
      toast({
        title: "Success",
        description: "Script updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update script",
        variant: "destructive"
      })
    }
  }

  return (
    <Layout>
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {/* <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Content</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select> */}
        </div>
      </div>

      {/* Generate Content Form */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Generate New Content</h2>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Content Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Target Audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Generate Content"
            )}
          </button>
        </form>
      </div>

      {/* Content Ideas Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <ContentSkeleton key={i} />
          ))}
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {searchTerm 
              ? "No content ideas match your search"
              : "No content ideas yet. Start by generating some content!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-white">{idea.title}</h3>
                  <button
                    onClick={() => {
                      setDeleteId(idea.id)
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-300">
                  <span className="text-gray-400">Target Audience:</span> {idea.target_audience}
                </p>
                
                <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                  <p className="text-gray-300">{idea.description}</p>
                  <div className="border-t border-gray-600/50 pt-3">
                    <p className="text-gray-300 font-medium">Hook:</p>
                    <p className="text-gray-400 mt-1">{idea.hook}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-300 font-medium">Outline:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {idea.outline.map((point, index) => (
                      <li key={index} className="text-gray-400">{point}</li>
                    ))}
                  </ul>
                </div>

                {idea.script && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300 font-medium">
                        Script (Version {idea.script?.version})
                      </p>
                      <button
                        onClick={() => {
                          setSelectedIdea(idea)
                          setScriptContent(idea.script?.content || '')
                          setIsEditingScript(true)
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Edit Script
                      </button>
                    </div>
                    {isEditingScript && selectedIdea?.id === idea.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={scriptContent}
                          onChange={(e) => setScriptContent(e.target.value)}
                          className="w-full h-32 px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateScript(idea.id)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditingScript(false)}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <textarea
                        value={idea.script.content}
                        readOnly
                        className="w-full h-32 px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    )}
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) handleDeleteIdea(deleteId)
        }}
        title="Delete Content"
        message="Are you sure you want to delete this content? This action cannot be undone."
      />
    </Layout>
  )
} 