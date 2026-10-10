import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation, profile } from '../data/profile'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg text-sm font-semibold tracking-[-0.03em] text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
          aria-label={`${profile.name}, back to top`}
        >
          <span className="grid h-[38px] w-[38px] place-items-center overflow-hidden rounded-xl border border-ice/25 bg-[#0a1a2c] shadow-[0_0_24px_rgba(147,215,255,0.16)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <svg viewBox="0 0 44 44" className="h-full w-full p-1.5" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="header-symbol-gradient" x1="10" y1="8" x2="35" y2="37" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c8edff" />
                  <stop offset="0.52" stopColor="#93d7ff" />
                  <stop offset="1" stopColor="#5caae0" />
                </linearGradient>
              </defs>
              <path d="M15.5 12.5 10.5 22l5 9.5" stroke="url(#header-symbol-gradient)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M28.5 12.5 33.5 22l-5 9.5" stroke="url(#header-symbol-gradient)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m25.5 10.5-7 23" stroke="url(#header-symbol-gradient)" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="22" cy="22" r="2.7" fill="#edf6ff" />
            </svg>
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.055] hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden min-h-11 items-center gap-1.5 rounded-lg border border-ice/35 bg-ice px-3.5 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#b9e5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice sm:inline-flex lg:hidden"
        >
          Contact <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-panel text-mist transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-t border-line bg-panel/98 px-5 py-3 shadow-soft backdrop-blur-xl lg:hidden sm:px-8"
          >
            <nav className="mx-auto grid max-w-6xl gap-1" aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-base text-mist transition-colors hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                >
                  {item.label}
                  <ArrowUpRight size={16} className="text-ice" />
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ice px-4 py-3 text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
              >
                Start a conversation <ArrowUpRight size={16} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
