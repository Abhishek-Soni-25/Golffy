import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="pt-40 flex flex-col items-center gap-6 text-center px-6">
      <h1 className="font-['Playfair_Display'] text-6xl font-extrabold text-[#1a3d2b]">404</h1>
      <p className="text-[#5c6e62]">This page doesn't exist.</p>
      <Link to="/" className="bg-[#1a3d2b] text-white px-8 py-3 rounded-full text-sm hover:bg-[#2e6e50] transition-colors">
        Back to Home
      </Link>
    </div>
  )
}