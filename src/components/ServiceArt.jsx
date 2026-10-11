/**
 * Small drawn illustrations of each service, built from shapes rather than
 * screenshots so they never pretend to be real client work.
 */

function Browser() {
  return (
    <div className="w-full max-w-[17rem] overflow-hidden rounded-lg border border-navy-900/10 bg-white shadow-[0_14px_30px_-18px_rgba(11,31,58,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-navy-900/10 bg-navy-50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-navy-200" />
        <span className="h-2 w-2 rounded-full bg-navy-200" />
        <span className="h-2 w-2 rounded-full bg-navy-200" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-white" />
      </div>
      <div className="p-3">
        <div className="h-16 rounded-md bg-[linear-gradient(135deg,var(--color-navy-700),var(--color-navy-400))]" />
        <div className="mt-3 h-2.5 w-2/3 rounded-full bg-navy-900/80" />
        <div className="mt-2 h-2 w-full rounded-full bg-navy-100" />
        <div className="mt-1.5 h-2 w-5/6 rounded-full bg-navy-100" />
        <div className="mt-3 flex gap-2">
          <span className="h-5 w-16 rounded-full bg-gold-500" />
          <span className="h-5 w-12 rounded-full border border-navy-200" />
        </div>
      </div>
    </div>
  )
}

function Phone() {
  return (
    <div className="relative h-[9.5rem] w-[5.4rem] rounded-[1.1rem] border-[3px] border-navy-900 bg-navy-900 shadow-[0_14px_30px_-16px_rgba(11,31,58,0.6)]">
      <div className="absolute inset-0 overflow-hidden rounded-[0.85rem] bg-[linear-gradient(160deg,var(--color-navy-500),var(--color-navy-900))]">
        <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90">
          <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-navy-900" />
        </div>
        <div className="absolute inset-x-2 bottom-3 h-1 rounded-full bg-white/25">
          <div className="h-full w-2/5 rounded-full bg-gold-300" />
        </div>
        <div className="absolute right-1.5 top-8 flex flex-col gap-2">
          <span className="h-3 w-3 rounded-full bg-white/70" />
          <span className="h-3 w-3 rounded-full bg-white/70" />
          <span className="h-3 w-3 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  )
}

function Listing() {
  return (
    <div className="w-full max-w-[16rem] rounded-lg border border-navy-900/10 bg-white p-3.5 shadow-[0_14px_30px_-18px_rgba(11,31,58,0.45)]">
      <div className="h-2.5 w-1/2 rounded-full bg-navy-900/80" />
      <div className="mt-2 flex items-center gap-1" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-3 w-3 fill-[#F4B400]">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z" />
          </svg>
        ))}
        <span className="ml-1 h-2 w-8 rounded-full bg-navy-100" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <span className="h-10 rounded bg-navy-200" />
        <span className="h-10 rounded bg-navy-300" />
        <span className="h-10 rounded bg-navy-100" />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[9px] font-semibold text-[#137333]">Open</span>
        <span className="h-2 w-20 rounded-full bg-navy-100" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <span className="h-5 rounded-full border border-navy-200" />
        <span className="h-5 rounded-full border border-navy-200" />
        <span className="h-5 rounded-full border border-navy-200" />
      </div>
    </div>
  )
}

function Social() {
  const tiles = ['bg-navy-700', 'bg-navy-200', 'bg-gold-400', 'bg-navy-100', 'bg-navy-500', 'bg-navy-300']
  return (
    <div className="w-full max-w-[15rem] rounded-lg border border-navy-900/10 bg-white p-3 shadow-[0_14px_30px_-18px_rgba(11,31,58,0.45)]">
      <div className="flex items-center gap-2.5">
        <span className="h-8 w-8 rounded-full bg-[conic-gradient(var(--color-gold-400),var(--color-navy-700),var(--color-gold-400))] p-[2px]">
          <span className="block h-full w-full rounded-full border-2 border-white bg-navy-100" />
        </span>
        <div className="flex-1">
          <div className="h-2 w-1/2 rounded-full bg-navy-900/80" />
          <div className="mt-1.5 flex gap-3">
            <span className="h-1.5 w-6 rounded-full bg-navy-100" />
            <span className="h-1.5 w-6 rounded-full bg-navy-100" />
            <span className="h-1.5 w-6 rounded-full bg-navy-100" />
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {tiles.map((tile, i) => (
          <span key={i} className={`aspect-square rounded-sm ${tile}`} />
        ))}
      </div>
    </div>
  )
}

const ART = { website: Browser, video: Phone, google: Listing, social: Social }

export default function ServiceArt({ kind }) {
  const Art = ART[kind]
  if (!Art) return null
  return (
    <div
      aria-hidden="true"
      className="flex h-44 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_30%_20%,var(--color-navy-50),var(--color-paper-deep))] px-4"
    >
      <Art />
    </div>
  )
}
