// src/components/Clients.jsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// public/clients/... + base-aware URL
const clientUrl = (file) => `${import.meta.env.BASE_URL}clients/${file}`;

function ClientBadge({
  name,
  src,
  size = 96,
  className = "",
  variant = "card",
  loading = "lazy",
}) {
  const [ok, setOk] = useState(Boolean(src));
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
  const dim = typeof size === "number" ? `${size}px` : size;

  if (variant === "bare") {
    return ok && src ? (
      <img
        src={src}
        alt={name}
        loading={loading}
        className={`object-contain ${className}`}
        style={{ width: dim, height: dim }}
        onError={() => setOk(false)}
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
          src={src}
          alt={name}
          loading={loading}
          className="w-4/5 h-4/5 object-contain"
          onError={() => setOk(false)}
          decoding="async"
        />
      ) : (
        <span className="text-sm font-semibold text-ink-900">{initials}</span>
      )}
    </div>
  );
}

/* deterministic PRNG so each logo has a stable path */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Seamless floating with VARIED closed paths per item:
 * - Circle clockwise / counter-clockwise
 * - Lissajous figure-eights (2:1 and 1:2)
 * - Rounded-rectangle loop (then rotated)
 * All with identical start/end, linear timing, GPU transforms.
 */
function useFloat(seed, dxBase = 26, dyBase = 20, durBase = 22) {
  return useMemo(() => {
    const rnd = mulberry32(seed);

    // amplitudes & speed
    const ax = dxBase * (0.7 + rnd() * 0.6);
    const ay = dyBase * (0.7 + rnd() * 0.6);
    const spin = 0.3 + rnd() * 0.6; // element tilt
    const duration = durBase * (1.1 + rnd() * 0.8);
    const delay = rnd() * 0.6;

    // path selector
    const shape = Math.floor(rnd() * 5); // 0..4
    const steps = 9; // more steps == smoother
    const TWO_PI = Math.PI * 2;
    const phase = rnd() * TWO_PI; // phase offset
    const orient = rnd() * TWO_PI; // rotate whole path

    const xs = [];
    const ys = [];

    // helper: rotate (x,y) by orient angle
    const rot = (x, y) => {
      const c = Math.cos(orient), s = Math.sin(orient);
      return [x * c - y * s, x * s + y * c];
    };

    for (let i = 0; i < steps; i++) {
      const t = (i / (steps - 1)) * TWO_PI; // include end==start
      let x = 0, y = 0;

      switch (shape) {
        case 0: { // circle CW
          x = ax * Math.cos(t + phase);
          y = ay * Math.sin(t + phase);
          break;
        }
        case 1: { // circle CCW
          x = ax * Math.cos(-(t + phase));
          y = ay * Math.sin(-(t + phase));
          break;
        }
        case 2: { // figure-eight (2:1)
          x = ax * Math.sin(2 * (t + phase));
          y = ay * Math.sin(t + phase);
          break;
        }
        case 3: { // figure-eight (1:2)
          x = ax * Math.sin(t + phase);
          y = ay * Math.sin(2 * (t + phase));
          break;
        }
        default: { // rounded-rectangle loop (soft diamond)
          // piecewise but still closed; then rotate by phase to vary
          const u = (t + phase) % TWO_PI;
          const A = ax, B = ay;
          if (u < Math.PI / 2) {          // right/up
            x = A * (u / (Math.PI / 2));
            y = B * (u / (Math.PI / 2));
          } else if (u < Math.PI) {       // left/up
            const v = (u - Math.PI / 2) / (Math.PI / 2);
            x = A * (1 - 2 * v);
            y = B * (1 - 0.2 * v);
          } else if (u < (3 * Math.PI) / 2) { // left/down
            const v = (u - Math.PI) / (Math.PI / 2);
            x = -A * (v);
            y = -B * (0.8 + 0.2 * v);
          } else {                         // right/down
            const v = (u - (3 * Math.PI) / 2) / (Math.PI / 2);
            x = -A * (1 - v);
            y = -B * (1 - v);
          }
        }
      }

      const [rx, ry] = rot(x, y);
      xs.push(rx);
      ys.push(ry);
    }

    const times = Array.from({ length: steps }, (_, i) => i / (steps - 1));
    const r = [0, spin, 0, -spin, 0, spin * 0.6, 0, -spin * 0.6, 0]; // same length as steps

    return {
      initial: { x: 0, y: 0, rotate: 0 },
      animate: { x: xs, y: ys, rotate: r },
      transition: {
        duration,
        times,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        delay,
      },
    };
  }, [seed, dxBase, dyBase, durBase]);
}

export default function Clients() {
  // desktop/tablet floats (8)
  const floating = [
    { name: "Adidas",                file: "adidas-seeklogo.png" },
    { name: "Honda",                 file: "honda.png" },
    { name: "EF Education First",    file: "english-first.png" },
    { name: "RSM",                   file: "rsm.png" },
    { name: "Textile One Indonesia", file: "textile-one-indonesia.png" },
    { name: "Medco Energi",          file: "medco-energi.png" },
    { name: "Indika Energy",         file: "indika-energy.webp" },
    { name: "Dexa Group",            file: "dexa-group.png" },
  ];

  // mobile floats (4)
  const mobileFloats = [
    { name: "Adidas",                file: "adidas-seeklogo.png" },
    { name: "Honda",                 file: "honda.png" },
    { name: "EF Education First",    file: "english-first.png" },
    { name: "Textile One Indonesia", file: "textile-one-indonesia.png" },
  ];

  // base list (12)
  const baseListed = [
    { name: "Bhimasena Power",       file: "bhimasena-power.png" },
    { name: "Bhumi Jati",            file: "bhumi-jati.png" },
    { name: "Bhumi Jepara",          file: "bhumi-jepara.png" },
    { name: "HLI Green Power",       file: "hli-green-power.png" },
    { name: "Makarintara",           file: "makarin-tara.png" },
    { name: "Padang Karunia",        file: "padang-karunia.png" },
    { name: "PVS",                   file: "pvs.webp" },
    { name: "Soemadipradia Taher",   file: "soemadipradia-taher.png" },
    { name: "Sunstar",               file: "sunstar.png" },
    { name: "Bank BSI",              file: "bank-bsi.png" },
    { name: "TIB Power Services",    file: "tib-power-services.png" },
    { name: "Tripatra",              file: "tripatra.png" },
  ];

  // the 4 moved to list on mobile
  const movedForMobile = [
    { name: "RSM",           file: "rsm.png" },
    { name: "Medco Energi",  file: "medco-energi.png" },
    { name: "Indika Energy", file: "indika-energy.webp" },
    { name: "Dexa Group",    file: "dexa-group.png" },
  ];
  const mobileListed = [...movedForMobile, ...baseListed];

  const F = Array.from({ length: 8 }, (_, i) => useFloat(100 + i));
  const M = Array.from({ length: 4 }, (_, i) => useFloat(300 + i, 14, 12, 26));

  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14 w-full">
        <div className="relative min-h-[420px] md:min-h-[620px]">
          {/* Center heading */}
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
            <motion.div className="absolute left-[6%] top-[58%] transform-gpu will-change-transform" {...M[0]}>
              <ClientBadge name={mobileFloats[0].name} src={clientUrl(mobileFloats[0].file)} size={80} loading="eager" />
            </motion.div>
            <motion.div className="absolute right-[6%] top-[56%] transform-gpu will-change-transform" {...M[1]}>
              <ClientBadge name={mobileFloats[1].name} src={clientUrl(mobileFloats[1].file)} size={80} loading="eager" />
            </motion.div>
            <motion.div className="absolute left-[18%] bottom-[10%] transform-gpu will-change-transform" {...M[2]}>
              <ClientBadge name={mobileFloats[2].name} src={clientUrl(mobileFloats[2].file)} size={80} loading="eager" />
            </motion.div>
            <motion.div className="absolute right-[16%] bottom-[12%] transform-gpu will-change-transform" {...M[3]}>
              <ClientBadge name={mobileFloats[3].name} src={clientUrl(mobileFloats[3].file)} size={80} loading="eager" />
            </motion.div>
          </div>

          {/* Desktop/tablet floats (8) */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <motion.div className="absolute left-[6%] top-[8%] transform-gpu will-change-transform" {...F[0]}>
              <ClientBadge name={floating[0].name} src={clientUrl(floating[0].file)} size={128} loading="eager" />
            </motion.div>
            <motion.div className="absolute left-[27%] top-[6%] transform-gpu will-change-transform" {...F[1]}>
              <ClientBadge name={floating[1].name} src={clientUrl(floating[1].file)} size={126} loading="eager" />
            </motion.div>
            <motion.div className="absolute right-[30%] top-[10%] transform-gpu will-change-transform" {...F[2]}>
              <ClientBadge name={floating[2].name} src={clientUrl(floating[2].file)} size={122} loading="eager" />
            </motion.div>
            <motion.div className="absolute right-[8%] top-[6%] transform-gpu will-change-transform" {...F[3]}>
              <ClientBadge name={floating[3].name} src={clientUrl(floating[3].file)} size={122} loading="eager" />
            </motion.div>
            <motion.div className="absolute left-[10%] top-[48%] transform-gpu will-change-transform" {...F[4]}>
              <ClientBadge name={floating[4].name} src={clientUrl(floating[4].file)} size={124} loading="eager" />
            </motion.div>
            <motion.div className="absolute right-[12%] top-[44%] transform-gpu will-change-transform" {...F[5]}>
              <ClientBadge name={floating[5].name} src={clientUrl(floating[5].file)} size={122} loading="eager" />
            </motion.div>
            <motion.div className="absolute left-[28%] bottom-[6%] transform-gpu will-change-transform" {...F[6]}>
              <ClientBadge name={floating[6].name} src={clientUrl(floating[6].file)} size={126} loading="eager" />
            </motion.div>
            <motion.div className="absolute right-[28%] bottom-[8%] transform-gpu will-change-transform" {...F[7]}>
              <ClientBadge name={floating[7].name} src={clientUrl(floating[7].file)} size={126} loading="eager" />
            </motion.div>
          </div>
        </div>

        {/* label */}
        <div className="mt-7 md:mt-12 mb-2 md:mb-3">
          <p className="text-xs md:text-sm uppercase tracking-wide text-ink-700">
            More clients we’ve supported
          </p>
        </div>

        {/* Mobile list */}
        <div className="md:hidden grid grid-cols-2 gap-2.5 sm:gap-3">
          {mobileListed.map((c) => (
            <div
              key={`m-${c.name}`}
              className="rounded-xl border border-black/10 bg-white px-2.5 py-3 flex items-center justify-center shadow-sm"
              title={c.name}
            >
              <ClientBadge name={c.name} src={clientUrl(c.file)} variant="bare" size="clamp(68px, 20vw, 120px)" />
            </div>
          ))}
        </div>

        {/* Desktop/tablet list */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 md:gap-5">
          {baseListed.map((c) => (
            <div
              key={`d-${c.name}`}
              className="rounded-2xl border border-black/10 bg-white px-3 py-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              title={c.name}
            >
              <ClientBadge name={c.name} src={clientUrl(c.file)} variant="bare" size="clamp(100px, 12vw, 160px)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
