import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeftIcon, Loader2, Eye, EyeOff, Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { UseAuth } from "@/hooks/useAuth"
import type { LoginRequest } from "@/hooks/auth"

const Login = () => {
  const navigate = useNavigate()

  const{login}=UseAuth()
  const[credentials, setCredentials] = useState<LoginRequest>({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!credentials.email || !credentials.password) {
      setError("Both fields are required.")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(credentials.email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)

    try {
      const response = await login(credentials)

      console.log("Login submitted:", response?.user)

      navigate('/movie-app/movies')
      // Here you would typically redirect the user or update app state
    } catch (err) {
      setError("Invalid email or password. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0F2438] to-[#0B1C2C] px-4 flex flex-col">
      {/* Back Button */}
      <div className="flex p-4">
        <Link to={"/"} className="flex items-center text-white hover:text-orange-400 transition-colors">
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="ml-1">Home</span>
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center flex-grow pb-16">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Sign in to continue your streaming experience</p>
          </div>

          <Card className="shadow-xl border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Login to Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={credentials.email}
                      onChange={handleChange}
                      className="pl-10 
                      h-13 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={credentials.password}
                      onChange={handleChange}
                      className="pr-10 bg-white/10 h-13
                     border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff color="white" className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded bg-white/10"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-orange-500 hover:text-orange-400">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-md bg-red-500/20 p-3 border border-red-500/30">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg py-6 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="font-medium text-orange-500 hover:text-orange-400">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Login