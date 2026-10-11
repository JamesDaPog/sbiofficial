import { Link, useLocation } from 'wouter'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Wordmark } from './Brand'
import chapters from '../data/chapters.json'
import { SITE } from '../content/copy'

const CONTACT_EMAIL = 'ebsbi.official@gmail.com'
const CONTACT_PHONE = '(201) 988-9390'

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/business', label: 'For businesses' },
  { to: '/chapter', label: 'For students' },
  { to: '/team', label: 'Our team' },
]

const EXTRA_NAV = [
  { to: '/manual', label: 'Chapter leader handbook' },
  { to: '/request', label: 'Request free help' },
  { to: '/apply', label: 'Apply to start a chapter' },
]

/* Pages that open on a full-bleed navy hero. The header floats transparent
   over them and turns solid once the page scrolls. */
const HERO_ROUTES = ['/', '/about', '/business', '/chapter', '/team', '/manual']
const SOLID_AFTER_PX = 40

function useScrolledPast(px) {
  const [isPast, setIsPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setIsPast(window.scrollY > px)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [px])
  return isPast
}

/* Forms are full-screen flows with their own progress header. */
const FOCUS_ROUTES = ['/apply', '/request']

const isActive = (location, to) => (to === '/' ? location === '/' : location.startsWith(to))

function MobileMenu({ menuRef, location, onClose }) {
  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      className="border-t border-white/10 bg-navy-950 px-5 pb-6 pt-2 lg:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col">
        {[{ to: '/', label: 'Home' }, ...NAV, ...EXTRA_NAV].map((item) => (
          <Link
            key={item.to}
            href={item.to}
            onClick={onClose}
            className={`flex h-12 items-center border-b border-white/10 font-display text-xl ${
              isActive(location, item.to) ? 'text-gold-300' : 'text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function Header({ location }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const isScrolled = useScrolledPast(SOLID_AFTER_PX)
  const overHero = HERO_ROUTES.includes(location)
  const isClear = overHero && !isScrolled && !isMenuOpen

  useEffect(() => {
    closeMenu()
  }, [location, closeMenu])

  useEffect(() => {
    if (!isMenuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    menuRef.current?.querySelector('a')?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen, closeMenu])

  return (
    <header className={`${overHero ? 'fixed inset-x-0' : 'sticky'} top-0 z-50`}>
      <div
        className={`border-b transition-[background-color,border-color] duration-500 ${
          isClear ? 'border-transparent bg-[linear-gradient(180deg,rgba(6,20,38,0.7),rgba(6,20,38,0))]' : 'border-white/10 bg-navy-950/90 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-page items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="SBI home">
            <Wordmark tone="light" />
            <span className="hidden border-l border-white/20 pl-3 text-[12px] font-medium leading-tight text-white/65 md:block">
              Student Business
              <br />
              Initiative
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={`relative py-2 text-[14.5px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-gold-300 after:transition-transform after:duration-300 ${
                  isActive(location, item.to)
                    ? 'text-white after:scale-x-100'
                    : 'text-white/70 after:scale-x-0 hover:text-white hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/request"
              className="hidden whitespace-nowrap px-3 py-2 text-[14.5px] font-semibold text-gold-300 hover:text-white xl:inline-flex"
            >
              Get free help
            </Link>
            <Link
              href="/apply"
              className="hidden h-10 items-center whitespace-nowrap rounded-full bg-gold-200 px-5 text-[14px] font-semibold text-navy-950 transition-colors hover:bg-white sm:inline-flex"
            >
              Start a chapter
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="grid h-11 w-11 place-items-center text-white lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && <MobileMenu menuRef={menuRef} location={location} onClose={closeMenu} />}
      </div>
    </header>
  )
}

/* Pages that end on a light section get a footer that curves up over it,
   matching the homepage hand-offs. The rest end on a navy band. */
const LIGHT_ENDING_ROUTES = ['/', '/about']

function Footer({ curved }) {
  const edge = curved
    ? 'relative z-10 -mt-10 rounded-t-[2.5rem] shadow-[0_-24px_60px_-12px_rgba(6,20,38,0.35)] sm:-mt-12 sm:rounded-t-[3rem]'
    : 'border-t border-white/10'
  return (
    <footer className={`${edge} bg-navy-950 px-6 pb-10 pt-16 text-white/70 sm:px-8 lg:pt-20`}>
      <div className="mx-auto grid max-w-page gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark tone="light" />
          <p className="mt-5 font-display text-xl leading-snug text-white">
            {SITE.footerTagline}
          </p>
          <p className="mt-4 text-body-sm leading-relaxed">
            {SITE.footerBlurb}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-body-sm">
          <p className="kicker mb-1 text-white/45">Explore</p>
          {[{ to: '/', label: 'Home' }, ...NAV].map((item) => (
            <Link key={item.to} href={item.to} className="w-fit hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-body-sm">
          <p className="kicker mb-1 text-white/45">Get involved</p>
          {EXTRA_NAV.map((item) => (
            <Link key={item.to} href={item.to} className="w-fit hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-body-sm">
          <p className="kicker mb-1 text-white/45">Contact</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="w-fit break-all hover:text-white">
            {CONTACT_EMAIL}
          </a>
          <a href="tel:+12019889390" className="w-fit hover:text-white">
            {CONTACT_PHONE}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-page flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 md:flex-row">
        <p>© {new Date().getFullYear()} {SITE.copyright}</p>
        <p>Chapters in {chapters.map((c) => c.name).join(', ')}</p>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  const [location] = useLocation()
  const isFocusRoute = FOCUS_ROUTES.some((route) => location.startsWith(route))

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper font-body text-ink selection:bg-gold-200">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      {!isFocusRoute && <Header location={location} />}
      <main id="main" className="relative z-0 flex w-full flex-1 flex-col">
        {children}
      </main>
      {!isFocusRoute && <Footer curved={LIGHT_ENDING_ROUTES.includes(location)} />}
    </div>
  )
}

export { CONTACT_EMAIL, CONTACT_PHONE }
