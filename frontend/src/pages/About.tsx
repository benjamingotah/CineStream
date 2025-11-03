import { motion } from "framer-motion"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0F2438] to-[#0B1C2C] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">About CineStream</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn more about our mission to provide the best streaming experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-6">
              Founded in 2020, CineStream began with a simple mission: to make high-quality entertainment 
              accessible to everyone, everywhere. What started as a small team of movie enthusiasts has 
              grown into a leading streaming platform with millions of users worldwide.
            </p>
            <p className="text-gray-300 mb-6">
              We believe in the power of storytelling and strive to bring you the best content from around 
              the globe, from blockbuster hits to indie gems, from classic favorites to the latest releases.
            </p>
            <p className="text-gray-300">
              Our commitment to innovation means we're constantly improving our technology to deliver 
              seamless streaming experiences, whether you're watching on a smart TV, mobile device, or 
              desktop computer.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Our Values</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Quality Content</h4>
                  <p className="text-gray-400">Curating the finest movies and shows for our audience</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Innovation</h4>
                  <p className="text-gray-400">Constantly improving our technology and features</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">User Experience</h4>
                  <p className="text-gray-400">Putting our users at the center of everything we do</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl p-8 border border-orange-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Our diverse team of engineers, designers, content curators, and customer support specialists 
            work together to deliver the best streaming experience possible. We're passionate about 
            entertainment and technology, and we're committed to making CineStream the best it can be.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default About