import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useUser()
  
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navbar */}
      <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">
                <span 
                  onClick={() => navigate('/')} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  ContentBuddy<span className="text-blue-500">.ai</span>
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection(testimonialsRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </button>
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10" />
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Meet Your AI Content <span className="text-blue-500">Buddy</span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your intelligent companion for creating engaging content. Let ContentBuddy.ai help you generate ideas, write scripts, and manage your content effortlessly.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {isAuthenticated ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transform hover:scale-105 transition-all"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transform hover:scale-105 transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transform hover:scale-105 transition-all"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div ref={featuresRef} className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">Content Ideas</h3>
                  <p className="text-gray-400">
                    Generate creative content ideas tailored to your target audience
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">AI-Generated Scripts</h3>
                  <p className="text-gray-400">
                    Transform your ideas into well-structured scripts automatically
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">Content Management</h3>
                  <p className="text-gray-400">
                    Organize and manage your content library efficiently
                  </p>
                </div>
              </div>

              {/* Card 4 - Scheduler */}
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50 relative overflow-hidden sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="relative flex items-center justify-center gap-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">Content Scheduler</h3>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <p className="text-gray-400">
                    Sync your content calendar and schedule posts automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div ref={testimonialsRef} className="py-24 bg-gray-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xl text-blue-500">SJ</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">Sarah Johnson</h4>
                    <p className="text-gray-400 text-sm">Content Creator</p>
                  </div>
                </div>
                <p className="text-gray-300">"This AI writing tool has completely transformed my content creation process. I can now generate ideas and outlines in minutes!"</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xl text-blue-500">MR</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">Mike Roberts</h4>
                    <p className="text-gray-400 text-sm">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-gray-300">"The quality of AI-generated content is impressive. It's like having a writing assistant available 24/7."</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xl text-blue-500">AL</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">Amy Lee</h4>
                    <p className="text-gray-400 text-sm">Blogger</p>
                  </div>
                </div>
                <p className="text-gray-300">"I've tried many AI writing tools, but this one stands out. The interface is intuitive and the results are amazing."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Updated CTA Section without pricing */}
        <div className="mt-32 text-center">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 -z-10" />
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Create Amazing Content?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of content creators and start generating engaging content with AI today - completely free!
              </p>
              <button 
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transform hover:scale-105 transition-all"
              >
                Get Started - It's Free!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              ContentBuddy<span>.ai</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} ContentBuddy.ai. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Engineered by {" "}
                <a 
                  href="https://ayomidehakeem.dev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Ayomide Hakeem
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 