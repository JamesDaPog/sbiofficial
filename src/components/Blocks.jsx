import { Link } from 'wouter'
import { Mail, Phone } from 'lucide-react'
import Accordion from './Accordion'
import ServiceArt from './ServiceArt'
import SectionHead from './motion/SectionHead'
import { Reveal, Stagger } from './motion/Reveal'
import { CONTACT_CARD, FAQ } from '../content/copy'

export const STRIPS = ['strip-1', 'strip-2', 'strip-3', 'strip-4']

const CONTACT_EMAIL = 'ebsbi.official@gmail.com'
const CONTACT_PHONE = '(201) 988-9390'

/**
 * Numbered step cards joined by a connector line on wide screens. Used for
 * every "how it works" sequence on the site.
 */
export function StepCards({ steps, columns = 4 }) {
  const grid = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
  return (
    <div className="relative mt-12">
      <div
        aria-hidden="true"
        className={`absolute left-6 right-6 top-[2.75rem] hidden border-t-2 border-dashed border-navy-300 ${columns === 3 ? 'md:block' : 'lg:block'}`}
      />
      <Stagger className={`relative grid gap-5 ${grid}`} gap={0.08}>
        {steps.map(([title, body], i) => (
          <Reveal key={title} stagger className="h-full">
            <article className="card card-hover h-full p-6">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-navy-900 font-display text-xl text-white ring-8 ring-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{title}</h3>
              <p className="mt-2.5 text-body-sm leading-relaxed text-ink-soft">{body}</p>
            </article>
          </Reveal>
        ))}
      </Stagger>
    </div>
  )
}

/** Cards with a coloured top strip and a numeral. Takes [title, body] pairs. */
export function FeatureCards({ items, columns = 2 }) {
  const grid = columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'
  return (
    <Stagger className={`mt-12 grid gap-5 ${grid}`} gap={0.07}>
      {items.map(([title, body], i) => (
        <Reveal key={title} stagger className="h-full">
          <article className={`card card-strip card-hover ${STRIPS[i % STRIPS.length]} flex h-full flex-col p-7`}>
            <span className="font-display text-4xl leading-none text-navy-400">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 font-display text-[1.6rem] leading-tight text-ink">{title}</h3>
            <p className="mt-2.5 text-body-sm leading-relaxed text-ink-soft">{body}</p>
          </article>
        </Reveal>
      ))}
    </Stagger>
  )
}

/** Service cards with a drawn illustration of each service. */
export function ServiceCards({ services }) {
  return (
    <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
      {services.map((service, i) => (
        <Reveal key={service.title} stagger className="h-full">
          <article className={`card card-strip card-hover ${STRIPS[i % STRIPS.length]} flex h-full flex-col p-3`}>
            <ServiceArt kind={service.art} />
            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
              <h3 className="font-display text-[1.5rem] leading-tight text-ink">{service.title}</h3>
              <p className="mt-2 flex-1 text-body-sm leading-relaxed text-ink-soft">{service.body}</p>
              <span className="tag mt-5 w-fit border-gold-200 bg-gold-50 text-gold-600">Free</span>
            </div>
          </article>
        </Reveal>
      ))}
    </Stagger>
  )
}

/** Hairline definition rows. Used for reference lists: roles and rules. */
export function DefinitionRows({ items }) {
  return (
    <Stagger as="dl" className="border-t border-ink/25" gap={0.1}>
      {items.map(([term, body]) => (
        <Reveal
          key={term}
          stagger
          className="grid gap-1.5 border-b border-ink/20 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
        >
          <dt className="font-display text-xl leading-snug text-ink">{term}</dt>
          <dd className="text-body-sm leading-relaxed text-ink-soft">{body}</dd>
        </Reveal>
      ))}
    </Stagger>
  )
}

/** Navy card that points people to a real person when the FAQ isn't enough. */
export function ContactCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-7 text-white">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/20 blur-2xl" />
      <p className="relative font-display text-2xl">{CONTACT_CARD.title}</p>
      <p className="relative mt-2 text-body-sm text-white/70">{CONTACT_CARD.body}</p>
      <div className="relative mt-6 flex flex-col gap-2 text-body-sm">
        <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3 hover:bg-white/14">
          <Mail aria-hidden="true" size={16} className="shrink-0 text-gold-300" />
          <span className="break-all">{CONTACT_EMAIL}</span>
        </a>
        <a href="tel:+12019889390" className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3 hover:bg-white/14">
          <Phone aria-hidden="true" size={16} className="shrink-0 text-gold-300" />
          {CONTACT_PHONE}
        </a>
      </div>
    </div>
  )
}

/** FAQ section body: title and contact card on the left, questions on the right. */
export function FaqBlock({ title, keys }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="flex flex-col gap-8">
        <SectionHead title={title} />
        <div className="hidden lg:block">
          <ContactCard />
        </div>
      </div>
      <div>
        <Stagger className="border-b border-ink/25" gap={0.08}>
          {keys.map((key, i) => {
            const [q, a] = FAQ[key]
            return (
              <Reveal key={key} stagger>
                <Accordion title={q} indexNumber={String(i + 1).padStart(2, '0')} defaultOpen={i === 0}>
                  <p>{a}</p>
                </Accordion>
              </Reveal>
            )
          })}
        </Stagger>
        <div className="mt-8 lg:hidden">
          <ContactCard />
        </div>
      </div>
    </div>
  )
}

/** Navy closing band shared by every page. */
export function CloseBand({ title, children }) {
  return (
    <section className="sheet isolate overflow-hidden bg-navy-950 px-6 pb-20 pt-24 text-white sm:px-8 lg:pb-24 lg:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_80%_at_50%_100%,rgba(59,141,204,0.22),transparent_70%),repeating-linear-gradient(115deg,transparent_0_46px,rgba(255,255,255,0.03)_46px_47px)]"
      />
      <div className="mx-auto flex max-w-page flex-col items-center text-center">
        <h2 className="max-w-[22ch] font-display text-display-lg">{title}</h2>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">{children}</div>
      </div>
    </section>
  )
}

/** Two large linked panels, one per audience. Homepage and About. */
export function AudiencePanels({ business, student, onBusiness, onStudent, studentFirst = false }) {
  const panels = [
    { ...business, to: '/request', onClick: onBusiness, cls: 'bg-gold-500 hover:bg-gold-600', labelCls: 'text-white/70', ctaCls: 'text-white' },
    { ...student, to: '/apply', onClick: onStudent, cls: 'bg-navy-950 hover:bg-navy-900', labelCls: 'text-white/55', ctaCls: 'text-gold-300' },
  ]
  const ordered = studentFirst ? panels.reverse() : panels
  return (
    <section className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-page gap-4 md:grid-cols-2">
        {ordered.map((panel) => (
          <Link
            key={panel.to}
            href={panel.to}
            onClick={panel.onClick}
            className={`group relative overflow-hidden rounded-3xl px-8 py-14 text-white transition-colors sm:px-12 lg:py-20 ${panel.cls}`}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_46px,rgba(255,255,255,0.05)_46px_47px)]" />
            <p className={`kicker relative ${panel.labelCls}`}>{panel.label}</p>
            <h2 className="relative mt-4 max-w-[16ch] font-display text-display-lg">{panel.title}</h2>
            <span className={`relative mt-8 inline-flex items-center gap-2 font-semibold ${panel.ctaCls}`}>
              {panel.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
