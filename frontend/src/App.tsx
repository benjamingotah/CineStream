import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ErrorBoundary from "@/components/ErrorBoundary"
import Login from "@/auth/Login"
import SignUp from "@/auth/SignUp"
import NewLayout from "@/Dashboard/NewLayout"
import LandingLayout from "@/layouts/LandingLayout"
import Home from "@/pages/Home"
import Movies from "@/pages/Movies"
import TVShows from "@/pages/TVShows"
import Plans from "@/pages/Plans"
import About from "@/pages/About"

import LiveStreams from "@/Dashboard/LiveStreams"
import Playlist from "@/Dashboard/Playlist"
import Subscriptions from "@/Dashboard/Subscriptions"
import MovieDetailsPage from "./Dashboard/MovieDetailsPage"
import { ProtectedRoute } from "./hooks/protectedRoute"
import MoviesPageLayout from "./Dashboard/MoviesPageLayout"
import Account from "./Dashboard/Account"

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Landing Page Layout with nested routes */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tv-shows" element={<TVShows />} />
            <Route path="plans" element={<Plans />} />
            <Route path="about" element={<About />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          </Route>
          

          {/* Protected Routes */}
          <Route path="/movie-app/*" element={<ProtectedRoute><NewLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="movies" replace />} />
            <Route path=":category" element={<MoviesPageLayout />}/>
            <Route path="live-streams" element={<LiveStreams />}/>
            <Route path="playlist" element={<Playlist />}/>
            <Route path="account" element={<Account from={"top"} />}/>
            <Route path="subscriptions" element={<Subscriptions />}/>
            <Route path="movie/:id" element={<MovieDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App