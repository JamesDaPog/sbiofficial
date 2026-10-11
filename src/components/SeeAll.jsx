import { Link } from 'wouter'

/** Novus-style "See all →" link that sits opposite a section head. */
export default function SeeAll({ to, children }) {
  return (
    <Link
      href={to}
      className="group inline-flex shrink-0 items-center gap-2 text-body-sm font-semibold text-gold-500 hover:text-gold-700"
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  )
}
