// Sends form submissions as JSON to the endpoint in VITE_FORM_ENDPOINT.
// Works with Formspree (https://formspree.io/f/<id>) or any endpoint that
// accepts a JSON POST and returns a 2xx status on success.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export async function submitForm(formName, data) {
  if (!ENDPOINT) {
    throw new Error('The contact form is not configured yet. Please email us directly.');
  }

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _form: formName, _subject: `Nebulyx: ${formName}`, ...data }),
    });
  } catch {
    throw new Error('Network error. Check your connection and try again.');
  }

  if (!res.ok) {
    let message = 'Something went wrong sending your request. Please try again.';
    try {
      const body = await res.json();
      if (body?.errors?.[0]?.message) message = body.errors[0].message;
    } catch {}
    throw new Error(message);
  }
}
