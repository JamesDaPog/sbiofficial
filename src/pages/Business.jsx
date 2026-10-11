import { Suspense, lazy } from 'react'
import { MapSkeleton } from '../components/Skeleton'
import Cta from '../components/Cta'
import StickyMobileCta from '../components/StickyMobileCta'
import { CONTACT_EMAIL } from '../components/Layout'
import PageHero from '../components/PageHero'
import { FOOTAGE_CREDIT } from '../components/HeroFilm'
import TownTile from '../components/TownTile'
import { CloseBand, FaqBlock, STRIPS, ServiceCards, StepCards } from '../components/Blocks'
import chapters from '../data/chapters.json'
import { BUSINESS, BUSINESS_STEPS, SERVICES } from '../content/copy'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { trackOutbound } from '../lib/siteEvents'
import { useDocumentMeta } from '../lib/meta'

const ChapterMap = lazy(() => import('../components/ChapterMap'))

function Hero() {
  const { hero } = BUSINESS
  return (
    <PageHero
      kicker={hero.kicker}
      title={hero.title}
      accent="Free."
      lede={hero.lede}
      variant="photo"
      image="/hero-business"
      credit={FOOTAGE_CREDIT}
      actions={
        <>
          <Cta to="/request" tone="sky" size="xl" onClick={() => trackOutbound('business_request_click', 'hero')}>
            {hero.primaryCta}
          </Cta>
          <Cta href="#coverage" tone="outlineLight" size="xl" arrow="↓">
            {hero.secondaryCta}
          </Cta>
        </>
      }
    />
  )
}

function ChapterCard({ chapter, index }) {
  const { coverage } = BUSINESS
  const href = chapter.contact
    ? `mailto:${chapter.contact}`
    : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Business request: ${chapter.name}`)}`

  return (
    <article className={`card card-strip ${STRIPS[index % STRIPS.length]} grid grid-cols-[6rem_1fr]`}>
      <TownTile lat={chapter.location.lat} lng={chapter.location.lng} label={chapter.name} className="h-full min-h-[8rem]" />
      <div className="p-4">
        <p className="kicker text-gold-500">{chapter.region}</p>
        <h3 className="mt-1 font-display text-[1.45rem] leading-tight text-ink">{chapter.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {chapter.services.map((service) => (
            <span key={service} className="rounded-full bg-paper-deep px-2 py-0.5 text-[11.5px] text-ink-soft">
              {service}
            </span>
          ))}
        </div>
        <a
          href={href}
          onClick={() => trackOutbound('chapter_email_click', chapter.id)}
          className="mt-3 inline-block text-body-sm font-semibold text-gold-500 hover:text-gold-700"
        >
          {chapter.contact ? coverage.emailChapter : coverage.emailSbi} →
        </a>
      </div>
    </article>
  )
}

function Coverage() {
  const { coverage } = BUSINESS
  return (
    <Section id="coverage" weight="anchor" className="blend-to-deep">
      <SectionHead title={coverage.title} lede={coverage.lede} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-8">
        <div className="flex flex-col gap-4">
          {chapters.map((chapter, i) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={i} />
          ))}
          <div className="rounded-2xl border-2 border-dashed border-navy-300 bg-white/70 p-5">
            <h3 className="font-display text-[1.45rem] leading-tight text-ink">{coverage.elsewhere.title}</h3>
            <p className="mt-1 text-body-sm text-ink-soft">{coverage.elsewhere.body}</p>
            <div className="mt-4">
              <Cta to="/request" size="md" onClick={() => trackOutbound('business_request_click', 'coverage')}>
                {coverage.elsewhere.cta}
              </Cta>
            </div>
          </div>
        </div>

        <div className="card h-[min(560px,65vh)] min-h-[20rem] w-full lg:sticky lg:top-24">
          <Suspense fallback={<MapSkeleton />}>
            <ChapterMap />
          </Suspense>
        </div>
      </div>
    </Section>
  )
}

export default function Business() {
  useDocumentMeta('business')
  const { services, steps, faq, close } = BUSINESS

  return (
    <div className="w-full">
      <Hero />
      <Section weight="anchor" className="lines-bg sheet">
        <SectionHead title={services.title} />
        <ServiceCards services={SERVICES} />
      </Section>
      <Section weight="anchor" className="blend-to-deep">
        <SectionHead title={steps.title} />
        <StepCards steps={BUSINESS_STEPS} />
      </Section>
      <Section weight="anchor" className="blend-from-deep">
        <FaqBlock title={faq.title} keys={faq.keys} />
      </Section>
      <Coverage />
      <CloseBand title={close.title}>
        <Cta to="/request" tone="sky" size="xl" onClick={() => trackOutbound('business_request_click', 'close')}>
          {close.primaryCta}
        </Cta>
        <Cta href={`mailto:${CONTACT_EMAIL}`} tone="outlineLight" size="xl" onClick={() => trackOutbound('business_email_click', 'close')}>
          {close.secondaryCta}
        </Cta>
      </CloseBand>
      <StickyMobileCta href="/request" label={close.primaryCta} onClick={() => trackOutbound('business_request_click', 'sticky')} />
    </div>
  )
}
