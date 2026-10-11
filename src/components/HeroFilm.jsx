import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE } from './motion/Reveal'

/**
 * Shared hero pieces: the homepage skyline film, the scroll parallax every
 * hero uses (background drifts down, copy drifts up and fades a little), and
 * the entrance for hero copy. With reduced motion there are no scroll effects
 * and the film is replaced by its poster frame.
 */

/* 4K wherever the screen has more than ~2000 device pixels across: big
   monitors, and retina laptops and tablets. 1080p everywhere else. The browser
   takes the first source whose media query and type it supports. */
const WIDE_SCREEN = '(min-width: 1800px), (min-width: 1024px) and (min-resolution: 1.5dppx)'
const VIDEO_SOURCES = [
  ['/hero-skylines-4k.webm', 'video/webm', WIDE_SCREEN],
  ['/hero-skylines-4k.mp4', 'video/mp4', WIDE_SCREEN],
  ['/hero-skylines.webm', 'video/webm'],
  ['/hero-skylines.mp4', 'video/mp4'],
]
const POSTER = '/hero-skylines-poster.jpg'

export const FOOTAGE_CREDIT = 'Footage: the Dronalist, CC BY 3.0, via Wikimedia Commons'

/* Pause the film while the hero is off screen so it doesn't burn battery. */
function usePlayWhenVisible(ref) {
  useEffect(() => {
    const video = ref.current
    if (!video || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [ref])
}

/** Scroll-linked values for a hero section. */
export function useHeroScroll(sectionRef) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  return {
    backdropY: useTransform(scrollYProgress, [0, 1], ['0%', '18%']),
    copyY: useTransform(scrollYProgress, [0, 1], [0, -80]),
    copyOpacity: useTransform(scrollYProgress, [0, 0.7], [1, 0.4]),
  }
}

/** Entrance for hero copy: a short fade up. */
export const heroRise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

/** Full-bleed background that drifts with the scroll. */
export function HeroBackdrop({ scroll, children }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 -z-20"
      style={reduced ? undefined : { y: scroll.backdropY }}
    >
      {children}
    </motion.div>
  )
}

/** The skyline film, or its poster with reduced motion. */
export default function HeroFilm({ scroll }) {
  const videoRef = useRef(null)
  const reduced = useReducedMotion()
  usePlayWhenVisible(videoRef)

  return (
    <HeroBackdrop scroll={scroll}>
      {reduced ? (
        <img src={POSTER} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          {VIDEO_SOURCES.map(([src, type, media]) => (
            <source key={src} src={src} type={type} media={media} />
          ))}
        </video>
      )}
    </HeroBackdrop>
  )
}
