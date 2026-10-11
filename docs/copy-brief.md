# SBI website: writing prompt for all site text

Use this as the brief (or paste it as a prompt) when writing the site's text.
Every slot below lives in **`src/content/copy.js`** — edit the strings there,
keep the keys. The site already shows a working draft in every slot, so you can
replace them one at a time.

---

## Who is reading

Assume the reader knows **nothing** about SBI. They are one of:

1. **A local business owner** (restaurant, barber, bakery, nonprofit). Busy, skeptical
   of "free", not technical. Wants to know: what do I get, what does it cost, what's
   the catch, who do I talk to.
2. **A high school student** deciding whether to start a chapter. Wants to know:
   what would I actually do, what do I get out of it, how much time, can I do it
   with no experience.
3. **A parent, teacher, or partner** checking SBI is real and safe.

## The facts you can state

- SBI = Student Business Initiative. Student-run. Not part of any school.
- Local teams are called **chapters**. 3 today: East Brunswick (NJ), Guadalajara (Mexico),
  Simi Valley (CA). One chapter per town; each serves ~5 miles around it.
- Chapters make: websites, promo videos, Google Business Profile updates, social media setup.
- Free for every business inside a chapter's area. Always. Businesses keep everything.
- 2+ students can start a chapter. No coding needed (websites are built with AI tools).
- SBI's leadership team (high school students) approves chapters, trains teams, and
  checks finished work before handover.
- Only cost to a chapter: a shared Claude subscription, ~$20/month, usually via GoFundMe.
- **Conflict to resolve before writing about commitment:** the handbook says
  *2 delivered projects per month*; the application's Chapter Promise says
  *2 businesses per semester*. Pick one and use it everywhere.

## Rules for every line

1. **Every line must do one of two jobs: tell the reader something true about SBI, or tell
   them what to do next.** If it does neither, delete it (set it to `''` only where noted
   as optional; otherwise rewrite it).
2. Plain words a 12-year-old understands. No: "empower", "unlock", "leverage", "elevate",
   "ecosystem", "journey", "real-world impact", "passionate", "innovative", "seamless".
3. Never use a term before it's explained. "Chapter" is defined in the homepage hero
   context; "leadership team" means "the students who run SBI" — say so the first time
   on each page.
4. No unverifiable numbers. Don't invent stats, testimonials, or client names.
5. Short beats clever. Headlines are statements or the question the section answers.
6. In `copy.js`, use curly apostrophes (’) inside text. A straight one (') ends the string early and breaks the build.

---

## Slots

Length guide: **XS** ≤ 4 words · **S** ≤ 10 words · **M** ≤ 25 words · **L** ≤ 45 words.

### Shared (`SITE`, `SERVICES`, `BUSINESS_STEPS`, `FAQ`, `CONTACT_CARD`)

| Key | Where it shows | Job | Length |
|---|---|---|---|
| `SITE.fullName` | Header, next to the logo | Expands "SBI" | XS |
| `SITE.footerTagline` | Footer, under logo | Brand line (from the deck: "Learn locally. Build together.") | S |
| `SITE.footerBlurb` | Footer | One-sentence description of SBI | M |
| `SITE.copyright` | Footer bottom line | Legal line | S |
| `SERVICES[n].title` / `.body` | Homepage + business page cards, with an illustration | Name the service; say what the owner gets in plain terms (explain "Google Business Profile") | XS / M |
| `BUSINESS_STEPS[n]` `[title, body]` | Homepage + business page, 4 numbered steps | What happens after a business asks for help, in order | XS / M |
| `FAQ.<key>` `[question, answer]` | Pages pick questions by key | Answer a real objection directly; first word of the answer should be the answer ("Yes.", "No.", "Nothing.") | S / L |
| `CONTACT_CARD.title` / `.body` | Navy card beside every FAQ | Tell people how to reach a human | S / M |

FAQ keys in use: `free`, `whyFree`, `quality`, `school`, `noChapter`, `needFromMe`, `keepIt`,
`time`, `cost`, `experience`, `findBusiness`. Add a key to the pool and list it in a page's
`faq.keys` to show it there.

### Homepage (`HOME`)

| Key | Where | Job | Length |
|---|---|---|---|
| `hero.badgePrefix` | Small pill above the headline, followed by chapter names | Shows SBI is active now | XS |
| `hero.title` | Main headline over the photo | What SBI is, in one line | S |
| `hero.lede` | Under the headline | How it works in one sentence | M |
| `hero.businessCta` / `hero.studentCta` | Two buttons | Send each audience to its page | XS |
| `facts.*` | Labels under the 4 hero numbers (chapters, countries, $0, 1 per town) | Label the number | XS |
| `whatWeDo.title` | Section heading | The question the section answers | S |
| `whatWeDo.quote` | Large quote card | The one-sentence definition of SBI (from the deck) | L |
| `whatWeDo.roles[n]` | 3 small cards: business / students / SBI | Who does what | XS / M |
| `why.title` / `why.lede` | Navy section, left panel | Why SBI exists: the problem + the opportunity | S / L |
| `why.cards[n].audience` | Tag on each card | Which reader the card is for | S |
| `why.cards[n].points` | 3 bullet points per card | Concrete benefits only | S each |
| `why.cards[n].cta` | Card link | Next step for that reader | XS |
| `services.title` / `.link` | Services heading + link to business page | Label + direct | XS |
| `steps.title` / `.cta` | Steps heading + button | Label + direct | XS |
| `chapters.title` / `.link` | Chapter cards heading + map link | Label + direct | XS |
| `chapters.openCard.*` | Dashed "your town" card | Invite students to start one | XS / S / XS |
| `projects.title` + `projects.items` | **Hidden until you add items.** Cards with photo, services, status, link | Show real, approved client work | XS |
| `people.title` / `.lede` / `.link` | Team preview | Show real people run it | XS / M / XS |
| `faq.title` / `.keys` | FAQ section | Pick the 3–5 questions a first-time visitor asks | XS |
| `close.business.*` / `close.student.*` | Two big panels at the bottom | Final direction for each audience | label XS · title S · cta XS |

### For businesses (`BUSINESS`)

| Key | Where | Job | Length |
|---|---|---|---|
| `hero.kicker` | Small label above headline | Who the page is for | XS |
| `hero.title` / `hero.lede` | Headline + sentence | What an owner gets, and the catch (there isn't one) | S / M |
| `hero.primaryCta` / `secondaryCta` | Buttons | Request help / jump to chapter list | XS |
| `services.title`, `steps.title`, `faq.title` | Section headings | Label | XS |
| `faq.keys` | Which FAQs show | Owner objections | — |
| `coverage.title` / `.lede` | Chapter list + map | Where chapters are; what to do if you're elsewhere | XS / M |
| `coverage.emailChapter` / `.emailSbi` | Link on each chapter card | Contact action | XS |
| `coverage.elsewhere.*` | Dashed card | Ask for a chapter in your town | XS / S / XS |
| `close.*` | Navy closing band | Final ask | S / XS / XS |

### For students (`STUDENTS`)

| Key | Where | Job | Length |
|---|---|---|---|
| `hero.*` | Page top | What a chapter is and that you can start one | kicker XS · title S · lede L · ctas XS |
| `work.title` + `work.steps[n]` | 3 numbered cards | What a chapter actually does | XS · XS / M |
| `gains.title` / `.lede` | Navy panel | What students get; keep it honest (no guarantees) | S / M |
| `gains.cards[n]` | 4 cards with icons | Specific benefits | XS / S |
| `roles.title` / `.lede` / `.items[n]` | Role list | Who does what on a team | XS / S / XS + M |
| `path.title` + `path.steps[n]` | 4 numbered cards | What happens after applying | XS · XS / M |
| `faq.title` / `.keys` | FAQ | Time, cost, experience questions | XS |
| `close.*` | Navy closing band | Final ask | S / XS |

### About (`ABOUT`)

| Key | Where | Job | Length |
|---|---|---|---|
| `hero.*` | Page top | What SBI is, for someone who landed here first | kicker XS · title S · lede L |
| `principles.title` + `.items[n]` | 4 numbered cards | The non-negotiable rules | S · XS / S |
| `story.title` | Section heading | — | XS |
| `story.chapters[n]` | 3 story cards (marker, title, paragraphs, optional photo/caption, founders) | How SBI started, in your own words | marker XS · title S · body ≤ 2 short paragraphs |
| `close.*` | Two panels | Final direction | as homepage |

### Team (`TEAM`) — plus `src/data/team.js`

| Key | Where | Job | Length |
|---|---|---|---|
| `hero.*` | Page top | Who runs SBI and why it matters to the reader | kicker XS · title S · lede M · cta XS |
| `leadership.title` | Grid heading | Label | XS |
| `support.title` / `.lede` | Support roles list | Label + note that names are added later | XS / S |
| `close.*` | Navy closing band | Start a chapter or join the leadership team | S / XS / XS |
| `team.js → LEADERSHIP[n].role / .desc` | Each person's card | Plain job title + one line on what they do | XS / S |
| `team.js → SUPPORT_ROLES[n].desc` | Support list | What that role does for a chapter | S |

### Handbook (`HANDBOOK`) — plus `src/data/sop.jsx`

| Key | Where | Job | Length |
|---|---|---|---|
| `hero.*` | Page top | Who it's for; that applicants don't need it | kicker XS · title S · lede M |
| `questions.title` + `.items[n]` | Edge-case and parent questions | Direct answers | XS · S / L |
| `close.*` | Navy closing band | Apply | S / XS |

The handbook body itself is `src/data/sop.jsx` (your SOP draft) and the glossary is
`src/data/glossary.json`.

### Not in `copy.js`

- **Form questions, step titles, help text, thank-you messages:** `src/data/forms.js`. Question
  wording should stay close to the Google Form so answers still make sense in the sheet.
- **Page titles and search/social descriptions:** `src/lib/meta.js` (title ≤ 60 characters,
  description ≤ 155).
- **Chapter names, regions, services, contact emails:** `src/data/chapters.json`.
- **Navigation labels:** `src/components/Layout.jsx` (`NAV`, `EXTRA_NAV`).
