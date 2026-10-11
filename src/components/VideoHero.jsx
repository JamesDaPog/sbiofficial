import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HeroFilm, { FOOTAGE_CREDIT, heroRise, useHeroScroll } from './HeroFilm'

/**
 * Homepage hero: the skyline film full screen under a navy wash. The next
 * section overlaps the bottom of the hero (see `.sheet`).
 */

/* Darker at the top for the header, a soft pool behind the copy, and a long
   fade to navy at the bottom where the next section overlaps. */
const WASH =
  'bg-[radial-gradient(55%_40%_at_50%_45%,rgba(6,20,38,0.5),transparent_75%),linear-gradient(180deg,rgba(6,20,38,0.55)_0%,rgba(6,20,38,0.1)_30%,rgba(6,20,38,0.15)_60%,rgba(6,20,38,0.95)_100%)]'

export default function VideoHero({ title, lede, actions, children }) {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const scroll = useHeroScroll(sectionRef)
  const anim = (delay) => (reduced ? {} : heroRise(delay))

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-navy-950 text-white">
      <HeroFilm scroll={scroll} />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${WASH}`} />

      <motion.div
        style={reduced ? undefined : { y: scroll.copyY, opacity: scroll.copyOpacity }}
        className="mx-auto flex min-h-[100svh] max-w-page flex-col items-start justify-center px-6 pb-28 pt-[calc(68px+4rem)] text-left sm:items-center sm:px-8 sm:text-center sm:pb-32"
      >
        <motion.h1
          {...anim(0.1)}
          className="max-w-[20ch] font-display text-display-xl font-normal tracking-[-0.025em] text-white [text-shadow:0_2px_30px_rgba(6,20,38,0.45)]"
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p {...anim(0.2)} className="mt-6 max-w-[58ch] text-body-lg text-white/90 [text-shadow:0_1px_18px_rgba(6,20,38,0.6)]">
            {lede}
          </motion.p>
        )}
        {actions && (
          <motion.div {...anim(0.3)} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {actions}
          </motion.div>
        )}
        {children && <motion.div {...anim(0.4)} className="w-full">{children}</motion.div>}
      </motion.div>

      <p className="absolute bottom-14 right-4 text-[11px] text-white/55 sm:right-6">{FOOTAGE_CREDIT}</p>
    </section>
  )
}
