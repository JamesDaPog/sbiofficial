import { Reveal } from './Reveal'

/**
 * Editorial section head: a small uppercase kicker sitting on a hairline,
 * a serif headline, and an optional one- or two-sentence lede.
 */
export default function SectionHead({
  kicker,
  title,
  lede,
  weight = 'anchor',
  align = 'left',
  tone = 'light',
  className = '',
  children,
}) {
  const centered = align === 'center'
  const dark = tone === 'dark'
  const titleSize =
    weight === 'anchor'
      ? 'text-[2.4rem] sm:text-[3.4rem] lg:text-[4.4rem]'
      : 'text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem]'

  return (
    <Reveal variant="up" className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {kicker ? (
        <p
          className={`kicker mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''} ${
            dark ? 'text-gold-300' : 'text-gold-500'
          }`}
        >
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-gold-300/70' : 'bg-gold-400'}`} />
          {kicker}
        </p>
      ) : (
        <span
          aria-hidden="true"
          className={`mb-5 block h-1 w-10 rounded-full ${dark ? 'bg-gold-300' : 'bg-gold-400'} ${centered ? 'mx-auto' : ''}`}
        />
      )}
      <h2
        className={`max-w-[22ch] font-display ${titleSize} font-normal leading-[1.02] tracking-[-0.02em] ${
          dark ? 'text-white' : 'text-ink'
        } ${centered ? 'mx-auto' : ''}`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 max-w-[58ch] text-body-lg leading-relaxed ${
            dark ? 'text-white/75' : 'text-ink-soft'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {lede}
        </p>
      )}
      {children}
    </Reveal>
  )
}
