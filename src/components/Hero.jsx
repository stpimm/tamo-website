import { useCallback } from "react";
import { motion } from "motion/react"

export default function Hero() {
  // Smooth-scroll helper (works nicely inside the snap container)
  const smoothTo = useCallback((hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash);
  }, []);

  const container = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.06 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-3xl"
        >
          {/* Eyebrow / company name on top */}
          <motion.div
            variants={item}
            className="text-sm md:text-base text-ink-700/80 mb-2 md:mb-3"
          >
            PT. Tamo Teknologi Indonesia
          </motion.div>

          {/* Restored selling header */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
          >
            Ship faster. Stay secure.{" "}
            <br className="hidden md:block" />
            <span className="whitespace-nowrap">Scale with confidence.</span>
          </motion.h1>

          {/* Restored description */}
          <motion.p
            variants={item}
            className="mt-4 md:mt-6 text-lg md:text-xl text-ink-700 leading-relaxed"
          >
            PT. TAMO Teknologi Indonesia designs, supplies, and supports modern IT—covering
            networks, infrastructure, cloud, and security—so your team can focus on growth
            instead of maintenance.
          </motion.p>

          {/* CTAs (unchanged) */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smoothTo("#contact");
              }}
              className="btn-primary inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-medium shadow-sm"
            >
              Talk to an Expert
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                smoothTo("#services");
              }}
              className="inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-medium bg-white text-ink-900 shadow-sm ring-1 ring-black/10 hover:bg-white hover:ring-black/20 transition-colors"
            >
              See What We Do
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
