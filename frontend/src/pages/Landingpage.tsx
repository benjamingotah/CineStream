
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to the root path which will show the home content within the layout
    navigate("/", { replace: true })
  }, [navigate])

  return null
}

export default LandingPage
