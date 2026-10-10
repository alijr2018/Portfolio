import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation, profile } from '../data/profile'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4 ${
          scrolled
            ? 'border-white/10 bg-ink/85 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-semibold tracking-[-0.03em] text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          aria-label={`${profile.name}, back to top`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-[0.7rem] font-black tracking-[-0.08em] text-ink transition-transform duration-300 group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-1.5 rounded-lg border border-lime/25 bg-lime px-3.5 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#cfdbb7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime sm:inline-flex"
        >
          Let’s talk <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-mist transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime lg:hidden"
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
            className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#202a22]/95 p-3 shadow-soft backdrop-blur-xl lg:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-mist transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  {item.label}
                  <ArrowUpRight size={16} className="text-lime" />
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-4 py-3 text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
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
