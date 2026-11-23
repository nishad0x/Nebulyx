const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/lead';
const CONTACT_EMAIL = 'hello@nebulyx.live';

export async function submitForm(formName, data) {
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _form: formName, _subject: `Nebulyx: ${formName}`, ...data }),
    });
  } catch {
    throw new Error(`We couldn't reach our server. Check your connection, or email us at ${CONTACT_EMAIL}.`);
  }

  if (!res.ok) {
    let message = `Your request didn't go through. Please email us at ${CONTACT_EMAIL}.`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
      else if (body?.errors?.[0]?.message) message = body.errors[0].message;
    } catch {}
    throw new Error(message);
  }
}
