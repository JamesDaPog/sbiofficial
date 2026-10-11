/**
 * The HQ roster. Read by /team (full grid) and /chapter (support strip), so a
 * role only has to be corrected in one place.
 *
 * Only people who have approved their portrait carry a `photo`. Everyone else
 * renders as initials — never substitute a stock or generated image.
 */

export const LEADERSHIP = [
  {
    role: 'Runs the network',
    name: "Da'El Kim",
    photo: '/team/dael-kim.webp',
    avatar: '/team/dael-kim-96.webp',
    photoSize: [610, 800],
    photoPosition: '50% 62%',
    desc: 'Decides where SBI goes next and sets the bar for client work.',
  },
  {
    role: 'Keeps things running',
    name: 'James Yu',
    photo: '/team/james-yu.webp',
    avatar: '/team/james-yu-96.webp',
    photoSize: [613, 800],
    photoPosition: '50% 52%',
    desc: 'Makes sure every chapter has what it needs, week to week.',
  },
  {
    role: 'Runs marketing',
    name: 'Ekam Kaur',
    photo: '/team/ekam-kaur.webp',
    photoSize: [658, 800],
    photoPosition: '50% 22%',
    desc: 'Runs SBI’s own social media and outreach.',
  },
  {
    role: 'Builds the tools',
    name: 'Arjun Lal',
    photo: '/team/arjun-lal.webp',
    photoSize: [700, 700],
    photoPosition: '50% 38%',
    desc: 'Builds and maintains the tools every chapter uses.',
  },
  {
    role: 'Teaches video',
    name: 'Aarav Sharma',
    photo: '/team/aarav-sharma.webp',
    avatar: '/team/aarav-sharma-96.webp',
    photoSize: [461, 1000],
    photoPosition: '50% 32%',
    desc: 'Trains each chapter’s camera and editing team.',
  },
  {
    role: 'Starts new chapters',
    name: 'Arlin', // TODO: add surname, or confirm they prefer first name only.
    desc: 'Finds new chapter leaders and helps them get started.',
  },
  {
    role: 'Handles the money',
    name: 'Neel', // TODO: add surname, or confirm they prefer first name only.
    desc: 'Keeps track of budgets and anything involving money.',
  },
  {
    role: 'Works with partners',
    name: 'Jaymond Wong',
    desc: 'Keeps in touch with chapters, businesses, and partner groups.',
  },
]

/**
 * Roles a chapter leader actually depends on week to week.
 *
 * TODO: fill in `name` for each of these once the holder is confirmed. Named
 * people are far stronger proof to an applicant than a role title alone.
 */
export const SUPPORT_ROLES = [
  { role: 'Quality Lead', desc: 'Looks over every website and video before a business gets it.' },
  { role: 'Recruitment Lead', desc: 'Reads every application and emails you back.' },
  { role: 'Onboarding Lead', desc: 'Helps new chapters get set up and through their first project.' },
  { role: 'Web Training Lead', desc: 'Teaches new teams how to build client websites.' },
  { role: 'Support Lead', desc: 'Who you message when a project gets stuck.' },
  { role: 'Partnerships Lead', desc: 'Connects chapters with local businesses and community groups.' },
]

/**
 * The subset shown on /chapter: the people who train a new leader and answer
 * them when they are stuck. Named holders first so real faces lead.
 */
export const TRAINING_AND_SUPPORT = [
  LEADERSHIP.find((m) => m.role === 'Video Training Lead'),
  ...SUPPORT_ROLES.filter((r) => r.role !== 'Video Training Lead'),
].filter(Boolean)

export const initials = (text = '') =>
  text
    .split(/[\s\-']+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
