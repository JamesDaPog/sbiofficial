/**
 * Posts answers straight into a Google Form's response sheet.
 *
 * Google does not send CORS headers, so the request goes out as `no-cors` and
 * the response is opaque: a network failure rejects, but Google rejecting the
 * answers (for example after a question is changed in the Form editor) cannot
 * be detected here. Keep the entry IDs in src/data/forms.js in sync with the
 * live form.
 *
 * @param {{ action: string, pageHistory?: string, steps: Array<{ fields: Array<{ id: string }> }> }} form
 * @param {Record<string, string | string[]>} values
 * @returns {Promise<void>}
 */
export async function submitToGoogleForm(form, values) {
  const body = new URLSearchParams()

  for (const step of form.steps) {
    for (const field of step.fields) {
      const value = values[field.id]
      if (Array.isArray(value)) {
        value.forEach((v) => body.append(field.id, v))
      } else if (value != null && String(value).trim() !== '') {
        body.append(field.id, String(value).trim())
      }
    }
  }

  body.append('fvv', '1')
  if (form.pageHistory) body.append('pageHistory', form.pageHistory)

  await fetch(form.action, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}
