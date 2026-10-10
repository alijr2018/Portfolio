import { type FormEvent, useState } from 'react'
import { Check, Copy, Mail, Send } from 'lucide-react'
import { profile } from '../data/profile'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormValues>(initialValues)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const mailtoHref = `mailto:${profile.email}`

  const updateField = (field: keyof FormValues, value: string) => {
    setSubmitted(false)
    setForm((current) => ({ ...current, [field]: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)

    setSubmitted(true)
    window.location.href = `${mailtoHref}?subject=${subject}&body=${body}`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  const fieldClassName =
    'mt-2 w-full rounded-xl border border-white/10 bg-black/15 px-3.5 py-3 text-sm text-mist outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-lime/55 focus:ring-2 focus:ring-lime/15'

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#202a22] p-5 shadow-soft sm:p-7 lg:p-8">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-ink">
          <Mail size={19} />
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Write a note</p>
          <p className="mt-1 text-sm leading-6 text-muted">Your email app will open with the message prefilled.</p>
        </div>
      </div>

      <form className="mt-7" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-mist">
            Name
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className={fieldClassName}
              placeholder="Your name"
            />
          </label>
          <label className="text-sm font-medium text-mist">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              className={fieldClassName}
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-mist">
          Subject
          <input
            required
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            className={fieldClassName}
            placeholder="How can we work together?"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-mist">
          Message
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className={`${fieldClassName} resize-y`}
            placeholder="A little about your idea, role, or project..."
          />
        </label>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-3 text-sm font-bold text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#cfdbb7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            Send message <Send size={16} />
          </button>
          <a
            href={mailtoHref}
            className="text-sm font-medium text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            Or email directly
          </a>
        </div>

        {submitted && (
          <p className="mt-4 flex items-center gap-2 rounded-lg border border-lime/20 bg-lime/10 px-3 py-2 text-sm text-lime" role="status">
            <Check size={16} /> Your message is ready in your email app.
          </p>
        )}
      </form>

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
        <a
          href={mailtoHref}
          className="min-w-0 truncate text-sm text-mist transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-2 text-xs font-semibold text-muted transition-colors hover:border-white/20 hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          aria-label="Copy email address"
        >
          {copied ? <Check size={14} className="text-lime" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
