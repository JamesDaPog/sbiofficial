/**
 * Every line of visible site copy, in one place.
 *
 * Each slot is described in docs/copy-brief.md: what it is for, where it
 * appears, and how long it can be. Edit the strings; leave the keys and
 * structure alone. Use curly apostrophes (’) inside single-quoted strings.
 *
 * Team names, roles, and bios live in src/data/team.js. Chapter details live in
 * src/data/chapters.json. Form questions live in src/data/forms.js. The
 * handbook lives in src/data/sop.jsx.
 */

/* ── Shared ───────────────────────────────────────────────── */

export const SITE = {
  fullName: 'Student Business Initiative',
  footerTagline: 'Learn locally. Build together.',
  footerBlurb: 'High schoolers building websites and videos for small businesses in their own towns. Free, always.',
  copyright: 'Student Business Initiative. Run by students.',
}

/* Used on the homepage and the business page. `art` picks the illustration. */
export const SERVICES = [
  { art: 'website', title: 'Websites', body: 'A site with your hours, menu or services, photos, and how to reach you. Looks right on a phone.' },
  { art: 'video', title: 'Promo videos', body: 'A short video we film at your place, sized for Instagram, TikTok, or your website.' },
  { art: 'google', title: 'Google Business Profile', body: 'What people see when they look you up on Google or Maps. We fix the hours, add photos, and fill in the details.' },
  { art: 'social', title: 'Social media setup', body: 'We set up or tidy your accounts and post the first few things for you.' },
]

/* What happens after a business asks for help. Homepage and business page. */
export const BUSINESS_STEPS = [
  ['Tell us what you need', 'Fill out a short form about your business.'],
  ['Meet the students', 'A team from your town reaches out, and you agree on what they’ll make.'],
  ['They build it', 'You see drafts and give feedback. Our leadership team checks the work before it’s final.'],
  ['It’s yours', 'We hand everything over. No bill, now or later.'],
]

/* One pool of questions. Each page picks the ones it needs by key. */
export const FAQ = {
  free: ['Is it really free?', 'Yes. Chapters never charge businesses in their own town. No contract, and no surprise bill later.'],
  whyFree: ['What’s the catch?', 'There isn’t one. Students learn the most from real clients. You get the finished work; they get the experience and something to show for it.'],
  quality: ['Will it actually look good?', 'Every team is trained before its first client, and our leadership team reviews the work before it’s handed to you.'],
  school: ['Is SBI part of a school?', 'No. We’re independent. Members come from different schools and do this on their own time.'],
  noChapter: ['There’s no chapter near me. Can I still ask?', 'Yes, please do. Requests tell us where to open next, and we’ll reach out when a team starts near you.'],
  needFromMe: ['What do I need to do?', 'Not much. One conversation about what you want, a few photos or details, and feedback when you see a draft.'],
  keepIt: ['Do I own what you make?', 'Yes. Once it’s handed over, it’s yours.'],
  time: ['How much time does it take?', 'A few hours a week. Chapters finish at least two projects a month, check in with us weekly, and join one meeting a month.'],
  cost: ['Does it cost anything?', 'Just one shared Claude subscription for building websites, about $20 a month. Most chapters cover it with a GoFundMe.'],
  experience: ['Do I need to know how to code?', 'No. You build websites with AI tools, and we train you before your first client.'],
  findBusiness: ['What if I can’t find a business?', 'We’ll help you make a list of places to try first, and work through it with you.'],
}

export const CONTACT_CARD = {
  title: 'Still have a question?',
  body: 'Email or call. A student on our leadership team will get back to you.',
}

/* ── Homepage ─────────────────────────────────────────────── */

export const HOME = {
  hero: {
    title: 'Free websites for local businesses, built by high school students.',
    lede: 'In every town SBI is active in, a group of students creates promo videos and websites and helps with social media, at no cost to the businesses.',
    businessCta: 'I own a business',
    studentCta: 'I’m a student',
  },
  facts: {
    chapters: 'Chapters',
    countries: 'Countries',
    cost: 'Cost to businesses',
    perTown: 'Chapter per town',
  },
  whatWeDo: {
    title: 'What does SBI actually do?',
    quote: 'We bring students together all across the nation to help local businesses.',
    roles: [
      ['The business', 'Tells us what it needs, then keeps everything we make.'],
      ['The students', 'A team of two or more from the same town plans it, builds it, and hands it over.'],
      ['SBI', 'Trains every team before they start and checks the work before it goes out.'],
    ],
  },
  why: {
    title: 'Why does it matter?',
    lede: 'Many local businesses have no working website or an empty Google listing, and agencies charge more than they can pay. Students need real experience with marketing and building. SBI connects the two.',
    cards: [
      {
        audience: 'For business owners',
        points: [
          'The kind of website or video an agency would charge for.',
          'Made by students who live in your town.',
          'No contract, no invoice, no monthly fee.',
        ],
        cta: 'Get free help',
      },
      {
        audience: 'For high school students',
        points: [
          'Real clients, not class assignments.',
          'Work you can actually show colleges.',
          'Your own team, in your own town.',
        ],
        cta: 'Start a chapter',
      },
    ],
  },
  services: { title: 'What we make', link: 'More for business owners' },
  steps: { title: 'How it works', cta: 'Get free help' },
  chapters: { title: 'Where we are', link: 'See the map', openCard: { title: 'Not on the list?', body: 'All it takes is you and one friend.', cta: 'Start a chapter' } },
  /* Leave `items` empty until there is real, approved client work to show. */
  projects: {
    title: 'Our work',
    items: [
      // { name: 'Business name', town: 'East Brunswick', services: ['Website'], status: 'Completed', image: '/work/example.webp', url: 'https://...' },
    ],
  },
  people: { title: 'Who runs SBI', lede: 'High schoolers, like the teams they train. They approve new chapters and check every project before it’s handed over.', link: 'Meet the team' },
  faq: { title: 'Questions people ask', keys: ['free', 'whyFree', 'quality', 'school'] },
  close: {
    business: { label: 'For business owners', title: 'Get a free website or video for your business.', cta: 'Request free help' },
    student: { label: 'For high school students', title: 'Start an SBI chapter in your town.', cta: 'Apply now' },
  },
}

/* ── For businesses ───────────────────────────────────────── */

export const BUSINESS = {
  hero: {
    kicker: 'For business owners',
    title: 'A website, video, or Google listing for your business. Free.',
    lede: 'High school students from your town do the work. You don’t pay a cent.',
    primaryCta: 'Request free help',
    secondaryCta: 'Is there a team near me?',
  },
  services: { title: 'What we can make for you' },
  steps: { title: 'What happens after you ask' },
  faq: { title: 'Questions owners ask us', keys: ['free', 'needFromMe', 'keepIt', 'quality', 'whyFree', 'noChapter'] },
  coverage: {
    title: 'Where our teams are',
    lede: 'Each chapter covers about five miles around its town. Don’t see yours? Send a request anyway. It helps us decide where to go next.',
    emailChapter: 'Email this team',
    emailSbi: 'Email us about this area',
    elsewhere: { title: 'Not near any of these?', body: 'Ask anyway. It tells us where to start next.', cta: 'Send a request' },
  },
  close: { title: 'Ready to get started?', primaryCta: 'Request free help', secondaryCta: 'Email us' },
}

/* ── For students ─────────────────────────────────────────── */

export const STUDENTS = {
  hero: {
    kicker: 'For high school students',
    title: 'Run a digital agency in your town, before you graduate.',
    lede: 'Starting an SBI chapter means bringing together a group of hard-working teens to help out local businesses, free. You start it and lead it. SBI trains you first.',
    primaryCta: 'Start my application',
    secondaryCta: 'Read the handbook',
  },
  work: {
    title: 'What you’d actually do',
    steps: [
      ['Find a business', 'Think of the restaurant with no website, or the shop with the wrong hours on Google.'],
      ['Build it as a team', 'Decide what to make, split up the work, and get it done.'],
      ['Hand it over', 'They keep everything. You keep the experience and something real for your portfolio.'],
    ],
  },
  gains: {
    title: 'What you get out of it',
    lede: 'We can’t promise you admissions or a job. We can promise real work and real responsibility you’ll be able to talk about.',
    cards: [
      ['Real clients', 'Meetings, deadlines, feedback, and a finished product.'],
      ['Work you can show', 'Websites and videos people in your town actually use.'],
      ['Leadership', 'Recruiting a team, splitting up roles, and keeping it going.'],
      ['Useful skills', 'Web design, video, marketing, and AI tools.'],
    ],
  },
  roles: {
    title: 'Who does what',
    lede: 'You need at least two people. One person can wear more than one hat.',
    items: [
      ['Chapter leader', 'Runs the team, talks with business owners, and keeps in touch with us.'],
      ['Web builder', 'Builds the websites using AI tools. No coding needed.'],
      ['Camera', 'Shoots the footage for promo videos.'],
      ['Editor', 'Cuts the footage into the finished video.'],
    ],
  },
  path: {
    title: 'What happens after you apply',
    steps: [
      ['Apply', 'Takes about ten minutes, and your answers save as you go.'],
      ['Hear back', 'Someone on our leadership team reads it and emails you. Sometimes we’ll set up a quick call.'],
      ['Get your area', 'Your chapter gets its own area. Only one chapter per town.'],
      ['Train, then start', 'We teach you websites and video, then you take on your first project.'],
    ],
  },
  faq: { title: 'Questions before you apply', keys: ['time', 'cost', 'experience', 'school', 'findBusiness'] },
  close: { title: 'Two people and one town are all you need.', cta: 'Start my application' },
}

/* ── About ────────────────────────────────────────────────── */

export const ABOUT = {
  hero: {
    kicker: 'About us',
    title: 'A student-run network of local digital agencies.',
    lede: 'SBI, or Student Business Initiative, is made up exclusively of high schoolers in towns all across the nation. In each town, the groups build websites and promo videos for local businesses at no charge to them.',
  },
  principles: {
    title: 'The rules every chapter follows',
    items: [
      ['Always free', 'No chapter ever charges a business in its own town.'],
      ['Local first', 'You work for businesses in your own community.'],
      ['Trained and checked', 'Teams train before they start, and we check the work before it goes out.'],
      ['Same standard everywhere', 'Same name, same look, same quality in every town.'],
    ],
  },
  story: {
    title: 'How it started',
    chapters: [
      {
        marker: 'The start',
        title: 'One team in East Brunswick.',
        body: ['The businesses around us had great products, but were invisible online. We changed that, for free.', 'We started grinding, balancing school, sports, and SBI.'],
      },
      {
        marker: 'Two founders',
        title: 'Then we wanted more.',
        body: ['For a while, it was just the two of us, building websites and shooting videos. But that wasn’t enough for us anymore.'],
        showFounders: true,
      },
      {
        marker: 'Today',
        title: 'A network of student teams.',
        body: ['We decided East Brunswick was too small for us. We wanted to take it nationwide, so we did.', 'We found students across America dedicated to the same thing as us.'],
      },
    ],
  },
  close: {
    student: { label: 'For high school students', title: 'Start a chapter in your town.', cta: 'Apply now' },
    business: { label: 'For business owners', title: 'Ask the students near you for help.', cta: 'Request free help' },
  },
}

/* ── Team ─────────────────────────────────────────────────── */

export const TEAM = {
  hero: {
    kicker: 'Our team',
    title: 'The students who run SBI.',
    lede: 'They interview and approve new members and chapters, train teams, and make sure the work is good. Once you apply, these are the people you’ll hear from.',
    cta: 'Start a chapter',
  },
  leadership: { title: 'Leadership team' },
  support: { title: 'Who your chapter works with', lede: 'We’ll add names as each person agrees to be listed.' },
  close: { title: 'Start a chapter, or help run the network.', primaryCta: 'Start a chapter', secondaryCta: 'Join the leadership team' },
}

/* ── Handbook ─────────────────────────────────────────────── */

export const HANDBOOK = {
  hero: {
    kicker: 'For chapter leaders',
    title: 'Chapter leader handbook',
    lede: 'How chapters run, start to finish. You don’t need to read it to apply. Tap any underlined word for a definition.',
  },
  questions: {
    title: 'Other questions',
    items: [
      ["What if no business says yes?", "Our Onboarding Lead gives you a list of places to try first. Free work is easy to say yes to. If you’re still stuck, our Support Lead works through the list with you."],
      ["Is this run through my school?", "No. You don’t need a teacher sponsor, club approval, or anything from your school."],
      ["Can I charge for work outside my area?", "Yes. Work inside your area is always free. Outside it, you set your own price."],
      ["What happens if my co-founder leaves?", "Talk to our leadership team. You can bring in a new second person, and stepping down doesn’t have to mean closing the chapter."],
      ["Who runs this? (for parents)", "Our leadership team, who are all high school students. The team page lists everyone we can name so far. Email us about anyone who isn’t listed."],
      ["What happens to my child’s information? (for parents)", "Applications go through a Google Form that our student recruitment lead reads. To know exactly what it asks and who sees it, email us before your child applies."],
      ["Is money involved anywhere? (for parents)", "No one is paid and no business is charged. Everyone volunteers. The only cost is the chapter’s own AI tool subscription."],
    ],
  },
  close: { title: 'Ready to lead a chapter?', cta: 'Start my application' },
}
