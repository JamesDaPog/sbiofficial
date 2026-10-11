import { Link } from 'wouter'

/**
 * The site's single call-to-action component. Every CTA routes through this
 * so weight and focus behaviour stay identical. Pill-shaped, solid or
 * outlined, with an arrow that moves a few pixels on hover.
 */

const SIZES = {
  md: 'px-5 py-2.5 text-body-sm',
  lg: 'px-6 py-3 text-body-sm sm:text-body',
  xl: 'px-7 py-3.5 text-body',
}

const TONES = {
  primary: 'bg-gold-500 text-white shadow-[0_8px_24px_-12px_rgba(45,103,167,0.7)] hover:bg-gold-600',
  dark: 'bg-navy-900 text-white hover:bg-navy-800',
  ghost: 'border border-navy-900/25 bg-white text-ink hover:border-navy-900 hover:bg-navy-50',
  light: 'bg-white text-ink hover:bg-navy-50',
  sky: 'bg-gold-200 text-navy-950 hover:bg-gold-300',
  outlineLight: 'border border-white/40 bg-white/5 text-white hover:bg-white hover:text-ink',
  blue: 'bg-navy-700 text-white hover:bg-navy-800',
}

export default function Cta({
  children,
  to,
  href,
  onClick,
  tone = 'primary',
  size = 'lg',
  arrow = '→',
  className = '',
  full = false,
  type = 'button',
  ...rest
}) {
  const classes = [
    'group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-body font-semibold',
    'transition-colors duration-200 focus-gold select-none disabled:cursor-not-allowed disabled:opacity-50',
    SIZES[size],
    TONES[tone],
    full ? 'w-full' : '',
    className,
  ].join(' ')

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className="leading-none transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          {arrow}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link
        href={to}
        onClick={onClick}
        className={classes}
        data-testid={`link-${to.replace(/\W+/g, '-').replace(/^-|-$/g, '')}`}
        {...rest}
      >
        {inner}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
        onClick={onClick}
        className={classes}
        data-testid="link-external"
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick} className={classes} data-testid="button-action" {...rest}>
      {inner}
    </button>
  )
}
