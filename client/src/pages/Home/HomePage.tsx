import { useEffect, useRef, useState } from 'react'

/* ─── tiny hook: fires a callback when element enters viewport ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  const delay = (d: number) => ({ transitionDelay: `${d}ms` })
  const base = 'transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]'
  const from = 'opacity-0 translate-y-7'
  const to   = 'opacity-100 translate-y-0'
  const cls  = (d: number) => `${base} ${mounted ? to : from}`

  return (
    <section className="relative min-h-screen bg-[#f0ece0] overflow-hidden
      grid grid-cols-1 lg:grid-cols-2 items-center gap-10
      px-6 lg:px-16 pt-28 pb-16 max-w-7xl mx-auto w-full">

      {/* dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(26,61,43,.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* ── LEFT ── */}
      <div className="relative z-10 flex flex-col gap-7">
        <div className={`${cls(0)}`} style={delay(0)}>
          <span className="inline-flex items-center gap-2 bg-[#d4e9dd] text-[#1a3d2b] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full">
            🏌️ Golf &amp; Giving, Together
          </span>
        </div>

        <h1 className={`font-['Playfair_Display'] text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight text-[#16281e] ${cls(1)}`} style={delay(130)}>
          Play. Give.{' '}
          <em className="text-[#2e6e50] not-italic">Win.</em>
        </h1>

        <p className={`text-[#5c6e62] text-lg leading-relaxed font-light max-w-md ${cls(2)}`} style={delay(260)}>
          Track your Stableford scores, support a charity you love,
          and enter monthly prize draws — all through one simple subscription.
        </p>

        <div className={`flex flex-wrap gap-4 ${cls(3)}`} style={delay(390)}>
          <a href="/signup"
            className="bg-[#1a3d2b] text-white px-8 py-3.5 rounded-full text-sm font-medium
              shadow-[0_4px_20px_rgba(26,61,43,.28)] hover:bg-[#2e6e50]
              hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(26,61,43,.32)]
              transition-all duration-200">
            Get Started
          </a>
          <a href="#how-it-works"
            className="border border-[#e2ddd0] text-[#16281e] px-8 py-3.5 rounded-full text-sm font-medium
              hover:border-[#1a3d2b] hover:bg-[#1a3d2b]/[0.04]
              hover:-translate-y-0.5 transition-all duration-200">
            Learn More ↓
          </a>
        </div>

        {/* Stats */}
        <div className={`flex items-center gap-6 mt-2 ${cls(4)}`} style={delay(520)}>
          {[
            { n: '12,400+', l: 'Rounds Logged' },
            { n: '£84k',    l: 'Donated to Charity' },
            { n: '3,200+',  l: 'Members' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-9 bg-[#e2ddd0]" />}
              <div className="flex flex-col gap-0.5">
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#16281e]">{s.n}</span>
                <span className="text-xs text-[#5c6e62]">{s.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className={`relative flex items-center justify-center h-[480px] lg:h-[540px] ${cls(5)}`} style={delay(200)}>
        {/* glow blob */}
        <div className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,125,43,.18) 0%, transparent 68%)', animation: 'pulseBlob 4.5s ease-in-out infinite' }} />

        {/* ball */}
        <div style={{ animation: 'floatBall 3.8s ease-in-out infinite', fontSize: '9rem', filter: 'drop-shadow(0 20px 36px rgba(0,0,0,.14))', userSelect: 'none', zIndex: 2, lineHeight: 1 }}>
          ⛳
        </div>

        {/* hearts */}
        {[
          { top: '13%', left: '56%', size: '1.1rem', delay: '0s',   color: '#f5a623' },
          { top: '8%',  left: '72%', size: '1.7rem', delay: '.9s',  color: '#d96a2a' },
          { top: '20%', left: '82%', size: '1rem',   delay: '1.6s', color: '#f5a623' },
          { top: '30%', left: '44%', size: '1.4rem', delay: '2.3s', color: '#d96a2a' },
        ].map((h, i) => (
          <span key={i} style={{
            position: 'absolute', top: h.top, left: h.left,
            fontSize: h.size, color: h.color,
            animation: `driftHeart 5.5s ease-in-out infinite`,
            animationDelay: h.delay, pointerEvents: 'none', zIndex: 3,
          }}>♥</span>
        ))}

        {/* Badge: score */}
        <div className="absolute bottom-[14%] -left-4 lg:left-[-6%] z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgba(26,61,43,.16)] px-4 py-3 flex items-center gap-3"
          style={{ animation: 'badgeBob 4s ease-in-out infinite', animationDelay: '.6s' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#4a9e72] flex-shrink-0" />
          <div>
            <span className="block text-base font-semibold text-[#16281e]">+24 pts</span>
            <span className="block text-xs text-[#5c6e62] mt-0.5">Best round this month</span>
          </div>
        </div>

        {/* Badge: charity */}
        <div className="absolute top-[10%] -right-4 lg:right-[-5%] z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgba(26,61,43,.16)] px-4 py-3 flex items-center gap-3"
          style={{ animation: 'badgeBob 4s ease-in-out infinite', animationDelay: '1.4s' }}>
          <span className="text-2xl">❤️</span>
          <div>
            <span className="block text-sm font-semibold text-[#16281e]">Macmillan Cancer</span>
            <span className="block text-xs text-[#5c6e62] mt-0.5">Your chosen charity</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ────────────────────────────────────────────── */
const steps = [
  { icon: '👤', step: 'Step 1', title: 'Subscribe',         desc: 'Choose a monthly or yearly plan to join the Golffy community.' },
  { icon: '📋', step: 'Step 2', title: 'Log Your Scores',   desc: 'Enter your Stableford scores after each round. Track your progress over time.' },
  { icon: '❤️', step: 'Step 3', title: 'Support a Cause',   desc: 'A portion of every subscription goes directly to a charity you choose.' },
  { icon: '🏆', step: 'Step 4', title: 'Win Monthly Prizes', desc: 'Every subscriber is entered into a monthly draw. Better scores, better odds.' },
]

function HowItWorks() {
  const { ref, visible } = useReveal()
  return (
    <section id="how-it-works" className="bg-[#f0ece0] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#d4e9dd] text-[#1a3d2b] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-extrabold text-[#16281e] mb-3">
            How Golffy Works
          </h2>
          <p className="text-[#5c6e62] font-light">Four simple steps to play with purpose.</p>
        </div>

        {/* grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((s, i) => (
            <div
              key={i}
              className="pr-0 lg:pr-6 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* icon + connector */}
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 bg-[#1a3d2b] rounded-2xl flex items-center justify-center text-2xl shadow-[0_6px_18px_rgba(26,61,43,.22)] flex-shrink-0">
                  {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block flex-1 h-0.5 ml-4"
                    style={{ background: 'linear-gradient(to right, #d4e9dd, transparent)' }} />
                )}
              </div>
              <span className="block text-xs font-medium tracking-widest uppercase text-[#c97d2b] mb-2">{s.step}</span>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#16281e] mb-2">{s.title}</h3>
              <p className="text-sm text-[#5c6e62] leading-relaxed font-light max-w-[220px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Features ────────────────────────────────────────────────── */
const features = [
  { icon: '📊', title: 'Performance Tracking',  desc: 'Log Stableford scores, see trends, and track your handicap progression with clean, intuitive charts.',                                  accent: '#c97d2b' },
  { icon: '🎁', title: 'Monthly Prize Draws',    desc: "Every subscriber enters a monthly draw. Prizes are funded from the community pool — the more who play, the bigger the pot.", accent: '#2e6e50', featured: true },
  { icon: '❤️', title: 'Charity at the Core',   desc: 'Pick a charity close to your heart. A meaningful slice of every subscription goes straight to them.',                              accent: '#c97d2b' },
]

function Features() {
  const { ref, visible } = useReveal()
  return (
    <section id="features" className="bg-[#1a3d2b] pt-0 pb-24 px-6 lg:px-16 relative">
      {/* wave divider */}
      <div className="leading-[0] mb-16">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[60px] block">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#f0ece0" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-white/10 text-white/70 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Why Golffy
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-extrabold text-white mb-3">
            More Than a Scorecard
          </h2>
          <p className="text-white/55 font-light">Golffy is built for golfers who want their game to mean something.</p>
        </div>

        {/* cards */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          {features.map((f, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-9 border transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
                ${f.featured
                  ? 'bg-white/13 border-white/22 -translate-y-3'
                  : 'bg-white/7 border-white/10 hover:bg-white/11'}
              `}
              style={{
                backdropFilter: 'blur(10px)',
                opacity:   visible ? 1 : 0,
                transform: visible
                  ? (f.featured ? 'translateY(-12px)' : 'translateY(0)')
                  : 'translateY(28px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {f.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c97d2b] text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                style={{ background: f.accent + '33', color: f.accent }}>
                {f.icon}
              </div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-white/58 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing ─────────────────────────────────────────────────── */
const plans = [
  {
    name: 'Monthly', price: '£9.99', period: '/month',
    perks: ['Unlimited score logging', 'Monthly prize draw entry', 'Charity donation included', 'Performance dashboard'],
    featured: false,
  },
  {
    name: 'Yearly', price: '£89.99', period: '/year', badge: 'Best Value',
    perks: ['Everything in Monthly', 'Save over 25%', 'Priority draw entries', 'Annual performance report'],
    featured: true,
  },
]

function Pricing() {
  const { ref, visible } = useReveal()
  return (
    <section id="pricing" className="bg-[#f0ece0] py-24 px-6 lg:px-16 relative">
      {/* radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(26,61,43,.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative">
        {/* header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#d4e9dd] text-[#1a3d2b] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-extrabold text-[#16281e] mb-3">
            Simple, Honest Pricing
          </h2>
          <p className="text-[#5c6e62] font-light">Every penny is accounted for — your game, your charity, your prizes.</p>
        </div>

        {/* cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto items-center">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-10 border transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
                ${p.featured
                  ? 'bg-[#faf8f3] border-[#1a3d2b] shadow-[0_8px_40px_rgba(26,61,43,.10)]'
                  : 'bg-[#faf8f3] border-[#e2ddd0] hover:shadow-[0_12px_40px_rgba(26,61,43,.16)]'}
              `}
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 160}ms`,
              }}
            >
              {p.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1a3d2b] text-white text-[11px] font-semibold tracking-widest uppercase px-5 py-1.5 rounded-full whitespace-nowrap">
                  {p.badge}
                </div>
              )}

              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#16281e] mb-4">{p.name}</h3>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="font-['Playfair_Display'] text-5xl font-extrabold text-[#16281e]">{p.price}</span>
                <span className="text-sm text-[#5c6e62]">{p.period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-8">
                {p.perks.map((perk, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#16281e]">
                    <span className="w-5 h-5 rounded-full bg-[#d4e9dd] text-[#1a3d2b] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className={`block text-center rounded-full py-3.5 text-sm font-medium transition-all duration-200
                  ${p.featured
                    ? 'bg-[#1a3d2b] text-white shadow-[0_4px_18px_rgba(26,61,43,.28)] hover:bg-[#2e6e50] hover:-translate-y-0.5'
                    : 'border border-[#e2ddd0] text-[#16281e] hover:border-[#1a3d2b] hover:bg-[#1a3d2b]/[0.04] hover:-translate-y-0.5'}
                `}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#8a9e92] mt-8">
          No hidden fees. Cancel any time. Charity donations processed monthly.
        </p>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
    </>
  )
}