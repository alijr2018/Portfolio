type SectionHeadingProps = {
  number: string
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className={`font-mono text-xs font-medium uppercase tracking-[0.14em] text-ice ${centered ? 'text-center' : ''}`}>
        {number} — {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-5xl leading-[0.96] tracking-[-0.035em] text-mist sm:text-6xl">
        {title}
      </h2>
      <p className={`mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}>{description}</p>
    </div>
  )
}
