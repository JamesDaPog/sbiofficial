import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HeroBackdrop, heroRise, useHeroScroll } from './HeroFilm'

/**
 * Inner-page hero, in the Novus pattern: left-aligned kicker, a large serif
 * headline with one phrase in accent blue, a lede and pill actions. Pages pick
 * a layout so they don't all open the same way:
 *
 *   photo  full-bleed photo under a left-weighted navy wash
 *   split  navy band with the copy left and `aside` (a photo collage) right
 *   band   short navy band, copy left, optional `aside` right
 *
 * The section after a hero should carry `.sheet` so it curves up over it.
 */

const PHOTO_WASH =
  'bg-[linear-gradient(90deg,rgba(6,20,38,0.85)_0%,rgba(6,20,38,0.5)_42%,rgba(6,20,38,0)_75%),linear-gradient(180deg,rgba(6,20,38,0.4)_0%,transparent_25%,transparent_72%,rgba(6,20,38,0.95)_100%)]'

const BAND_TEXTURE =
  'bg-[radial-gradient(50%_70%_at_85%_10%,rgba(59,141,204,0.24),transparent_70%),repeating-linear-gradient(115deg,transparent_0_46px,rgba(255,255,255,0.035)_46px_47px)]'

function Headline({ title, accent }) {
  const at = accent ? title.indexOf(accent) : -1
  if (at < 0) return title
  return (
    <>
      {title.slice(0, at)}
      <span className="text-gold-300">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  )
}

export default function PageHero({
  variant = 'band',
  kicker,
  title,
  accent,
  lede,
  actions,
  image,
  credit,
  aside,
  children,
}) {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const scroll = useHeroScroll(sectionRef)
  const anim = (delay) => (reduced ? {} : heroRise(delay))
  const isPhoto = variant === 'photo'
  const hasAside = Boolean(aside) && !isPhoto

  const height = {
    photo: 'min-h-[min(48rem,84svh)] pb-32 pt-24',
    split: 'pb-28 pt-16 sm:pt-20 lg:pb-36 lg:pt-24',
    band: 'pb-24 pt-16 sm:pt-20 lg:pb-28 lg:pt-24',
  }[variant]

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-navy-950 text-white">
      {isPhoto ? (
        <>
          <HeroBackdrop scroll={scroll}>
            <picture>
              <source srcSet={`${image}.webp`} type="image/webp" />
              <img src={`${image}.jpg`} alt="" className="h-full w-full object-cover" fetchPriority="high" />
            </picture>
          </HeroBackdrop>
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${PHOTO_WASH}`} />
        </>
      ) : (
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${BAND_TEXTURE}`} />
      )}

      <div
        className={`mx-auto grid max-w-page items-center gap-12 px-6 sm:px-8 ${height} ${
          hasAside ? 'lg:grid-cols-[1.05fr_0.95fr] lg:gap-16' : ''
        } ${isPhoto ? 'content-center' : ''}`}
      >
        <motion.div style={reduced ? undefined : { y: scroll.copyY, opacity: scroll.copyOpacity }}>
          {kicker && (
            <motion.p {...anim(0.05)} className="kicker text-gold-300">
              {kicker}
            </motion.p>
          )}
          <motion.h1
            {...anim(0.12)}
            className={`mt-5 font-display font-normal leading-[1.02] tracking-[-0.02em] text-white ${
              hasAside ? 'max-w-[16ch]' : 'max-w-[18ch]'
            } text-[clamp(2.5rem,6vw,5.2rem)]`}
          >
            <Headline title={title} accent={accent} />
          </motion.h1>
          {lede && (
            <motion.p {...anim(0.2)} className="mt-6 max-w-[54ch] text-body-lg text-white/90 [text-shadow:0_1px_18px_rgba(6,20,38,0.7)]">
              {lede}
            </motion.p>
          )}
          {actions && (
            <motion.div {...anim(0.28)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              {actions}
            </motion.div>
          )}
          {children}
        </motion.div>

        {hasAside && <motion.div {...anim(0.3)}>{aside}</motion.div>}
      </div>

      {credit && <p className="absolute bottom-14 right-4 text-[10.5px] text-white/40 sm:right-6">{credit}</p>}
    </section>
  )
}
