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
      <div
        className={`mb-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-lime ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-lime/30 bg-lime/10 px-1.5 text-[0.6rem]">
          {number}
        </span>
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl leading-[0.98] tracking-[-0.045em] text-mist sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
    </div>
  )
}
