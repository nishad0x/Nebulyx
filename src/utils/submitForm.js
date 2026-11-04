// Sends form submissions as JSON to the endpoint in VITE_FORM_ENDPOINT.
// Works with Formspree (https://formspree.io/f/<id>) or any endpoint that
// accepts a JSON POST and returns a 2xx status on success.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export async function submitForm(formName, data) {
  if (!ENDPOINT) {
    throw new Error("We couldn't send your request because this form isn't connected yet. Please try again later.");
  }

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _form: formName, _subject: `Nebulyx: ${formName}`, ...data }),
    });
  } catch {
    throw new Error("We couldn't reach our server. Check your connection and try again.");
  }

  if (!res.ok) {
    let message = "Your request didn't go through. Please try again in a moment.";
    try {
      const body = await res.json();
      if (body?.errors?.[0]?.message) message = body.errors[0].message;
    } catch {}
    throw new Error(message);
  }
}
