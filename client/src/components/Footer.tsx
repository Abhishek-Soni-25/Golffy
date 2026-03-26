import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1a3d2b] px-6 lg:px-16 pt-16 pb-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-12 border-b border-white/10">
          <div className="max-w-xs">
            <Link to="/" className="font-['Playfair_Display'] text-2xl font-extrabold text-white block mb-3">
              Golffy
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">Play with purpose. Give with every round.</p>
          </div>

          <div className="flex flex-wrap gap-12">
            {/* Product column — hash links stay as <a> since they scroll on-page */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-medium tracking-[.1em] uppercase text-white/35 mb-1">Product</h4>
              <a href="#how-it-works" className="text-sm text-white/65 hover:text-white transition-colors">How It Works</a>
              <a href="#features"     className="text-sm text-white/65 hover:text-white transition-colors">Features</a>
              <a href="#pricing"      className="text-sm text-white/65 hover:text-white transition-colors">Pricing</a>
            </div>

            {/* Account column — real routes, use Link */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-medium tracking-[.1em] uppercase text-white/35 mb-1">Account</h4>
              <Link to="/signup" className="text-sm text-white/65 hover:text-white transition-colors">Sign Up</Link>
              <Link to="/login"  className="text-sm text-white/65 hover:text-white transition-colors">Log In</Link>
            </div>

            {/* Company column — real routes, use Link */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-medium tracking-[.1em] uppercase text-white/35 mb-1">Company</h4>
              <Link to="/about"   className="text-sm text-white/65 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-sm text-white/65 hover:text-white transition-colors">Contact</Link>
              <Link to="/privacy" className="text-sm text-white/65 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-white/30 py-5">© {new Date().getFullYear()} Golffy. All rights reserved.</p>
      </div>
    </footer>
  )
}