import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1]

/* Variant table. Each entry is [hidden, visible]. Only transform/opacity/filter
   are animated, never layout properties. */
/* Kept small: content settles into place, it does not perform. */
const RISE = [{ opacity: 0, y: 24 }, { opacity: 1, y: 0 }]
const VARIANTS = {
  up: RISE,
  down: [{ opacity: 0, y: -16 }, { opacity: 1, y: 0 }],
  left: [{ opacity: 0, x: -24 }, { opacity: 1, x: 0 }],
  right: [{ opacity: 0, x: 24 }, { opacity: 1, x: 0 }],
  blur: RISE,
  scale: RISE,
  wake: RISE,
}

/**
 * Scroll-triggered reveal. Use `stagger` when the element is a direct child of
 * a <Stagger> so timing is owned by the parent instead of a hand-tuned delay.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  stagger = false,
  as: Tag = motion.div,
  ...rest
}) {
  const reduced = useReducedMotion()
  const [hidden, visible] = VARIANTS[variant] ?? VARIANTS.up

  if (reduced) return <div className={className}>{children}</div>

  if (stagger) {
    return (
      <Tag
        variants={{ hidden, visible: { ...visible, transition: { duration, ease: EASE } } }}
        className={className}
        {...rest}
      >
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent that sequences any <Reveal stagger> children. */
export function Stagger({ children, className = '', gap = 0.08, delay = 0, as = 'div', ...rest }) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  const Plain = as
  if (reduced) return <Plain className={className}>{children}</Plain>

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Headline that rises word by word out of a clipped baseline.
 *
 * The scroll trigger has to sit on the unclipped wrapper, not on the words:
 * each word starts translated fully outside its own overflow-hidden mask, so
 * an observer attached to the word itself would never see it intersect and the
 * headline would stay invisible forever. The wrapper watches, the words follow
 * through variants.
 */
export function SplitWords({ text, className = '', delay = 0, wordClassName = '', immediate = false }) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  /* Hero headlines are frequently the LCP element. Animating them in from
     opacity 0 delays the largest paint by the full stagger, so `immediate`
     renders plain text and lets the paint happen on the first frame. */
  if (reduced || immediate) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      initial="hidden"
      /* Hero headlines animate on mount. Waiting for an intersection callback
         leaves the first screen visibly empty for a beat on a cold load. */
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, margin: '-8% 0px -8% 0px' } })}
      variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Scroll-scrubbed parallax. `speed` is the fraction of the scrolled distance
 * the element lags behind by; negative values lead instead of lag.
 */
export function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}

export { EASE }
