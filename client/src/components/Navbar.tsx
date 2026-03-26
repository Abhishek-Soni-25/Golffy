import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // NavLink gives you an isActive boolean to style the active route
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? 'text-[#1a3d2b] font-medium' : 'text-[#5c6e62] hover:text-[#1a3d2b]'}`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-[#f0ece0]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">

        {/* Logo — Link because it's just navigation, not a nav item */}
        <Link to="/" className="font-['Playfair_Display'] text-2xl font-extrabold text-[#1a3d2b] tracking-tight">
          Golffy
        </Link>

        {/* Desktop — NavLink for in-page sections */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/charities" className={linkClass}>Charities</NavLink>
          <NavLink to="/prize-pool" className={linkClass}>Prize Pool</NavLink>
          <a href="#features"     className="text-sm text-[#5c6e62] hover:text-[#1a3d2b] transition-colors">Features</a>
          <a href="#pricing"      className="text-sm text-[#5c6e62] hover:text-[#1a3d2b] transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-5">
          {/* NavLink for login — highlights when you're on /login */}
          <NavLink to="/login" className={linkClass}>Log In</NavLink>

          {/* Link for the CTA button */}
          <Link
            to="/signup"
            className="bg-[#1a3d2b] text-white text-sm font-medium px-6 py-2.5 rounded-full
              shadow-[0_4px_14px_rgba(26,61,43,0.25)] hover:bg-[#2e6e50]
              hover:-translate-y-px transition-all duration-200"
          >
            Join Golffy
          </Link>
        </div>

        {/* Burger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-[#1a3d2b] rounded transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1a3d2b] rounded transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1a3d2b] rounded transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-[#f0ece0] overflow-hidden transition-all duration-300 ${open ? 'max-h-64 py-4' : 'max-h-0'}`}>
        <div className="flex flex-col items-center gap-5 px-6">
          <NavLink to="/charities" className={linkClass}>Charities</NavLink>
          <NavLink to="/prize-pool" className={linkClass}>Prize Pool</NavLink>
          <a href="#features"     onClick={() => setOpen(false)} className="text-base text-[#5c6e62]">Features</a>
          <a href="#pricing"      onClick={() => setOpen(false)} className="text-base text-[#5c6e62]">Pricing</a>
          <Link to="/signup" className="bg-[#1a3d2b] text-white text-sm px-8 py-3 rounded-full w-full text-center" onClick={() => setOpen(false)}>
            Join Golffy
          </Link>
        </div>
      </div>
    </nav>
  )
}