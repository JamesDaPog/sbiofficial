import Cta from '../components/Cta'
import StickyMobileCta from '../components/StickyMobileCta'
import { Reveal, Stagger } from '../components/motion/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import PageHero from '../components/PageHero'
import { CloseBand, DefinitionRows, STRIPS } from '../components/Blocks'
import { TEAM } from '../content/copy'
import { LEADERSHIP, SUPPORT_ROLES, initials } from '../data/team'
import { formUrl, trackApply, trackOutbound, EXEC_FORM_URL } from '../lib/siteEvents'
import { useDocumentMeta } from '../lib/meta'

/**
 * /team exists so a parent, a business owner, or an on-the-fence applicant can
 * check that real people run SBI. Starting a chapter stays the primary action.
 */

function Portrait({ member, index }) {
  const [w, h] = member.photoSize ?? [600, 800]

  return (
    <article
      className={`card card-strip ${STRIPS[index % STRIPS.length]} grid h-full grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-4 p-3 sm:flex sm:flex-col sm:gap-0`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-navy-50">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name ? `${member.name}, ${member.role}` : member.role}
            width={w}
            height={h}
            style={{ objectPosition: member.photoPosition ?? '50% 30%' }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-navy-100">
            <span className="font-display text-5xl text-navy-600/70">{initials(member.name ?? member.role)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col pb-2 pr-2 pt-1 sm:px-2 sm:pt-4">
        <span className="tag w-fit">{member.role}</span>
        {member.name && <h3 className="mt-3 font-display text-xl leading-tight text-ink">{member.name}</h3>}
        <p className="mt-1 text-body-sm leading-relaxed text-ink-soft">{member.desc}</p>
      </div>
    </article>
  )
}

/* The leaders' faces, overlapped, so the hero shows the people before the grid. */
function FaceStack() {
  const withPhotos = LEADERSHIP.filter((m) => m.photo)
  return (
    <div className="glass mx-auto w-fit rounded-3xl p-6 sm:p-8 lg:ml-auto lg:mr-0">
      <div className="flex -space-x-4">
        {withPhotos.map((m) => (
          <img
            key={m.role}
            src={m.photo}
            alt=""
            width="80"
            height="80"
            style={{ objectPosition: m.photoPosition ?? '50% 30%' }}
            className="h-16 w-16 rounded-full border-2 border-navy-950 object-cover sm:h-20 sm:w-20"
          />
        ))}
      </div>
      <p className="mt-5 font-display text-2xl text-white">{LEADERSHIP.length} people on the leadership team</p>
      <p className="mt-1 text-body-sm text-white/70">All of them are in high school.</p>
    </div>
  )
}

export default function Team() {
  useDocumentMeta('team')

  return (
    <div className="w-full">
      <PageHero
        kicker={TEAM.hero.kicker}
        title={TEAM.hero.title}
        accent="run SBI."
        lede={TEAM.hero.lede}
        aside={<FaceStack />}
        actions={
          <Cta to="/apply" tone="sky" size="xl" onClick={() => trackApply('team-hero')}>
            {TEAM.hero.cta}
          </Cta>
        }
      />

      <Section weight="anchor" className="lines-bg sheet">
        <SectionHead title={TEAM.leadership.title} />
        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4" gap={0.05}>
          {LEADERSHIP.map((member, i) => (
            <Reveal key={member.role} stagger className="h-full">
              <Portrait member={member} index={i} />
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <Section weight="anchor" className="blend-to-deep">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead title={TEAM.support.title} lede={TEAM.support.lede} />
          <DefinitionRows items={SUPPORT_ROLES.map((r) => [r.role, r.desc])} />
        </div>
      </Section>

      <CloseBand title={TEAM.close.title}>
        <Cta to="/apply" tone="sky" size="xl" onClick={() => trackApply('team-close')}>
          {TEAM.close.primaryCta}
        </Cta>
        <Cta
          href={formUrl(EXEC_FORM_URL, 'team-exec')}
          tone="outlineLight"
          size="xl"
          arrow="↗"
          onClick={() => trackOutbound('exec_apply_click', 'team')}
          data-testid="link-apply-hq"
        >
          {TEAM.close.secondaryCta}
        </Cta>
      </CloseBand>

      <StickyMobileCta href="/apply" label="Start a chapter" onClick={() => trackApply('sticky-team')} />
    </div>
  )
}
