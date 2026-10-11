import { Link } from 'wouter'
import Cta from '../components/Cta'
import VideoHero from '../components/VideoHero'
import SeeAll from '../components/SeeAll'
import TownTile from '../components/TownTile'
import { AudiencePanels, FaqBlock, STRIPS, ServiceCards, StepCards } from '../components/Blocks'
import chapters from '../data/chapters.json'
import { LEADERSHIP } from '../data/team'
import { BUSINESS_STEPS, HOME, SERVICES } from '../content/copy'
import { Reveal, Stagger } from '../components/motion/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { trackOutbound } from '../lib/siteEvents'
import { useDocumentMeta } from '../lib/meta'

const countryCount = new Set(chapters.map((c) => (c.region === 'Mexico' ? 'MX' : 'US'))).size

function SectionTop({ title, lede, children }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <SectionHead title={title} lede={lede} />
      {children}
    </div>
  )
}

function Hero() {
  const { hero, facts } = HOME
  const FACTS = [
    [String(chapters.length), facts.chapters],
    [String(countryCount), facts.countries],
    ['$0', facts.cost],
    ['1', facts.perTown],
  ]

  return (
    <VideoHero
      title={hero.title}
      lede={hero.lede}
      actions={
        <>
          <Cta to="/request" tone="sky" size="xl" onClick={() => trackOutbound('fork_click', 'business')}>
            {hero.businessCta}
          </Cta>
          <Cta to="/chapter" tone="outlineLight" size="xl" onClick={() => trackOutbound('fork_click', 'chapter')}>
            {hero.studentCta}
          </Cta>
        </>
      }
    >
      <dl className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {FACTS.map(([value, label]) => (
          <div key={label} className="glass rounded-2xl px-4 py-5 text-center">
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="block font-display text-4xl leading-none text-white sm:text-5xl">{value}</span>
              <span className="kicker mt-3 block text-white/70">{label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </VideoHero>
  )
}

function WhatWeDo() {
  const { whatWeDo } = HOME
  return (
    <Section
      weight="anchor"
      className="lines-bg z-10 -mt-10 rounded-t-[2.5rem] shadow-[0_-24px_60px_-12px_rgba(6,20,38,0.55)] sm:-mt-12 sm:rounded-t-[3rem]"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHead title={whatWeDo.title} />

        <div>
          <Reveal variant="up">
            <figure className="card card-strip strip-2 relative px-7 pb-8 pt-10 sm:px-10">
              <span aria-hidden="true" className="absolute left-6 top-1 font-display text-[5.5rem] leading-none text-navy-100 sm:left-8">
                “
              </span>
              <blockquote className="relative font-display text-[1.5rem] leading-snug text-ink sm:text-[1.85rem]">
                {whatWeDo.quote}
              </blockquote>
            </figure>
          </Reveal>

          <Stagger className="mt-6 grid gap-3 sm:grid-cols-3" gap={0.07}>
            {whatWeDo.roles.map(([who, does], i) => (
              <Reveal key={who} stagger className="h-full">
                <div className="h-full rounded-2xl border border-navy-200 bg-white/80 p-5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-50 font-display text-base text-navy-700">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-display text-[1.4rem] leading-tight text-ink">{who}</p>
                  <p className="mt-1.5 text-body-sm leading-relaxed text-ink-soft">{does}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}

const WHY_LINKS = ['/request', '/chapter']

function WhyCare() {
  const { why } = HOME
  return (
    <section className="relative isolate z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-navy-950 px-6 pb-24 pt-20 text-white shadow-[0_-24px_60px_-12px_rgba(6,20,38,0.35)] sm:-mt-12 sm:rounded-t-[3rem] lg:pb-32 lg:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_50%_0%,rgba(59,141,204,0.25),transparent_70%),repeating-linear-gradient(115deg,transparent_0_46px,rgba(255,255,255,0.03)_46px_47px)]"
      />
      <div className="mx-auto grid max-w-page gap-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <Reveal variant="up" className="glass flex flex-col justify-center rounded-3xl p-8 sm:p-10">
          <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-gold-300" />
          <h2 className="font-display text-display-lg text-white">{why.title}</h2>
          <p className="mt-5 text-body-lg leading-relaxed text-white/75">{why.lede}</p>
        </Reveal>

        {why.cards.map(({ audience, points, cta }, i) => (
          <Reveal key={audience} variant="up" delay={0.08 * (i + 1)} className="h-full">
            <Link
              href={WHY_LINKS[i]}
              className="group glass flex h-full flex-col rounded-3xl p-7 transition-colors hover:bg-navy-800/70"
            >
              <span className="tag w-fit border-white/15 bg-white/10 text-white/85">{audience}</span>
              <ul className="mt-6 flex-1 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-body leading-relaxed text-white/85">
                    <span aria-hidden="true" className="mt-[0.35rem] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold-300/20 text-[10px] text-gold-300">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 text-body-sm font-semibold text-gold-300">
                {cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <Section
      weight="anchor"
      className="z-10 -mt-10 rounded-t-[2.5rem] bg-white shadow-[0_-24px_60px_-12px_rgba(6,20,38,0.45)] sm:-mt-12 sm:rounded-t-[3rem]"
    >
      <SectionTop title={HOME.services.title}>
        <SeeAll to="/business">{HOME.services.link}</SeeAll>
      </SectionTop>
      <ServiceCards services={SERVICES} />
    </Section>
  )
}

function Steps() {
  return (
    <Section weight="anchor" className="blend-to-deep">
      <SectionTop title={HOME.steps.title}>
        <Cta to="/request" size="lg" onClick={() => trackOutbound('business_request_click', 'home-steps')}>
          {HOME.steps.cta}
        </Cta>
      </SectionTop>
      <StepCards steps={BUSINESS_STEPS} />
    </Section>
  )
}

function Network() {
  const { chapters: copy } = HOME
  return (
    <Section weight="anchor" className="lines-bg blend-from-deep">
      <SectionTop title={copy.title}>
        <SeeAll to="/business#coverage">{copy.link}</SeeAll>
      </SectionTop>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
        {chapters.map((chapter, i) => (
          <Reveal key={chapter.id} stagger className="h-full">
            <article className={`card card-strip card-hover ${STRIPS[i % STRIPS.length]} flex h-full flex-col`}>
              <TownTile lat={chapter.location.lat} lng={chapter.location.lng} label={chapter.name} className="h-36" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="tag">{chapter.region}</span>
                  <span className="flex items-center gap-1.5 text-[12px] font-medium text-gold-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Active
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[1.65rem] leading-tight text-ink">{chapter.name}</h3>
                <p className="mt-1 text-body-sm text-ink-soft">{chapter.abbreviation} · {chapter.radius} service area</p>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal stagger className="h-full">
          <Link
            href="/apply"
            className="group flex h-full min-h-[18rem] flex-col justify-end rounded-2xl border-2 border-dashed border-navy-300 bg-white/70 p-5 transition-colors hover:border-gold-400 hover:bg-white"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-50 text-2xl text-navy-500 transition-colors group-hover:bg-gold-500 group-hover:text-white">
              +
            </span>
            <h3 className="mt-auto pt-10 font-display text-[1.65rem] leading-tight text-ink">{copy.openCard.title}</h3>
            <p className="mt-1 text-body-sm text-ink-soft">{copy.openCard.body}</p>
            <span className="mt-4 text-body-sm font-semibold text-gold-500">
              {copy.openCard.cta} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </Reveal>
      </Stagger>
    </Section>
  )
}

/* Renders only once real, approved client work is added to HOME.projects.items. */
function Projects() {
  const { projects } = HOME
  if (!projects.items.length) return null
  return (
    <Section weight="anchor">
      <SectionTop title={projects.title} />
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {projects.items.map((project, i) => (
          <Reveal key={project.name} stagger className="h-full">
            <article className={`card card-strip card-hover ${STRIPS[i % STRIPS.length]} flex h-full flex-col p-3`}>
              {project.image && (
                <img src={project.image} alt={project.name} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
              )}
              <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                  {project.status && <span className="tag ml-auto border-gold-200 bg-gold-50 text-gold-600">{project.status}</span>}
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink">{project.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4 text-body-sm text-ink-soft">
                  <span>{project.town}</span>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-500 hover:text-gold-700">
                      View live site →
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  )
}

function People() {
  const featured = LEADERSHIP.filter((member) => member.photo).slice(0, 4)
  const { people } = HOME

  return (
    <Section weight="anchor" className="blend-to-deep">
      <SectionTop title={people.title} lede={people.lede}>
        <SeeAll to="/team">{people.link}</SeeAll>
      </SectionTop>

      <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4" gap={0.07}>
        {featured.map((member, i) => (
          <Reveal key={member.name} stagger className="h-full">
            <Link href="/team" className={`card card-strip card-hover ${STRIPS[i % STRIPS.length]} block h-full p-3`}>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-navy-50">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: member.photoPosition }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <span className="tag">{member.role}</span>
                <p className="mt-3 font-display text-xl text-ink">{member.name}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  )
}

export default function Landing() {
  useDocumentMeta('home')

  return (
    <div className="w-full">
      <Hero />
      <WhatWeDo />
      <WhyCare />
      <Services />
      <Steps />
      <Network />
      <Projects />
      <People />
      <Section weight="anchor" className="blend-from-deep">
        <FaqBlock title={HOME.faq.title} keys={HOME.faq.keys} />
      </Section>
      <AudiencePanels
        business={HOME.close.business}
        student={HOME.close.student}
        onBusiness={() => trackOutbound('fork_click', 'business-close')}
        onStudent={() => trackOutbound('fork_click', 'chapter-close')}
      />
    </div>
  )
}
