import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

/**
 * One continuous animated backdrop for the entire page.
 * Rendered into <body> via a portal; fixed to the viewport.
 * It will NOT follow your nested scroll container.
 */
export default function GlobalBackdrop() {
  const items = [
    { size: 520, x: '-10%', y: '10%',  dx: 30,  dy: -40, delay: 0   },
    { size: 420, x: '60%',  y: '-8%',  dx: -40, dy: 20,  delay: 0.2 },
    { size: 460, x: '20%',  y: '60%',  dx: 20,  dy: -30, delay: 0.4 },
  ]
  const colors = [
    'oklch(88% 0.14 255 / .9)',
    'oklch(90% 0.06 220 / .9)',
    'oklch(92% 0.03 200 / .9)',
  ]

  const layer = (
    <div className="backdrop-root" aria-hidden="true">
      {items.map((o, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0.7 }}
          animate={{ x: [0, o.dx, 0, -o.dx, 0], y: [0, o.dy, 0, -o.dy, 0] }}
          transition={{ duration: 12 + i * 4, ease: 'easeInOut', repeat: Infinity, delay: o.delay }}
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(closest-side, ${colors[i % colors.length]}, transparent)`,
          }}
          className="absolute blur-3xl mix-blend-multiply"
        />
      ))}
      {/* Soft overall light wash so sections stay bright */}
      <div className="absolute inset-0 bg-radial-fade" />
    </div>
  )

  return createPortal(layer, document.body)
}
