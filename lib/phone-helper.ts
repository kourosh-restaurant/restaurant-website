
export function formatIranPhone(phone: string) {
  let p = phone.trim()

  if (p.startsWith('+')) return p

  if (p.startsWith('0')) {
    p = p.slice(1)
  }

  return `+98${p}`
}
