import { motion } from "framer-motion";

const Stat = ({ value, label }) => (
  <div className="w-[104px] sm:w-[112px] md:w-[118px] lg:w-[200px]">
    <div className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm">
      {/* fixed height + flex centering so text never drifts */}
      <div className="flex flex-col items-center justify-center h-[86px] sm:h-[92px] md:h-[100px] lg:h-[140px] px-3 md:px-4">
        <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold leading-none text-ink-900">
          {value}
        </div>
        <div className="mt-1 md:mt-1.5 text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs uppercase tracking-[0.14em] text-ink-700 whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  </div>
);

export default function About() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-16 w-full">
      {/* More breathing room between columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-20 lg:gap-24">
        {/* Left: copy (constrain width + add right padding) */}
        <div className="md:max-w-3xl md:pr-4 lg:pr-8">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="section-title mb-4"
          >
            Our Story
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-ink-900 text-lg md:text-xl leading-relaxed"
          >
            Founded in 2017, TAMO Teknologi Indonesia blends deep technical expertise with
            real-world execution. We’ve helped enterprises across finance, energy,
            manufacturing, and the public sector modernize their infrastructure and deliver
            secure, resilient systems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-4 text-ink-900 text-lg md:text-xl leading-relaxed"
          >
            <span className="font-semibold">Our Vision &amp; Mission:</span> To lead Indonesia’s
            digital evolution by delivering innovative, secure, and reliable IT solutions —
            tailored to each client’s goals and built for scale.
          </motion.p>
        </div>

        {/* Right: KPI row — add left padding so it doesn’t feel tight */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="md:flex md:justify-end md:pl-6 lg:pl-10"
        >
          <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5 place-items-center">
            <Stat value="2017" label="EST." />
            <Stat value="40+" label="PROJECTS" />
            <Stat value="10+" label="INDUSTRIES" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
