import { useEffect } from 'react'

/**
 * Per-route document metadata.
 *
 * Unfurlers (Instagram, iMessage, Discord, Slack) do not run JavaScript, so
 * this hook is only half the fix - it corrects the tab title and the meta for
 * anything that *does* execute JS. The static side is generated at build time
 * by scripts/prerender.mjs, which reads this same table so the two can never
 * drift apart.
 */

export const SITE_NAME = 'SBI Network'
export const SITE_URL = 'https://sbinetwork.vercel.app' // Switch when a custom domain is connected.
export const OG_IMAGE = '/og.png'

export const ROUTE_META = {
  home: {
    path: '/',
    title: 'Free websites for local businesses, built by high school students',
    description:
      'SBI is a student-run organization. Teams of high school students build websites, promo videos, and Google listings for small businesses in their own town, at no cost.',
  },
  chapter: {
    path: '/chapter',
    title: 'Start an SBI chapter in your town',
    description:
      'Two high school students can start an SBI chapter. You lead a team that builds websites and promo videos for local businesses, free, after training from SBI.',
  },
  business: {
    path: '/business',
    title: 'Free websites and promo videos for local businesses: SBI Network',
    description:
      'Students from your local SBI chapter can build your website, make a promo video, or fix your Google listing, then hand it to you with nothing to pay.',
  },
  team: {
    path: '/team',
    title: 'The students who run SBI Network',
    description:
      'Meet SBI’s leadership team: the high school students who approve new chapters, train new teams, and check finished work before it reaches a business.',
  },
  manual: {
    path: '/manual',
    title: 'Chapter leader handbook: SBI Network',
    description:
      'The handbook for approved chapter leaders: roles, rules, how chapters stay active, and answers for parents.',
  },
  about: {
    path: '/about',
    title: 'About SBI: a student-run agency for local businesses',
    description:
      'Why SBI exists, how it started in East Brunswick, New Jersey, and how high school students in several towns now build free websites and videos for local businesses.',
  },
  apply: {
    path: '/apply',
    title: 'Apply to start an SBI chapter',
    description:
      'Apply to start an SBI chapter in your town. A short, step-by-step application that saves as you go.',
  },
  request: {
    path: '/request',
    title: 'Request free help for your business: SBI Network',
    description:
      'Ask SBI for a free website, promo video, Google Business Profile update, or social media setup. Takes about three minutes.',
  },
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) ?? []
    if (key && val) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function useDocumentMeta(routeKey) {
  useEffect(() => {
    const meta = ROUTE_META[routeKey]
    if (!meta) return

    const fullTitle =
      routeKey === 'home' ? `${meta.title} | ${SITE_NAME}` : meta.title
    document.title = fullTitle

    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', `${SITE_URL}${meta.path}`)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', meta.description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${meta.path}`)
  }, [routeKey])
}
