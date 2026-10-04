// Formatierung nach Schweizer Schreibweise. Bewusst ohne Intl, damit Server und Browser identisch ausgeben.

/** 25000 -> «25’000» */
export function fmt(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '’')
}

/** CHF 1’000 */
export function chf(n: number): string {
  return `CHF ${fmt(n)}`
}

const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

/** «2026-07-13» -> «13. Juli 2026» */
export function datumLang(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}. ${MONATE[m - 1]} ${y}`
}
