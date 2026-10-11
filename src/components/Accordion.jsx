/**
 * Native <details> disclosure, set like a printed Q&A: hairline rules, a
 * serif question, and a plus that turns into a minus.
 */
export default function Accordion({ title, defaultOpen = false, children, id, indexNumber }) {
  const slug = id ?? title.replace(/\s+/g, '-').toLowerCase()

  return (
    <details
      id={id}
      open={defaultOpen}
      className="group scroll-mt-28 border-t border-ink/25"
      data-testid={`accordion-${slug}`}
    >
      <summary
        className="focus-gold flex cursor-pointer list-none select-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden"
        data-testid={`summary-${slug}`}
      >
        <span className="flex min-w-0 items-baseline gap-5">
          {indexNumber && (
            <span className="shrink-0 font-display text-base text-brass">{indexNumber}</span>
          )}
          <span className="min-w-0 font-display text-[1.35rem] leading-snug text-ink transition-colors group-hover:text-gold-600">
            {title}
          </span>
        </span>
        <span aria-hidden="true" className="relative mt-2 h-4 w-4 shrink-0 text-ink">
          <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
          <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="max-w-[62ch] break-words pb-6 text-body leading-relaxed text-ink-soft sm:pl-[2.6rem]">
        {children}
      </div>
    </details>
  )
}
