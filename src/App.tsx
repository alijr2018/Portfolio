import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Copy, Github } from 'lucide-react'
import { Header } from './components/Header'
import { Reveal } from './components/Reveal'
import { SectionHeading } from './components/SectionHeading'
import { profile, projects, skillGroups, timeline } from './data/profile'

const projectTones = {
  lime: 'from-ice/10',
  violet: 'from-violet/10',
  blue: 'from-sky/10',
} as const

const skillDots = {
  lime: 'bg-ice',
  violet: 'bg-violet',
  blue: 'bg-sky',
} as const

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Embedded browsers can deny Clipboard API access; use the supported fallback below.
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
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await copyToClipboard(profile.email)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2200)
    } catch {
      setEmailCopied(false)
    }
  }

  useEffect(() => {
    const title = `${profile.name} — ${profile.role}`
    const description = `${profile.role}. ${profile.roleSummary} ${profile.availability}.`

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [])

  return (
    <div className="min-h-screen bg-ink text-mist selection:bg-ice selection:text-ink">
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[70] inline-flex min-h-11 -translate-y-20 items-center rounded-lg bg-ice px-4 py-2 text-sm font-bold text-ink transition-transform focus:translate-y-0 focus:outline-none"
      >
        Skip to content
      </a>
      <Header />

      <main id="main-content">
        <section id="top" className="relative isolate overflow-hidden px-5 pb-16 pt-[132px] sm:px-8 sm:pb-20 sm:pt-40 lg:px-10 lg:pt-44">
          <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-44 -top-52 -z-10 hidden h-[38rem] w-[38rem] rounded-full bg-sky/[0.10] blur-[80px] sm:block" aria-hidden="true" />
          <div className="pointer-events-none absolute left-[14%] top-20 -z-10 hidden h-[23rem] w-[23rem] rounded-full bg-violet/[0.07] blur-[72px] md:block" aria-hidden="true" />

          <div className="mx-auto max-w-6xl">
            <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
              <Reveal className="min-w-0">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-panel/80 px-3.5 py-2 text-xs font-medium text-muted sm:text-sm">
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-50 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
                  </span>
                  <span>{profile.availability}</span>
                </span>

                <p className="mt-7 font-mono text-xs font-medium uppercase tracking-[0.13em] text-ice">{profile.role}</p>
                <h1 className="mt-4 max-w-3xl break-words font-display text-[clamp(3rem,11vw,6rem)] leading-[0.9] tracking-[-0.045em] text-mist">
                  {profile.headline.lead} <em className="font-normal text-ice">{profile.headline.emphasis}</em>
                  {profile.headline.ending && ` ${profile.headline.ending}`}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-8">{profile.intro}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ice px-5 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#b9e5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                  >
                    View projects <ArrowRight size={17} />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-panel/65 px-5 py-3 text-sm font-semibold text-mist transition-colors hover:border-ice/45 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                  >
                    Contact me
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="min-w-0">
                <aside className="overflow-hidden rounded-2xl border border-line bg-panel shadow-soft" aria-label="Profile terminal">
                  <div className="flex items-center gap-2 border-b border-line px-4 py-3.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38516c]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38516c]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38516c]" />
                    <span className="ml-2 font-mono text-[0.68rem] text-muted">profile.sh</span>
                  </div>
                  <div className="space-y-2.5 p-5 font-mono text-[0.78rem] leading-6 sm:p-6 sm:text-sm">
                    {profile.terminal.map((item) => (
                      <div key={item.command} className="min-w-0">
                        <p className="break-words text-mist">
                          <span className="text-ice">$</span> {item.command}
                        </p>
                        <p className="break-words whitespace-pre-wrap pl-4 text-muted">{item.output}</p>
                      </div>
                    ))}
                  </div>
                </aside>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-3">
              {profile.heroStats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.06 + index * 0.05}>
                  <article className="h-full rounded-2xl border border-line bg-panel/75 p-5 sm:p-6">
                    <strong className="block font-display text-4xl leading-none tracking-[-0.04em] text-ice sm:text-[2.7rem]">{stat.value}</strong>
                    <p className="mt-3 text-sm leading-6 text-muted">{stat.label}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-line bg-panel/55 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="About"
                title="A practical mindset, from machines to software."
                description={profile.bio}
              />
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                I focus on the details that keep systems understandable: clear constraints, deliberate design, and careful testing.
              </p>
            </Reveal>

            <div className="grid gap-3">
              {profile.highlights.map((highlight, index) => (
                <Reveal key={highlight.label} delay={0.06 + index * 0.05}>
                  <article className="rounded-2xl border border-line bg-ink/45 p-5 sm:p-6">
                    <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ice">{highlight.label}</p>
                    <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.035em] text-mist">{highlight.value}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{highlight.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow="Projects"
                title="Selected work from 1337."
                description="Systems projects built through the 1337 curriculum, with results, core technologies, and public source links where available."
              />
            </Reveal>

            <div className="mt-10 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const inProgress = project.status === 'In progress'

                return (
                  <Reveal key={project.id} delay={index * 0.045} className={index === 0 ? 'col-span-full' : 'h-full'}>
                    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-panel p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ice/35 hover:bg-surface sm:p-6">
                      <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${projectTones[project.accent]} via-transparent to-transparent`} aria-hidden="true" />
                      <div className="relative flex flex-1 flex-col">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span
                            className={`rounded-full border px-2.5 py-1 font-mono text-[0.64rem] font-medium uppercase tracking-[0.08em] ${
                              inProgress ? 'border-violet/40 text-violet' : 'border-ice/35 text-ice'
                            }`}
                          >
                            {project.status}
                          </span>
                          <span className="font-mono text-xs text-muted/70">Project {project.number}</span>
                        </div>
                        <h3 className={`mt-5 font-display leading-none tracking-[-0.035em] text-mist ${index === 0 ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
                        {project.result && (
                          <p className="mt-4 border-l-2 border-ice/45 pl-3 text-sm leading-6 text-mist/90">
                            <span className="font-semibold text-ice">Result:</span> {project.result}
                          </p>
                        )}
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                          {project.technologies.map((technology) => (
                            <li key={technology} className="rounded-full border border-line bg-ink/45 px-2.5 py-1 font-mono text-[0.68rem] leading-4 text-muted">
                              {technology}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-6">
                          {project.sourceUrl ? (
                            <a
                              href={project.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                            >
                              <Github size={16} /> View source <ArrowUpRight size={15} />
                            </a>
                          ) : (
                            <span className="inline-flex min-h-11 items-center text-sm text-muted">Source not public yet</span>
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

        <section id="skills" className="scroll-mt-24 border-y border-line bg-panel/55 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="Skills"
                title="A focused toolkit."
                description="Languages, systems foundations, and tools used across backend and infrastructure projects."
              />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-line bg-ink/35 px-3.5 py-3 text-sm text-muted">
                <span className="font-semibold text-mist">Currently learning:</span>
                {profile.learning.join(' · ')}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {skillGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.06}>
                  <article className="h-full rounded-2xl border border-line bg-ink/45 p-5 sm:p-6">
                    <span className={`block h-2.5 w-2.5 rounded-full ${skillDots[group.accent]}`} aria-hidden="true" />
                    <p className="mt-5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ice">{group.eyebrow}</p>
                    <h3 className="mt-2 font-display text-3xl leading-none tracking-[-0.035em] text-mist">{group.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{group.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                      {group.skills.map((skill) => (
                        <li key={skill} className="rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[0.68rem] leading-4 text-muted">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Journey"
                title="Learning by building."
                description="A short view of the education and experience that shaped my work so far."
              />
              <p className="mt-7 inline-flex rounded-xl border border-line bg-panel/65 px-3.5 py-3 text-sm text-muted">{profile.location}</p>
            </Reveal>

            <div className="divide-y divide-line border-y border-line">
              {timeline.map((item, index) => (
                <Reveal key={`${item.period}-${item.title}`} delay={index * 0.045}>
                  <article className="grid gap-3 py-6 sm:grid-cols-[10.5rem_1fr] sm:gap-7 sm:py-7">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-ice">{item.period}</p>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold leading-6 text-mist">{item.title}</h3>
                        {item.current && <span className="h-2 w-2 rounded-full bg-ice" aria-label="Current" />}
                      </div>
                      <p className="mt-1 text-sm text-muted/85">{item.organization}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-line bg-[linear-gradient(145deg,#142d49_0%,#0c1c2e_46%,#081421_100%)] p-6 shadow-glow sm:rounded-[2rem] sm:p-10 lg:p-14">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ice">05 — Contact</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.94] tracking-[-0.04em] text-mist sm:text-6xl">Let’s talk.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                I’m open to backend, software, or systems-engineering internships and jobs. Use the contact actions below to get in touch.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void handleCopyEmail()}
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-ink/45 px-4 py-3 text-sm font-semibold text-mist transition-colors hover:border-ice/45 hover:text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                  aria-label={emailCopied ? 'Email copied' : 'Copy email address'}
                >
                  {emailCopied ? <Check size={17} className="text-ice" /> : <Copy size={17} className="text-ice" />}
                  <span>{emailCopied ? 'Copied!' : 'Copy email'}</span>
                </button>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-ink/45 px-4 py-3 text-sm font-semibold text-mist transition-colors hover:border-ice/45 hover:text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
                >
                  <Github size={17} /> GitHub <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="mt-3 min-h-5 text-sm text-ice" role="status" aria-live="polite">
                {emailCopied ? 'Email address copied to clipboard.' : ''}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
            >
              <Github size={16} /> GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a href="#top" className="inline-flex min-h-11 items-center transition-colors hover:text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
