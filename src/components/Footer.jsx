import { motion } from 'framer-motion'
import tamoLogo from '../assets/tamo-logo.png'

const fx = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function Footer() {
  return (
    <footer className="relative bg-white text-ink-900 overflow-x-clip">
      {/* Non-overflowing masked curve */}
      <div className="footer-curve" aria-hidden="true" />

      <motion.div
        variants={fx}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto max-w-7xl px-6 pt-20 pb-12"
      >
        <div className="flex items-center gap-4">
          <img
            src={tamoLogo}
            alt="TAMO Teknologi Indonesia"
            className="h-8 w-auto object-contain"
          />
          <p className="text-sm">
            © {new Date().getFullYear()} PT. TAMO TEKNOLOGI INDONESIA. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
