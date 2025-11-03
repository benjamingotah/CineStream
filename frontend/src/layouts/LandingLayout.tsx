import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Star, Users, Award, ChevronRight, Menu, X, Film, Tv, Download, Wifi, Search } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom"
import { searchMovies, type Movie } from "@/hooks/Movies"
import SearchMovieCard from "@/components/SearchMoviecard"
import { useIsMobileOrTablet } from "@/hooks/use-mobile"

const LandingLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isMobileOrTablet = useIsMobileOrTablet()
  const navigate = useNavigate()
  const location = useLocation()

  // const features = [
  //   { 
  //     icon: <Play className="w-6 h-6" />, 
  //     title: "Unlimited Streaming", 
  //     desc: "Watch as much as you want, anytime" 
  //   },
  //   { 
  //     icon: <Star className="w-6 h-6" />, 
  //     title: "Premium Content", 
  //     desc: "Access to exclusive movies and shows" 
  //   },
  //   { 
  //     icon: <Users className="w-6 h-6" />, 
  //     title: "Multiple Profiles", 
  //     desc: "Create up to 5 profiles for your family" 
  //   },
  //   { 
  //     icon: <Award className="w-6 h-6" />, 
  //     title: "4K Ultra HD", 
  //     desc: "Crystal clear picture quality" 
  //   }
  // ]

  // const categories = [
  //   { icon: <Film className="w-8 h-8" />, title: "Movies", count: "10,000+" },
  //   { icon: <Tv className="w-8 h-8" />, title: "TV Shows", count: "5,000+" },
  //   { icon: <Download className="w-8 h-8" />, title: "Download", count: "Offline Viewing" },
  //   { icon: <Wifi className="w-8 h-8" />, title: "Stream", count: "No Interruptions" }
  // ]

  // const testimonials = [
  //   {
  //     name: "Alex Johnson",
  //     role: "Movie Enthusiast",
  //     content: "CineStream has completely changed how I watch movies. The selection is incredible and the streaming quality is unmatched.",
  //     rating: 5
  //   },
  //   {
  //     name: "Sarah Williams",
  //     role: "TV Series Lover",
  //     content: "I've tried many streaming services, but CineStream's collection of international shows is what keeps me coming back.",
  //     rating: 5
  //   },
  //   {
  //     name: "Michael Chen",
  //     role: "Family User",
  //     content: "Perfect for our family with multiple profiles. Kids love the dedicated section and we adults have our own preferences.",
  //     rating: 5
  //   }
  // ]

  const fetchSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      setError(null)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const data = await searchMovies(query, 1)
      setResults(data.movies)
    } catch (err) {
      setError("Failed to search movies")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, fetchSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSearch(searchQuery)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "Plans", path: "/plans" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0F2438] to-[#0B1C2C] text-white overflow-x-hidden">
      {/* Enhanced Navbar - Static Header */}
      <header className="z-50 bg-[#0B1C2C]/90 backdrop-blur-sm border-b border-white/10 fixed top-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              {/* Show only logo on mobile, logo + text on desktop */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden md:block">
                CineStream
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className={`hover:text-orange-400 transition-colors relative group py-2 ${
                    location.pathname === item.path ? "text-orange-400" : ""
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500"></span>
                  )}
                  {location.pathname !== item.path && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Both Desktop and Mobile */}
            <div className="flex items-center mx-4 flex-1 max-w-md">
              <form onSubmit={handleSubmit} className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                  <input
                    ref={searchInputRef}
                    className="bg-white rounded-2xl p-2 pl-10 text-[#0A1D37] w-full"
                    type="search"
                    placeholder="Search movies, shows..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-[#0A1D37] border-2 border-blue-950 mt-2 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
                    {isLoading && (
                      <div className="p-4 text-center text-gray-400">
                        Searching...
                      </div>
                    )}
                    {error && (
                      <div className="p-4 text-center text-red-400">
                        {error}
                      </div>
                    )}
                    {!isLoading && !error && results.length === 0 && searchQuery && (
                      <div className="p-4 text-center text-gray-400">
                        No results found
                      </div>
                    )}
                    {results.map((movie) => (
                      <div key={movie.id} className="p-2 cursor-pointer" onClick={() => {
                        navigate(`/movie/${movie.id}`)
                        setIsSearchFocused(false)
                        setSearchQuery("")
                      }}>
                        <SearchMovieCard movie={movie} />
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sign In Button - Desktop Only */}
              <div className="hidden md:block">
                <Link to={'/auth/login'}>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6 py-2 transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                    Sign In
                  </Button>
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="mobile-menu fixed top-0 right-0 h-full w-64 bg-[#0B1C2C] z-50 shadow-xl md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">CineStream</h2>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  {navItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.path}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        location.pathname === item.path 
                          ? "bg-orange-500/20 text-orange-400" 
                          : "hover:bg-white/10"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                {/* Sign In Button - Mobile Drawer */}
                <div className="mt-8">
                  <Link to={'/auth/login'} onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6 py-2 transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content Area - This is where child routes will be rendered */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer - Only shown on the main landing page */}
      <footer className="bg-[#0B1C2C] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">CineStream</h3>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate streaming platform for movie lovers worldwide.
              </p>
              <div className="flex space-x-4 mt-4">
                {["twitter", "facebook", "instagram", "youtube"].map((social, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs font-bold">{social.charAt(0).toUpperCase()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Content</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Movies</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">TV Shows</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Documentaries</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Kids</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">New Releases</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">DMCA</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Subscriptions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} CineStream. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingLayout