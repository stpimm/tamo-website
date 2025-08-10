import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const asset = (p) => new URL(p, import.meta.url).href;

/** Logo badge (card for floating, bare for grid) */
function ClientBadge({ name, src, size = 96, className = "", variant = "card" }) {
  const [ok, setOk] = useState(Boolean(src));
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
  const dim = typeof size === "number" ? `${size}px` : size;

  if (variant === "bare") {
    return ok && src ? (
      <img
        src={asset(src)}
        alt={name}
        className={`object-contain ${className}`}
        style={{ width: dim, height: dim }}
        onError={() => setOk(false)}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <span className="text-sm font-semibold text-ink-900">{initials}</span>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm ring-1 ring-black/5 flex items-center justify-center ${className}`}
      style={{ width: dim, height: dim }}
      title={name}
    >
      {ok && src ? (
        <img
          src={asset(src)}
          alt={name}
          className="w-4/5 h-4/5 object-contain"
          onError={() => setOk(false)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="text-sm font-semibold text-ink-900">{initials}</span>
      )}
    </div>
  );
}

/* tiny seeded PRNG so motions are stable across renders */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** unique float path (no fade), with very subtle rotation */
function useFloat(seed, dxBase = 26, dyBase = 20, durBase = 22) {
  return useMemo(() => {
    const rnd = mulberry32(seed);
    const dx = dxBase * (0.7 + rnd() * 0.6);
    const dy = dyBase * (0.7 + rnd() * 0.6);
    const spin = 0.3 + rnd() * 0.6; // subtle

    const patterns = [
      { x: [0, dx, 0, -dx, 0], y: [0, dy, 0, -dy, 0] },
      { x: [0, dx * 0.6, -dx, dx, 0], y: [0, -dy, dy * 0.6, -dy * 0.8, 0] },
      { x: [0, -dx, -dx * 0.2, dx, 0], y: [0, dy * 0.5, -dy, dy * 0.8, 0] },
      { x: [0, dx, dx * 0.3, -dx, 0], y: [0, 0, dy, 0, -dy] },
    ];
    const p = patterns[Math.floor(rnd() * patterns.length)];
    const duration = durBase * (1.1 + rnd() * 0.8);
    const delay = rnd() * 0.8;

    return {
      initial: { x: 0, y: 0, rotate: 0 },
      animate: { x: p.x, y: p.y, rotate: [0, spin, 0, -spin, 0] },
      transition: { duration, ease: "easeInOut", repeat: Infinity, delay },
    };
  }, [seed, dxBase, dyBase, durBase]);
}

export default function Clients() {
  // Desktop/tablet floats (8)
  const floating = [
    { name: "Adidas",                 src: "../assets/clients/adidas-seeklogo.png" },
    { name: "Honda",                  src: "../assets/clients/honda.png" },
    { name: "EF Education First",     src: "../assets/clients/english-first.png" },
    { name: "RSM",                    src: "../assets/clients/rsm.png" },
    { name: "Textile One Indonesia",  src: "../assets/clients/textile-one-indonesia.png" },
    { name: "Medco Energi",           src: "../assets/clients/medco-energi.png" },
    { name: "Indika Energy",          src: "../assets/clients/indika-energy.webp" },
    { name: "Dexa Group",             src: "../assets/clients/dexa-group.png" },
  ];

  // Mobile floats (only 4)
  const mobileFloats = [
    { name: "Adidas",                 src: "../assets/clients/adidas-seeklogo.png" },
    { name: "Honda",                  src: "../assets/clients/honda.png" },
    { name: "EF Education First",     src: "../assets/clients/english-first.png" },
    { name: "Textile One Indonesia",  src: "../assets/clients/textile-one-indonesia.png" },
  ];

  // The 4 that are removed from floats on mobile:
  const movedForMobile = [
    { name: "RSM",            src: "../assets/clients/rsm.png" },
    { name: "Medco Energi",   src: "../assets/clients/medco-energi.png" },
    { name: "Indika Energy",  src: "../assets/clients/indika-energy.webp" },
    { name: "Dexa Group",     src: "../assets/clients/dexa-group.png" },
  ];

  // Base list (12) shown on desktop
  const baseListed = [
    { name: "Bhimasena Power",        src: "../assets/clients/bhimasena-power.png" },
    { name: "Bhumi Jati",             src: "../assets/clients/bhumi-jati.png" },
    { name: "Bhumi Jepara",           src: "../assets/clients/bhumi-jepara.png" },
    { name: "HLI Green Power",        src: "../assets/clients/hli-green-power.png" },
    { name: "Makarintara",            src: "../assets/clients/makarin-tara.png" },
    { name: "Padang Karunia",         src: "../assets/clients/padang-karunia.png" },
    { name: "PVS",                    src: "../assets/clients/pvs.webp" },
    { name: "Soemadipradia Taher",    src: "../assets/clients/soemadipradia-taher.png" },
    { name: "Sunstar",                src: "../assets/clients/sunstar.png" },
    { name: "Bank BSI",               src: "../assets/clients/bank-bsi.png" },
    { name: "TIB Power Services",     src: "../assets/clients/tib-power-services.png" },
    { name: "Tripatra",               src: "../assets/clients/tripatra.png" },
  ];

  // Mobile list = moved + base (so it includes the 4 removed from floats)
  const mobileListed = [...movedForMobile, ...baseListed];

  // float configs
  const F = Array.from({ length: 8 }, (_, i) => useFloat(100 + i));
  const M = Array.from({ length: 4 }, (_, i) => useFloat(300 + i, 14, 12, 26)); // gentler motion on mobile

  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14 w-full">
        {/* Floating stage */}
        <div className="relative min-h-[420px] md:min-h-[620px]">
          {/* Center copy */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
            <div className="text-center max-w-3xl">
              <h2 className="section-title leading-tight">Our Valued Clients</h2>
              <p className="mt-3 text-ink-700 leading-relaxed">
                We help ambitious teams build secure, scalable, and modern IT foundations.
              </p>
            </div>
          </div>

          {/* Mobile floats (4) */}
          <div className="absolute inset-0 z-0 md:hidden">
            <motion.div className="absolute left-[6%] top-[58%]" {...M[0]}>
              <ClientBadge name={mobileFloats[0].name} src={mobileFloats[0].src} size={80} />
            </motion.div>
            <motion.div className="absolute right-[6%] top-[56%]" {...M[1]}>
              <ClientBadge name={mobileFloats[1].name} src={mobileFloats[1].src} size={80} />
            </motion.div>
            <motion.div className="absolute left-[18%] bottom-[10%]" {...M[2]}>
              <ClientBadge name={mobileFloats[2].name} src={mobileFloats[2].src} size={80} />
            </motion.div>
            <motion.div className="absolute right-[16%] bottom-[12%]" {...M[3]}>
              <ClientBadge name={mobileFloats[3].name} src={mobileFloats[3].src} size={80} />
            </motion.div>
          </div>

          {/* Desktop / tablet floats (8) */}
          <div className="absolute inset-0 z-0 hidden md:block">
            {/* TL */}
            <motion.div className="absolute left-[6%] top-[8%]" {...F[0]}>
              <ClientBadge name={floating[0].name} src={floating[0].src} size={128} />
            </motion.div>
            {/* TCL */}
            <motion.div className="absolute left-[27%] top-[6%]" {...F[1]}>
              <ClientBadge name={floating[1].name} src={floating[1].src} size={126} />
            </motion.div>
            {/* TCR */}
            <motion.div className="absolute right-[30%] top-[10%]" {...F[2]}>
              <ClientBadge name={floating[2].name} src={floating[2].src} size={122} />
            </motion.div>
            {/* TR */}
            <motion.div className="absolute right-[8%] top-[6%]" {...F[3]}>
              <ClientBadge name={floating[3].name} src={floating[3].src} size={122} />
            </motion.div>
            {/* ML */}
            <motion.div className="absolute left-[10%] top-[48%]" {...F[4]}>
              <ClientBadge name={floating[4].name} src={floating[4].src} size={124} />
            </motion.div>
            {/* MR */}
            <motion.div className="absolute right-[12%] top-[44%]" {...F[5]}>
              <ClientBadge name={floating[5].name} src={floating[5].src} size={122} />
            </motion.div>
            {/* BL */}
            <motion.div className="absolute left-[28%] bottom-[6%]" {...F[6]}>
              <ClientBadge name={floating[6].name} src={floating[6].src} size={126} />
            </motion.div>
            {/* BR */}
            <motion.div className="absolute right-[28%] bottom-[8%]" {...F[7]}>
              <ClientBadge name={floating[7].name} src={floating[7].src} size={126} />
            </motion.div>
          </div>
        </div>

        {/* Label above the listed grids */}
        <div className="mt-7 md:mt-12 mb-2 md:mb-3">
          <p className="text-xs md:text-sm uppercase tracking-wide text-ink-700">
            More clients we’ve supported
          </p>
        </div>

        {/* Mobile list: moved 4 + base 12 (smaller cards) */}
        <div className="md:hidden grid grid-cols-2 gap-2.5 sm:gap-3">
          {mobileListed.map((c, i) => (
            <div
              key={`m-${c.name}-${i}`}
              className="rounded-xl border border-black/10 bg-white px-2.5 py-3 flex items-center justify-center shadow-sm"
              title={c.name}
            >
              <ClientBadge name={c.name} src={c.src} variant="bare" size="clamp(68px, 20vw, 120px)" />
            </div>
          ))}
        </div>

        {/* Desktop / tablet list: base 12 */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 md:gap-5">
          {baseListed.map((c, i) => (
            <div
              key={`d-${c.name}-${i}`}
              className="rounded-2xl border border-black/10 bg-white px-3 py-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              title={c.name}
            >
              <ClientBadge name={c.name} src={c.src} variant="bare" size="clamp(100px, 12vw, 160px)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
