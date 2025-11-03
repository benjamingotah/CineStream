import { motion } from "framer-motion"

const Movies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0F2438] to-[#0B1C2C] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-4">Movies</h1>
          <p className="text-xl text-gray-300 text-center mb-12">
            Browse our extensive collection of movies
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
              >
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 aspect-video"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Movie Title {item}</h3>
                  <p className="text-gray-400 mb-4">
                    A brief description of the movie content and storyline.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-400 font-medium">2023</span>
                    <span className="text-yellow-400">★ 4.{item}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Movies