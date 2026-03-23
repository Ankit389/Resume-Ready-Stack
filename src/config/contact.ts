export const CONTACT = {
  // NOTE: User provided "resumereadystack@gmail" — Gmail requires .com for a valid address.
  email: 'resumereadystack@gmail.com',
  // Replace with your WhatsApp number in international format (digits only), e.g. "919876543210"
  whatsappPhone: '1234567890',
  // User-provided LinkedIn admin dashboard URL
  linkedInUrl: 'https://www.linkedin.com/company/111704651/admin/dashboard/'
} as const

export function gmailComposeUrl(params: { to: string; subject?: string; body?: string }) {
  const search = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: params.to
  })
  if (params.subject) search.set('su', params.subject)
  if (params.body) search.set('body', params.body)
  return `https://mail.google.com/mail/?${search.toString()}`
}

export function whatsappUrl(phoneDigitsOnly: string, message: string) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${phoneDigitsOnly}?text=${text}`
}





