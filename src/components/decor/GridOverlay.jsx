export default function GridOverlay({ dark = false, className = '' }) {
  return (
    <div
      className={`absolute inset-0 z-0 ${dark ? 'bg-grid-dark' : 'bg-grid'} ${className}`}
      aria-hidden="true"
    />
  )
}
