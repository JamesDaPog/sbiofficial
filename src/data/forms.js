/**
 * On-site versions of SBI's two Google Forms.
 *
 * Each field `id` is the Google Forms entry ID for that question, read from the
 * live form, so submissions land in the same response sheet as before. If a
 * question is added, removed, or edited in Google Forms, update it here too:
 * open the form, view source, and search FB_PUBLIC_LOAD_DATA_ for the new IDs.
 *
 * For multiple-choice questions, `value` must match the option text in Google
 * Forms exactly or Google silently drops the answer. `label` is what visitors see.
 */

const FORM_BASE = 'https://docs.google.com/forms/d/e'

export const CHAPTER_APPLICATION = {
  key: 'chapter-application',
  title: 'Apply to start an SBI chapter',
  shortTitle: 'Chapter application',
  action: `${FORM_BASE}/1FAIpQLSf_Z2brvWMgohVPIJeA8nm1BRsqaa2Z51PDme44vPg1eORGGQ/formResponse`,
  fallbackUrl: 'https://docs.google.com/forms/d/1v1HwPRPeFm87FyT4HGVMMnwyHFn6khd_Z-j2XFp2Y1Q/viewform',
  /* Google Forms sections the original form has, in order. */
  pageHistory: '0,1,2,3,4',
  exitTo: '/chapter',
  intro:
    'You don’t need everything figured out. We’re looking for a real plan, at least one teammate, and an idea of who your first client could be.',
  steps: [
    {
      title: 'About you',
      lede: 'So we know who you are and how to reach you.',
      fields: [
        { id: 'entry.835565106', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
        { id: 'entry.1606094861', label: 'Age and grade', type: 'text', required: true, placeholder: 'e.g. 16, 11th grade' },
        { id: 'entry.923480779', label: 'School', type: 'text', required: true, autoComplete: 'organization' },
        { id: 'entry.2037136026', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
        { id: 'entry.1041173730', label: 'Phone number', type: 'tel', required: true, autoComplete: 'tel' },
      ],
    },
    {
      title: 'Your chapter',
      lede: 'Chapters are named after their town, like “East Brunswick SBI”. Tell us where yours would be and who would run it with you.',
      fields: [
        { id: 'entry.1758390630', label: 'Which town or area do you want to start a chapter in?', type: 'text', required: true, placeholder: 'e.g. Edison, New Jersey' },
        { id: 'entry.1695833378', label: 'Why do you want to start this chapter?', type: 'textarea', required: true },
        { id: 'entry.1442033094', label: 'Who else is on your team so far?', type: 'textarea', required: true, help: 'Names and what each person would do. “Nobody yet” is an honest answer.' },
        { id: 'entry.872354943', label: 'Do you have a first business in mind?', type: 'textarea', required: true, help: 'A family friend’s restaurant, a shop you go to often. Tell us how you know them.' },
        { id: 'entry.633041323', label: 'How many hours a week can you realistically give?', type: 'text', required: true, placeholder: 'e.g. 4 to 6 hours' },
        {
          id: 'entry.1000741297',
          label: 'How will you pay for your AI tools?',
          type: 'text',
          required: true,
          help: 'Chapters build websites with a shared Claude subscription, about $20 a month. Most raise it with a GoFundMe.',
          placeholder: 'e.g. GoFundMe, personal funds',
        },
      ],
    },
    {
      title: 'Your experience',
      lede: 'Show us anything you’ve made. Experience isn’t required, and links or plain descriptions are both fine.',
      fields: [
        { id: 'entry.1181013719', label: 'Link to a portfolio, website, or social account with your past work', type: 'textarea', required: true, help: 'If you don’t have one yet, just say so.' },
        { id: 'entry.269217921', label: 'Which tools have you used for this kind of work?', type: 'text', required: true, placeholder: 'e.g. Claude, Canva, CapCut, Replit' },
      ],
    },
    {
      title: 'Commitment',
      lede: 'Chapters run for at least two school semesters, and the work is always free for businesses in your town.',
      fields: [
        {
          id: 'entry.2008566236',
          label: 'Can you run this chapter for at least two semesters?',
          type: 'radio',
          required: true,
          options: [{ value: 'Yes' }, { value: 'No' }],
        },
        {
          id: 'entry.309562217',
          label: 'Will you have at least one teammate before you launch?',
          type: 'radio',
          required: true,
          options: [{ value: 'Yes' }, { value: 'No' }],
        },
        {
          id: 'entry.803948618',
          label: 'How did you hear about SBI?',
          type: 'radio',
          required: true,
          // TODO: rename "Option 3" to "Other" in the Google Form, then update `value` here.
          options: [{ value: 'TikTok' }, { value: 'Instagram' }, { value: 'Option 3', label: 'Somewhere else' }],
        },
        { id: 'entry.1944380913', label: 'Anything else you want SBI’s leadership team to know?', type: 'textarea', required: false },
      ],
    },
    {
      title: 'The Chapter Promise',
      lede: 'Every chapter leader agrees to the same five rules. Read them, then sign with your name.',
      promise: [
        'Never charge a business inside your town for SBI work.',
        'Follow SBI’s branding and quality standards.',
        'Help at least two businesses every semester.',
        'Send a short monthly update to SBI’s leadership team on time.',
        'If you step down, tell us at least a semester ahead and name someone to take over.',
      ],
      fields: [
        { id: 'entry.753530483', label: 'Type your full name to sign', type: 'text', required: true, autoComplete: 'name' },
        { id: 'entry.323637231', label: 'Any questions for us before you submit?', type: 'textarea', required: false },
      ],
    },
  ],
  success: {
    title: 'Application received.',
    body: 'Thank you for applying. A member of SBI’s leadership team reads every application. If it’s a fit, we’ll email you with next steps, which may include a short call. If you haven’t heard back within two weeks, email ebsbi.official@gmail.com or call (201) 988-9390.',
  },
}

export const BUSINESS_REQUEST = {
  key: 'business-request',
  title: 'Request free help for your business',
  shortTitle: 'Business request',
  action: `${FORM_BASE}/1FAIpQLSe-rm4vbP6Bkte7mILxS8CEHcrtabHW80qUrEat2kKHOSvbFw/formResponse`,
  fallbackUrl: `${FORM_BASE}/1FAIpQLSe-rm4vbP6Bkte7mILxS8CEHcrtabHW80qUrEat2kKHOSvbFw/viewform`,
  pageHistory: '0,1,2',
  exitTo: '/business',
  intro:
    'Tell us about your business and what you need. If there’s a chapter near you, its students will contact you. If not, your request tells us where to open the next one.',
  steps: [
    {
      title: 'Your business',
      lede: 'The basics, so the right local team can find you.',
      fields: [
        { id: 'entry.725230184', label: 'Business name', type: 'text', required: true, autoComplete: 'organization' },
        { id: 'entry.1094462368', label: 'What kind of business is it?', type: 'text', required: true, placeholder: 'e.g. Family restaurant, barbershop, nonprofit' },
        { id: 'entry.112275199', label: 'Business address or city', type: 'text', required: false, autoComplete: 'street-address' },
        { id: 'entry.45820988', label: 'Current website, Google or Yelp listing, or social accounts', type: 'textarea', required: false, help: 'Paste any links you have. Leave blank if you don’t have any yet.' },
      ],
    },
    {
      title: 'What you need',
      lede: 'Pick anything that sounds useful. You can change your mind once you talk to the team.',
      fields: [
        {
          id: 'entry.1440983598',
          label: 'Which services are you interested in?',
          type: 'checkbox',
          required: false,
          options: [
            { value: 'Website' },
            { value: 'Promotional Video', label: 'Promo video' },
            { value: 'Google Business Profile Optimization', label: 'Google Business Profile (your listing on Google Search and Maps)' },
            { value: 'Social media', label: 'Social media setup' },
            { value: 'Not Sure Yet (open to discussing)', label: 'Not sure yet, happy to talk it through' },
          ],
        },
        { id: 'entry.1060103593', label: 'Anything we should know about your business or what you need?', type: 'textarea', required: false },
      ],
    },
    {
      title: 'How to reach you',
      lede: 'A student from the nearest chapter, or SBI’s leadership team, will use this to contact you.',
      fields: [
        { id: 'entry.40612695', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
        { id: 'entry.623754277', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
        { id: 'entry.435208615', label: 'Phone number', type: 'tel', required: false, autoComplete: 'tel' },
        { id: 'entry.1679428338', label: 'How did you hear about SBI?', type: 'text', required: true },
        {
          id: 'entry.1291279527',
          label: 'If there’s no chapter near you yet, can we contact you when one opens?',
          type: 'radio',
          required: true,
          options: [{ value: 'Yes' }, { value: 'No' }],
        },
      ],
    },
  ],
  success: {
    title: 'Request received.',
    body: 'Thank you. If there’s an SBI chapter near you, its students will reach out by email or phone. If there isn’t one yet, we’ve noted your town and will contact you when a chapter opens nearby. Questions in the meantime? Email ebsbi.official@gmail.com.',
  },
}
