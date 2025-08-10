import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.06 },
  },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stats = [
  { value: "2017", label: "EST." },
  { value: "40+", label: "PROJECTS" },
  { value: "10+", label: "INDUSTRIES" },
];

export default function About() {
  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-14 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left: copy */}
          <div className="space-y-4 md:space-y-5">
            <motion.h2 variants={item} className="section-title">Our Story</motion.h2>

            <motion.p variants={item} className="max-w-2xl text-ink-900/90 leading-relaxed">
              Founded in 2017, TAMO Teknologi Indonesia blends deep technical expertise with
              real-world execution. We’ve helped enterprises across finance, energy, manufacturing,
              and the public sector modernize their infrastructure and deliver secure, resilient systems.
            </motion.p>

            <motion.p variants={item} className="max-w-2xl text-ink-900/90 leading-relaxed">
              <span className="font-semibold">Our Vision &amp; Mission:</span> To lead Indonesia’s digital
              evolution by delivering innovative, secure, and reliable IT solutions — tailored to each
              client’s goals and built for scale.
            </motion.p>
          </div>

          {/* Right: always 3 cards in one row, vertically centered to the text */}
          <motion.div variants={item} className="self-center">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 md:p-8 text-center"
                >
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight">{s.value}</div>
                  <div className="mt-2 text-[10px] md:text-xs tracking-widest text-ink-700">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
