export function BrandMark({ size = 48, className = '', framed = false }) {
  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-md ${
        framed ? 'ring-1 ring-navy-900/10' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/sbi-logo.jpeg"
        alt="SBI"
        className="h-full w-full object-cover"
        width={size}
        height={size}
      />
    </span>
  )
}

/* SBI's original blue wordmark. White on navy surfaces. */
export function Wordmark({ size = 'sm', tone = 'ink', className = '' }) {
  const large = size === 'lg'
  const color = tone === 'light' ? 'text-white' : 'text-sbi-blue'

  return (
    <span
      className={`inline-flex select-none items-center whitespace-nowrap font-body font-bold leading-none tracking-[-0.045em] ${
        large ? 'text-[4.5rem] sm:text-[6rem]' : 'text-[1.9rem]'
      } ${color} ${className}`}
    >
      sbi
    </span>
  )
}
