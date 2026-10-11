import Accordion from '../components/Accordion'
import ChapterGuide from '../components/ChapterGuide'
import Cta from '../components/Cta'
import StickyMobileCta from '../components/StickyMobileCta'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import PageHero from '../components/PageHero'
import { CloseBand, ContactCard } from '../components/Blocks'
import { HANDBOOK } from '../content/copy'
import { trackApply } from '../lib/siteEvents'
import { useDocumentMeta } from '../lib/meta'

/** Reference for approved chapter leaders, plus edge-case and parent questions. */
export default function Manual() {
  useDocumentMeta('manual')
  const { hero, questions, close } = HANDBOOK

  return (
    <div className="w-full">
      <PageHero kicker={hero.kicker} title={hero.title} lede={hero.lede} />

      <Section weight="anchor" className="lines-bg sheet">
        <ChapterGuide />
      </Section>

      <Section weight="anchor" className="blend-to-deep">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHead title={questions.title} />
            <ContactCard />
          </div>
          <div className="border-b border-ink/25">
            {questions.items.map(([q, a], i) => (
              <Accordion key={q} title={q} indexNumber={String(i + 1).padStart(2, '0')}>
                <p>{a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </Section>

      <CloseBand title={close.title}>
        <Cta to="/apply" tone="sky" size="xl" onClick={() => trackApply('manual')}>
          {close.cta}
        </Cta>
      </CloseBand>

      <StickyMobileCta href="/apply" label={close.cta} onClick={() => trackApply('sticky-manual')} />
    </div>
  )
}
