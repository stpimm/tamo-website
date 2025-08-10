import { motion } from 'framer-motion'

export default function Backdrop({ className = '', colors }) {
  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Orbs colors={colors} />
      {/* soft vignette so edges don’t get harsh */}
      <div className="absolute inset-0 bg-radial-fade" />
    </div>
  )
}

function Orbs({ colors }) {
  const palette = colors && colors.length
    ? colors
    : ['oklch(88% 0.14 255 / .9)', 'oklch(90% 0.06 220 / .9)', 'oklch(92% 0.03 200 / .9)']

  const items = [
    { size: 620, x: '-10%', y: '10%',  dx: 30,  dy: -40, delay: 0   },
    { size: 520, x: '60%',  y: '-8%',  dx: -40, dy: 20,  delay: 0.2 },
    { size: 560, x: '20%',  y: '60%',  dx: 20,  dy: -30, delay: 0.4 },
  ]

  return (
    <>
      {items.map((o, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0.7 }}
          animate={{
            x: [0, o.dx, 0, -o.dx, 0],
            y: [0, o.dy, 0, -o.dy, 0],
            opacity: [0.7, 0.85, 0.7],
          }}
          transition={{
            duration: 8 + i * 3,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: o.delay,
          }}
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(closest-side, ${palette[i % palette.length]}, transparent)`,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
          className="absolute blur-3xl mix-blend-multiply"
        />
      ))}
    </>
  )
}
