import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import { Wordmark } from '../Brand'
import Cta from '../Cta'
import FormField from './FormField'
import { submitToGoogleForm } from '../../lib/googleForm'
import { track } from '../../lib/siteEvents'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\-.\s\d]{7,}$/

/* Drafts live only in this browser so a closed tab doesn't lose ten minutes of typing. */
const draftKey = (form) => `sbi-form-draft-${form.key}`

function readDraft(form) {
  try {
    const raw = window.localStorage.getItem(draftKey(form))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeDraft(form, values) {
  try {
    window.localStorage.setItem(draftKey(form), JSON.stringify(values))
  } catch {
    /* Storage can be unavailable (private mode); the form still works. */
  }
}

function clearDraft(form) {
  try {
    window.localStorage.removeItem(draftKey(form))
  } catch {
    /* ignore */
  }
}

function isEmpty(value) {
  return Array.isArray(value) ? value.length === 0 : !String(value ?? '').trim()
}

function validateField(field, value) {
  if (field.required && isEmpty(value)) {
    return field.type === 'radio' || field.type === 'checkbox' ? 'Please choose an option.' : 'This question is required.'
  }
  if (isEmpty(value)) return null
  if (field.type === 'email' && !EMAIL_RE.test(String(value).trim())) return 'Enter a valid email address, like name@example.com.'
  if (field.type === 'tel' && !PHONE_RE.test(String(value).trim())) return 'Enter a valid phone number.'
  return null
}

function validateStep(step, values) {
  return step.fields.reduce((errors, field) => {
    const message = validateField(field, values[field.id])
    return message ? { ...errors, [field.id]: message } : errors
  }, {})
}

function displayValue(field, value) {
  if (isEmpty(value)) return '—'
  const values = Array.isArray(value) ? value : [value]
  return values
    .map((v) => field.options?.find((o) => o.value === v)?.label ?? v)
    .join(', ')
}

function ProgressHeader({ form, stepIndex, totalSteps, stepTitle, onExit }) {
  const percent = Math.round(((stepIndex + 1) / totalSteps) * 100)

  return (
    <header className="sticky top-0 z-40 bg-navy-950 text-white">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="SBI home" className="flex items-center gap-3">
          <Wordmark tone="light" />
          <span className="hidden border-l border-white/20 pl-3 text-[13px] font-medium text-white/65 sm:inline">
            {form.shortTitle}
          </span>
        </Link>
        <button type="button" onClick={onExit} className="focus-gold rounded-full border border-white/25 px-4 py-1.5 text-[13.5px] font-medium text-white/85 hover:bg-white hover:text-ink">
          Save and exit
        </button>
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-3 sm:px-8">
        <div className="flex items-baseline justify-between gap-4 text-[13px]">
          <p className="font-medium text-white">
            Step {stepIndex + 1} of {totalSteps}
            <span className="text-white/60"> · {stepTitle}</span>
          </p>
          <p className="tabular-nums text-gold-300">{percent}%</p>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/12"
          role="progressbar"
          aria-label={`${form.shortTitle} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="h-full rounded-full bg-gold-300 transition-[width] duration-500 ease-out" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  )
}

function StepNav({ labels, stepIndex, furthest, onJump }) {
  return (
    <ol className="hide-scrollbar mb-10 flex gap-1 overflow-x-auto border-b border-ink/20 pb-4">
      {labels.map((label, i) => {
        const reachable = i <= furthest
        const current = i === stepIndex
        return (
          <li key={label} className="shrink-0">
            <button
              type="button"
              disabled={!reachable}
              onClick={() => onJump(i)}
              aria-current={current ? 'step' : undefined}
              className={`focus-gold flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] ${
                current ? 'bg-navy-50 font-semibold text-ink' : reachable ? 'text-ink-soft hover:text-ink' : 'text-ink/35'
              }`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${
                  i < stepIndex ? 'bg-gold-500 text-white' : current ? 'bg-navy-900 text-white' : 'border border-ink/25'
                }`}
              >
                {i < stepIndex ? '✓' : i + 1}
              </span>
              {label}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

function Review({ steps, values, onEdit }) {
  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <section key={step.title} className="rounded-xl border border-ink/20 bg-paper-deep/60 p-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl text-ink">{step.title}</h3>
            <button type="button" onClick={() => onEdit(i)} className="focus-gold rounded-full bg-navy-50 px-3 py-1 text-[13px] font-semibold text-gold-600 hover:bg-navy-100">
              Edit
            </button>
          </div>
          <dl className="mt-4 divide-y divide-ink/10">
            {step.fields.map((field) => (
              <div key={field.id} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6">
                <dt className="text-body-sm text-ink-soft">{field.label}</dt>
                <dd className="whitespace-pre-wrap break-words text-body-sm text-ink">{displayValue(field, values[field.id])}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}

function Success({ form }) {
  return (
    <div className="py-10 text-center sm:py-16">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500 text-2xl text-white" aria-hidden="true">
        ✓
      </div>
      <h1 className="mt-8 font-display text-display-lg text-ink">{form.success.title}</h1>
      <p className="mx-auto mt-5 max-w-[52ch] text-body-lg text-ink-soft">{form.success.body}</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Cta to="/" tone="dark">Back to the homepage</Cta>
        <Cta to="/team" tone="ghost">Meet the team</Cta>
      </div>
    </div>
  )
}

export default function MultiStepForm({ form, onExit }) {
  const reviewIndex = form.steps.length
  const totalSteps = form.steps.length + 1
  const labels = [...form.steps.map((s) => s.title), 'Review']

  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [stepIndex, setStepIndex] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [status, setStatus] = useState('idle')
  const headingRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    setValues(readDraft(form))
  }, [form])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
    headingRef.current?.focus()
  }, [stepIndex])

  const update = (id, value) => {
    const next = { ...values, [id]: value }
    setValues(next)
    writeDraft(form, next)
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }))
  }

  const goTo = (index) => {
    setErrors({})
    setStepIndex(index)
    setFurthest((f) => Math.max(f, index))
  }

  const handleContinue = (event) => {
    event.preventDefault()
    if (stepIndex === reviewIndex) {
      handleSubmit()
      return
    }
    const stepErrors = validateStep(form.steps[stepIndex], values)
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      const firstId = Object.keys(stepErrors)[0]
      document.getElementById(firstId)?.focus()
      return
    }
    track('form_step', { form: form.key, step: stepIndex + 1 })
    goTo(stepIndex + 1)
  }

  const handleSubmit = async () => {
    const invalidStep = form.steps.findIndex((step) => Object.keys(validateStep(step, values)).length)
    if (invalidStep !== -1) {
      setErrors(validateStep(form.steps[invalidStep], values))
      setStepIndex(invalidStep)
      return
    }
    setStatus('sending')
    try {
      await submitToGoogleForm(form, values)
      clearDraft(form)
      track('form_submit', { form: form.key })
      setStatus('sent')
      window.scrollTo({ top: 0 })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="lines-bg min-h-[100dvh]">
        <ProgressHeader form={form} stepIndex={reviewIndex} totalSteps={totalSteps} stepTitle="Done" onExit={onExit} />
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
          <div className="card px-6 sm:px-10">
            <Success form={form} />
          </div>
        </div>
      </div>
    )
  }

  const isReview = stepIndex === reviewIndex
  const step = form.steps[stepIndex]

  return (
    <div className="lines-bg min-h-[100dvh]">
      <ProgressHeader form={form} stepIndex={stepIndex} totalSteps={totalSteps} stepTitle={labels[stepIndex]} onExit={onExit} />

      <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
        <StepNav labels={labels} stepIndex={stepIndex} furthest={furthest} onJump={goTo} />

        {stepIndex === 0 && (
          <div className="mb-10">
            <p className="kicker text-gold-500">{form.shortTitle}</p>
            <p className="mt-3 max-w-[60ch] text-body text-ink-soft">{form.intro}</p>
          </div>
        )}

        <form noValidate onSubmit={handleContinue} className="card p-6 sm:p-10">
          <h1 ref={headingRef} tabIndex={-1} className="font-display text-display-lg text-ink outline-none">
            {isReview ? 'Check your answers' : step.title}
          </h1>
          <p className="mt-3 max-w-[60ch] text-body-lg text-ink-soft">
            {isReview ? 'Make sure everything looks right. You can edit any section before you submit.' : step.lede}
          </p>

          {!isReview && step.promise && (
            <ol className="mt-8 space-y-3 rounded-xl border border-navy-200 bg-navy-50 px-6 py-5">
              {step.promise.map((rule, i) => (
                <li key={rule} className="flex gap-3 text-body text-ink">
                  <span className="font-display text-brass">{i + 1}.</span>
                  {rule}
                </li>
              ))}
            </ol>
          )}

          <div className="mt-10">
            {isReview ? (
              <Review steps={form.steps} values={values} onEdit={goTo} />
            ) : (
              <div className="space-y-8">
                {step.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={values[field.id]}
                    error={errors[field.id]}
                    onChange={(value) => update(field.id, value)}
                  />
                ))}
              </div>
            )}
          </div>

          {status === 'error' && (
            <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-body-sm text-red-900">
              Your answers couldn’t be sent. Check your internet connection and try again. If it keeps happening,{' '}
              <a href={form.fallbackUrl} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold">
                use the Google Form instead
              </a>
              .
            </div>
          )}

          <div className="mt-10 flex flex-col-reverse items-stretch justify-between gap-4 border-t border-ink/20 pt-6 sm:flex-row sm:items-center">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={() => goTo(stepIndex - 1)}
                className="focus-gold px-1 py-3 text-left text-[15px] font-semibold text-ink-soft hover:text-ink"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <Cta type="submit" size="lg" tone={isReview ? 'primary' : 'dark'} disabled={status === 'sending'}>
              {isReview ? (status === 'sending' ? 'Sending…' : 'Submit') : `Continue to ${labels[stepIndex + 1]}`}
            </Cta>
          </div>
        </form>

        <p className="mt-10 text-[13px] text-ink-soft">
          Your answers are saved in this browser as you type and sent to SBI only when you press Submit.
        </p>
      </div>
    </div>
  )
}
