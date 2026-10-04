/** Pfeil im gelben Kreis. Nur innerhalb von .btn verwenden. */
export function ArrowRight() {
  return (
    <span className="btn__icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  )
}

export function ArrowUpRight() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 11L11 3M5 3h6v6" />
    </svg>
  )
}

/** Pfeil für Listenzeilen (Kreis mit Rahmen) */
export function RowArrow() {
  return (
    <span className="service__arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  )
}
