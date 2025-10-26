import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "@/pages/Landingpage"
import ErrorBoundary from "@/components/ErrorBoundary"
import Login from "@/auth/Login"
import SignUp from "@/auth/SignUp"
import NewLayout from "@/Dashboard/NewLayout"

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />

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