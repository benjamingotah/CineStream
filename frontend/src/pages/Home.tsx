import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Star, ChevronRight } from "lucide-react"
import MoviesInfo from "@/Dashboard/MoviesInfo"

const Home = () => {
  const features = [
    { 
      icon: <Play className="w-6 h-6" />, 
      title: "Unlimited Streaming", 
      desc: "Watch as much as you want, anytime" 
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      title: "Premium Content", 
      desc: "Access to exclusive movies and shows" 
    },
    { 
      icon: <Play className="w-6 h-6" />, 
      title: "Multiple Profiles", 
      desc: "Create up to 5 profiles for your family" 
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      title: "4K Ultra HD", 
      desc: "Crystal clear picture quality" 
    }
  ]

  const categories = [
    { icon: <Play className="w-8 h-8" />, title: "Movies", count: "10,000+" },
    { icon: <Play className="w-8 h-8" />, title: "TV Shows", count: "5,000+" },
    { icon: <Play className="w-8 h-8" />, title: "Download", count: "Offline Viewing" },
    { icon: <Play className="w-8 h-8" />, title: "Stream", count: "No Interruptions" }
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Movie Enthusiast",
      content: "CineStream has completely changed how I watch movies. The selection is incredible and the streaming quality is unmatched.",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "TV Series Lover",
      content: "I've tried many streaming services, but CineStream's collection of international shows is what keeps me coming back.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Family User",
      content: "Perfect for our family with multiple profiles. Kids love the dedicated section and we adults have our own preferences.",
      rating: 5
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2C] via-[#0F2438] to-[#0B1C2C]"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Star className="w-4 h-4 mr-2" />
                  #1 Streaming Platform
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Stream Your
                  <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Favorite Movies
                  </span>
                  Anytime, Anywhere
                </h1>
                
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Discover thousands of movies, TV shows, and exclusive content. 
                  Join millions of users enjoying the ultimate streaming experience with 4K quality and offline downloads.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-8 py-4 text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button variant="outline" className="rounded-full border-white/20 text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all">
                  Explore Movies
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">10M+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">50K+</div>
                  <div className="text-sm text-gray-400">Movies & Shows</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">4.9★</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Movie Showcase */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Main featured movie */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white">Featured Movie</h3>
                      <p className="text-gray-400">Experience in 4K Ultra HD</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">The Ultimate Adventure</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-orange-400 fill-current" />
                      <span className="text-sm text-gray-300 ml-1">4.8</span>
                      <span className="text-sm text-gray-400 mx-2">•</span>
                      <span className="text-sm text-gray-400">2023</span>
                    </div>
                  </div>
                </div>
                
                {/* Smaller movies */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-xl overflow-hidden border border-white/10">
                      <div className="bg-gradient-to-br from-gray-700 to-gray-800 aspect-video"></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Movie Categories Section */}
      <section className="py-20 bg-gradient-to-b from-[#0B1C2C]/50 to-[#0F2438]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Discover <span className="text-orange-400">Popular Movies</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our curated selection of movies across different categories.
            </p>
          </motion.div>

          {/* Movie Category Sections */}
          <div className="space-y-16">
            <MoviesInfo/>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-[#0B1C2C]/50 to-[#0F2438]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore Our <span className="text-orange-400">Categories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover content tailored to your interests with our diverse collection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{category.title}</h3>
                <p className="text-orange-400 font-medium">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-orange-400">CineStream</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of entertainment with our cutting-edge features and premium content library.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-[#0B1C2C]/50 to-[#0F2438]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our <span className="text-orange-400">Users Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join millions of satisfied users enjoying premium entertainment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-orange-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-orange-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-orange-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Streaming?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of users and start your free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-8 py-4 text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                Start Free Trial
              </Button>
              <Button variant="outline" className="rounded-full border-white/20 text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all">
                View Plans
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home