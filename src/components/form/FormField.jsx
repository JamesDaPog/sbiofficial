const INPUT_CLASS =
  'mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-body text-ink placeholder:text-ink/35 transition-colors focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-400/15'

function Choice({ field, value, onChange }) {
  const isMulti = field.type === 'checkbox'
  const selected = isMulti ? value ?? [] : value

  const toggle = (optionValue) => {
    if (!isMulti) {
      onChange(optionValue)
      return
    }
    onChange(
      selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue],
    )
  }

  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {field.options.map((option) => {
        const checked = isMulti ? selected.includes(option.value) : selected === option.value
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-body-sm transition-colors ${
              checked ? 'border-gold-400 bg-gold-50 text-ink' : 'border-ink/25 bg-white text-ink-soft hover:border-ink/40'
            }`}
          >
            <input
              type={isMulti ? 'checkbox' : 'radio'}
              name={field.id}
              value={option.value}
              checked={checked}
              onChange={() => toggle(option.value)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-gold-500)]"
            />
            <span>{option.label ?? option.value}</span>
          </label>
        )
      })}
    </div>
  )
}

export default function FormField({ field, value, error, onChange }) {
  const describedBy = [field.help && `${field.id}-help`, error && `${field.id}-error`].filter(Boolean).join(' ') || undefined
  const borderClass = error ? 'border-red-700' : 'border-ink/20'
  const isChoice = field.type === 'radio' || field.type === 'checkbox'

  const label = (
    <>
      {field.label}
      {field.required ? (
        <span className="text-red-800" aria-hidden="true"> *</span>
      ) : (
        <span className="ml-2 text-[13px] font-normal text-ink-soft">Optional</span>
      )}
    </>
  )

  const control = isChoice ? (
    <Choice field={field} value={value} onChange={onChange} />
  ) : field.type === 'textarea' ? (
    <textarea
      id={field.id}
      rows={4}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy}
      aria-required={field.required}
      placeholder={field.placeholder}
      className={`${INPUT_CLASS} ${borderClass} min-h-[7.5rem] resize-y`}
    />
  ) : (
    <input
      id={field.id}
      type={field.type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy}
      aria-required={field.required}
      autoComplete={field.autoComplete}
      placeholder={field.placeholder}
      inputMode={field.type === 'tel' ? 'tel' : undefined}
      className={`${INPUT_CLASS} ${borderClass}`}
    />
  )

  const Wrapper = isChoice ? 'fieldset' : 'div'
  const Label = isChoice ? 'legend' : 'label'

  return (
    <Wrapper id={isChoice ? field.id : undefined} tabIndex={isChoice ? -1 : undefined} aria-describedby={isChoice ? describedBy : undefined} className="outline-none">
      <Label htmlFor={isChoice ? undefined : field.id} className="block text-[15.5px] font-semibold leading-snug text-ink">
        {label}
      </Label>
      {field.help && (
        <p id={`${field.id}-help`} className="mt-1 text-body-sm text-ink-soft">
          {field.help}
        </p>
      )}
      {control}
      {error && (
        <p id={`${field.id}-error`} className="mt-2 text-body-sm font-medium text-red-800">
          {error}
        </p>
      )}
    </Wrapper>
  )
}
