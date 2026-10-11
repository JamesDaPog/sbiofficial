import StickyMobileCta from '../components/StickyMobileCta'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import PageHero from '../components/PageHero'
import { AudiencePanels, FeatureCards } from '../components/Blocks'
import { ABOUT } from '../content/copy'
import { LEADERSHIP } from '../data/team'
import { trackApply } from '../lib/siteEvents'
import { useDocumentMeta } from '../lib/meta'

/* The two founders are named in the story and their portraits already exist in
   public/team, so the page shows them rather than describing them. */
const FOUNDERS = LEADERSHIP.filter((m) => ["Da'El Kim", 'James Yu'].includes(m.name))

/* Where SBI started: the first team working at the East Brunswick library. */
function StartPhoto() {
  return (
    <figure className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div className="-rotate-2 overflow-hidden rounded-2xl border border-white/20 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <img
          src="/about-work-session.webp"
          alt="SBI members working on laptops at the East Brunswick Public Library"
          width="1000"
          height="1327"
          className="aspect-[4/5] w-full object-cover"
          fetchPriority="high"
        />
      </div>
      <figcaption className="glass absolute -bottom-5 left-4 rounded-full px-4 py-2 text-[13px] text-white/90 sm:-left-6">
        East Brunswick, New Jersey
      </figcaption>
    </figure>
  )
}

function Hero() {
  const { hero } = ABOUT
  return (
    <PageHero
      variant="split"
      kicker={hero.kicker}
      title={hero.title}
      accent="local digital agencies."
      lede={hero.lede}
      aside={<StartPhoto />}
    />
  )
}

function Principles() {
  const { principles } = ABOUT
  return (
    <Section weight="anchor" className="lines-bg sheet">
      <SectionHead title={principles.title} />
      <FeatureCards items={principles.items} columns={4} />
    </Section>
  )
}

function Story() {
  return (
    <Section weight="anchor" className="blend-to-deep">
      <SectionHead title={ABOUT.story.title} />
      <div className="mt-12 space-y-5">
        {ABOUT.story.chapters.map((item, index) => (
          <article key={item.title} className="card card-strip strip-2 grid gap-6 p-7 sm:p-10 lg:grid-cols-[13rem_1fr] lg:gap-14">
            <div>
              <span className="font-display text-5xl leading-none text-brass">{String(index + 1).padStart(2, '0')}</span>
              <p className="kicker mt-3 text-gold-500">{item.marker}</p>
            </div>
            <div>
              <h3 className="max-w-[24ch] font-display text-display-lg text-ink">{item.title}</h3>
              <div className="mt-5 space-y-4">
                {item.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="max-w-[62ch] text-body-lg leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>

              {item.image && (
                <figure className="mt-8">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width="1000"
                    height="625"
                    className="aspect-[16/9] w-full rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {item.caption && <figcaption className="mt-3 text-body-sm text-ink-soft">{item.caption}</figcaption>}
                </figure>
              )}

              {item.showFounders && FOUNDERS.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-5">
                  {FOUNDERS.map((founder) => {
                    const [w, h] = founder.photoSize ?? [600, 800]
                    return (
                      <figure key={founder.name} className="w-[11rem]">
                        <img
                          src={founder.photo}
                          alt={founder.name}
                          width={w}
                          height={h}
                          style={{ objectPosition: founder.photoPosition ?? '50% 30%' }}
                          className="aspect-[3/4] w-full rounded-xl object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className="mt-3">
                          <p className="font-display text-lg text-ink">{founder.name}</p>
                          <p className="text-body-sm text-ink-soft">Co-founder</p>
                        </figcaption>
                      </figure>
                    )
                  })}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Close() {
  return (
    <AudiencePanels
      studentFirst
      business={ABOUT.close.business}
      student={ABOUT.close.student}
      onStudent={() => trackApply('about-close')}
    />
  )
}

export default function About() {
  useDocumentMeta('about')

  return (
    <div className="w-full">
      <Hero />
      <Principles />
      <Story />
      <Close />
      <StickyMobileCta href="/apply" label={ABOUT.close.student.cta} onClick={() => trackApply('sticky-about')} />
    </div>
  )
}
