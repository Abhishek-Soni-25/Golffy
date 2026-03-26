import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/Home/HomePage'
import CharitiesPage from './pages/Charities/CharitiesPage'
import PrizePoolPage from './pages/PrizePool/PrizePoolPage'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'

/* ─── App ─────────────────────────────────────────────────────── */
function App() {
  return (
    <div className="font-['DM_Sans'] bg-[#f0ece0] min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/charities"  element={<CharitiesPage />} />
          <Route path="/prize-pool" element={<PrizePoolPage />} />
          <Route path="/login"      element={<LoginPage />} />
          <Route path="/signup"     element={<SignupPage />} />
          <Route path="*"           element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App