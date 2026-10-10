import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Header } from './components/Header'
import { Reveal } from './components/Reveal'
import { SectionHeading } from './components/SectionHeading'
import {
  navigation,
  profile,
  projects,
  skillGroups,
  timeline,
  type SocialPlatform,
} from './data/profile'

const accentStyles = {
  lime: {
    border: 'border-lime/25',
    text: 'text-lime',
    surface: 'from-lime/15 via-lime/[0.03] to-transparent',
    dot: 'bg-lime',
  },
  violet: {
    border: 'border-violet/25',
    text: 'text-violet',
    surface: 'from-violet/15 via-violet/[0.03] to-transparent',
    dot: 'bg-violet',
  },
  blue: {
    border: 'border-[#a8c7bd]/25',
    text: 'text-[#a8c7bd]',
    surface: 'from-[#a8c7bd]/15 via-[#a8c7bd]/[0.03] to-transparent',
    dot: 'bg-[#a8c7bd]',
  },
} as const

function SocialIcon({ platform, size = 18 }: { platform: SocialPlatform; size?: number }) {
  if (platform === 'github') return <Github size={size} strokeWidth={1.8} />
  if (platform === 'linkedin') return <Linkedin size={size} strokeWidth={1.8} />
  return <Mail size={size} strokeWidth={1.8} />
}

type CopyTarget = 'hero' | 'contact'

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Some embedded browsers deny the Clipboard API; fall back below.
    }
  }

  const input = document.createElement('textarea')
  input.value = value
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(input)

  if (!copied) throw new Error('Clipboard copy failed')
}

function App() {
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget | null>(null)

  const handleCopyEmail = async (target: CopyTarget) => {
    try {
      await copyToClipboard(profile.email)
      setCopiedTarget(target)
      window.setTimeout(() => {
        setCopiedTarget((current) => (current === target ? null : current))
      }, 2200)
    } catch {
      setCopiedTarget(null)
    }
  }

  useEffect(() => {
    const title = `${profile.name} — ${profile.role}`
    const description = `Portfolio of ${profile.name}, ${profile.role.toLowerCase()} based in ${profile.location}.`

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [])

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-mist selection:bg-lime selection:text-ink">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[70] -translate-y-20 rounded-lg bg-lime px-4 py-2 text-sm font-bold text-ink transition-transform focus:translate-y-0 focus:outline-none"
      >
        Skip to content
      </a>
      <Header />

      <main id="main-content">
        <section id="top" className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-10 lg:pt-44">
          <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
          <div className="pointer-events-none absolute left-[12%] top-[-16rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-lime/[0.08] blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-[-12rem] top-32 -z-10 h-[25rem] w-[25rem] rounded-full bg-violet/[0.10] blur-[100px]" aria-hidden="true" />

          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-mist/85">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-45 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                {profile.availability}
              </div>

              <p className="mt-8 text-sm font-medium text-muted">Hello, I’m {profile.name}.</p>
              <h1 className="mt-3 font-display text-[4.2rem] leading-[0.86] tracking-[-0.07em] text-mist sm:text-8xl lg:text-[6.8rem]">
                {profile.headline.lead} <em className="font-normal text-lime">{profile.headline.emphasis}</em> {profile.headline.ending}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{profile.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3.5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#cfdbb7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  View my work <ArrowUpRight size={17} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-5 py-3.5 text-sm font-semibold text-mist transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  Contact me
                </a>
              </div>

              <div className="mt-9 flex items-center gap-3">
                {profile.social.map((social) => {
                  if (social.platform === 'email') {
                    const copied = copiedTarget === 'hero'

                    return (
                      <div key={social.label} className="group relative">
                        <button
                          type="button"
                          onClick={() => void handleCopyEmail('hero')}
                          aria-label={copied ? 'Email copied' : 'Copy email address'}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-lime/45 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                        >
                          {copied ? <Check size={16} className="text-lime" /> : <Copy size={16} />}
                        </button>
                        <span
                          aria-live="polite"
                          className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#172019]/95 px-2 py-1 text-[0.64rem] font-medium text-mist shadow-soft transition-opacity ${
                            copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                          }`}
                        >
                          {copied ? 'Copied!' : 'Copy email'}
                        </span>
                      </div>
                    )
                  }

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                      aria-label={social.label}
                      title={social.note}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-lime/45 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                    >
                      <SocialIcon platform={social.platform} size={16} />
                    </a>
                  )
                })}
              </div>
            </Reveal>

          </div>

          <a
            href="#about"
            className="mx-auto mt-14 hidden w-fit items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime sm:flex"
          >
            Explore <ArrowDown size={14} />
          </a>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-white/10 bg-[#1b241d] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="About"
                title="A practical mindset, from machines to software."
                description={profile.bio}
              />
            </Reveal>
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {profile.highlights.map((highlight, index) => (
                <Reveal key={highlight.label} delay={index * 0.06}>
                  <article className="rounded-2xl border border-white/10 bg-[#222d24] p-5">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/40">{highlight.label}</p>
                    <p className="mt-3 font-display text-2xl tracking-[-0.04em] text-mist">{highlight.value}</p>
                    <p className="mt-1.5 text-sm text-muted">{highlight.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow="Skills"
                title="A focused toolkit."
                description="Software, web development, and mechanical design — the tools I use to keep learning and building."
              />
            </Reveal>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {skillGroups.map((group, index) => {
                const accent = accentStyles[group.accent]
                return (
                  <Reveal key={group.title} delay={index * 0.06}>
                    <article className="h-full rounded-2xl border border-white/10 bg-panel p-5 transition-colors hover:border-white/20 sm:p-6">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                      <p className={`mt-5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] ${accent.text}`}>{group.eyebrow}</p>
                      <h3 className="mt-2 font-display text-3xl tracking-[-0.04em] text-mist">{group.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{group.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-mist/80">{skill}</span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 border-y border-white/10 bg-[#1b241d] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="Selected work"
                title="A few things I have built."
                description="Current work and selected 1337 projects. Public source code is linked where it is available."
              />
            </Reveal>

            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {projects.map((project, index) => {
                const accent = accentStyles[project.accent]
                return (
                  <Reveal key={project.id} delay={index * 0.06}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#222d24] transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-soft">
                      <div className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${accent.surface} p-5`}>
                        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-white/10" />
                        <div className="relative flex items-start justify-between">
                          <span className={`font-display text-5xl tracking-[-0.08em] ${accent.text}`}>{project.number}</span>
                          <span className="rounded-full border border-white/10 bg-[#1b241d]/60 px-2.5 py-1 text-[0.64rem] text-mist/75">{project.status}</span>
                        </div>
                        <p className="relative mt-10 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/45">Project</p>
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h3 className="font-display text-3xl tracking-[-0.04em] text-mist">{project.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <span key={technology} className="rounded-full bg-white/[0.045] px-2.5 py-1 text-xs text-mist/80">{technology}</span>
                          ))}
                        </div>
                        <div className="mt-6 pt-1">
                          {project.sourceUrl ? (
                            <a
                              href={project.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                            >
                              <Github size={16} /> View source <ArrowUpRight size={15} />
                            </a>
                          ) : (
                            <span className="text-sm text-white/40">Private while in progress</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Journey"
                title="Learning by building."
                description="A short view of the education and experience that shaped my work so far."
              />
              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-muted">
                <MapPin size={16} className="text-lime" /> {profile.location}
              </div>
            </Reveal>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {timeline.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-7 sm:py-6">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-lime">{item.period}</p>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-mist">{item.title}</h3>
                        {item.current && <span className="h-2 w-2 rounded-full bg-lime" aria-label="Current" />}
                      </div>
                      <p className="mt-1 text-sm text-white/50">{item.organization}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[#222d24] p-6 shadow-soft sm:p-10 lg:p-12">
            <Reveal className="max-w-2xl">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-lime">05 — Contact</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.055em] text-mist sm:text-6xl">Let’s connect.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted">For opportunities or collaborations, copy my email address and get in touch.</p>
              <button
                type="button"
                onClick={() => void handleCopyEmail('contact')}
                className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-mist transition-colors hover:border-lime/40 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                aria-label={copiedTarget === 'contact' ? 'Email copied' : 'Copy email address'}
              >
                {copiedTarget === 'contact' ? <Check size={17} className="text-lime" /> : <Copy size={17} className="text-lime" />}
                <span>{profile.email}</span>
                <span className="rounded-full border border-white/10 bg-[#172019]/60 px-2 py-0.5 text-[0.64rem] font-semibold text-muted">
                  {copiedTarget === 'contact' ? 'Copied!' : 'Copy email'}
                </span>
              </button>
              <p className="sr-only" role="status" aria-live="polite">
                {copiedTarget === 'contact' ? 'Email address copied to clipboard.' : ''}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-[0.68rem] font-black tracking-[-0.08em] text-ink">{profile.initials}</span>
            {profile.name}
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime">
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-white/40">© {new Date().getFullYear()} Rami Abdelali</p>
        </div>
      </footer>
    </div>
  )
}

export default App
