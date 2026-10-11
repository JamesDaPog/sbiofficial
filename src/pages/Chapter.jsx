import { useEffect } from 'react'
import { Handshake, MonitorPlay, Users, Wrench } from 'lucide-react'
import Cta from '../components/Cta'
import StickyMobileCta from '../components/StickyMobileCta'
import { Reveal, Stagger } from '../components/motion/Reveal'
import PageHero from '../components/PageHero'
import { FOOTAGE_CREDIT } from '../components/HeroFilm'
import { CloseBand, DefinitionRows, FaqBlock, StepCards } from '../components/Blocks'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { STUDENTS } from '../content/copy'
import { initScrollDepth, trackApply } from '../lib/siteEvents'
import { useDocumentMeta } from '../lib/meta'

const GAIN_ICONS = [Handshake, MonitorPlay, Users, Wrench]

function Hero() {
  const { hero } = STUDENTS
  return (
    <PageHero
      kicker={hero.kicker}
      title={hero.title}
      accent="before you graduate."
      lede={hero.lede}
      variant="photo"
      image="/hero-students"
      credit={FOOTAGE_CREDIT}
      actions={
        <>
          <Cta to="/apply" tone="sky" size="xl" onClick={() => trackApply('hero')}>
            {hero.primaryCta}
          </Cta>
          <Cta to="/manual" tone="outlineLight" size="xl">
            {hero.secondaryCta}
          </Cta>
        </>
      }
    />
  )
}

function Gains() {
  const { gains } = STUDENTS
  return (
    <section className="sheet isolate overflow-hidden bg-navy-950 px-6 pb-24 pt-20 text-white sm:px-8 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_50%_0%,rgba(59,141,204,0.25),transparent_70%),repeating-linear-gradient(115deg,transparent_0_46px,rgba(255,255,255,0.03)_46px_47px)]"
      />
      <div className="mx-auto grid max-w-page gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <Reveal variant="up" className="glass rounded-3xl p-8 sm:p-10">
          <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-gold-300" />
          <h2 className="font-display text-display-lg text-white">{gains.title}</h2>
          <p className="mt-5 text-body-lg leading-relaxed text-white/75">{gains.lede}</p>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
          {gains.cards.map(([title, body], i) => {
            const Icon = GAIN_ICONS[i % GAIN_ICONS.length]
            return (
            <Reveal key={title} stagger className="h-full">
              <article className="glass h-full rounded-2xl p-6">
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-gold-300/15 text-gold-300">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-2xl text-white">{title}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-white/75">{body}</p>
              </article>
            </Reveal>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

export default function Chapter() {
  useDocumentMeta('chapter')
  useEffect(() => initScrollDepth('chapter'), [])
  const { work, roles, path, faq, close } = STUDENTS

  return (
    <div className="w-full">
      <Hero />
      <Section weight="anchor" className="lines-bg sheet">
        <SectionHead title={work.title} />
        <StepCards steps={work.steps} columns={3} />
      </Section>
      <Gains />
      <Section weight="anchor" className="sheet bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead title={roles.title} lede={roles.lede} />
          <DefinitionRows items={roles.items} />
        </div>
      </Section>
      <Section weight="anchor" className="blend-to-deep">
        <SectionHead title={path.title} />
        <StepCards steps={path.steps} />
      </Section>
      <Section weight="anchor" className="blend-from-deep">
        <FaqBlock title={faq.title} keys={faq.keys} />
      </Section>
      <CloseBand title={close.title}>
        <Cta to="/apply" tone="sky" size="xl" onClick={() => trackApply('close')}>
          {close.cta}
        </Cta>
      </CloseBand>
      <StickyMobileCta href="/apply" label={close.cta} onClick={() => trackApply('sticky')} />
    </div>
  )
}
