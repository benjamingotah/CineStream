import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const Plans = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "per month",
      features: [
        "HD available",
        "Watch on 1 device",
        "Unlimited movies & TV shows",
        "Cancel anytime"
      ]
    },
    {
      name: "Standard",
      price: "$15.99",
      period: "per month",
      features: [
        "HD & Ultra HD available",
        "Watch on 2 devices",
        "Unlimited movies & TV shows",
        "Cancel anytime",
        "Download on 2 devices"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      features: [
        "HD & Ultra HD available",
        "Watch on 4 devices",
        "Unlimited movies & TV shows",
        "Cancel anytime",
        "Download on 4 devices",
        "Ultra HD & HDR"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0F2438] to-[#0B1C2C] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for you. Downgrade or upgrade at any time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden border ${
                plan.popular 
                  ? "border-orange-500 bg-gradient-to-b from-orange-500/10 to-orange-600/10" 
                  : "border-white/10 bg-white/5 backdrop-blur-sm"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="bg-orange-500 text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full rounded-full py-6 text-lg font-semibold transition-all hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      : "bg-white text-[#0A1D37] hover:bg-gray-200"
                  }`}
                >
                  Select Plan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Plans