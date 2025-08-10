import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const logo = (p) => new URL(p, import.meta.url).href;

/** Seamless marquee row with consistent spacing (gap) including the seam */
function MarqueeRow({
  paths,
  reverse = false,
  speed = 22,
  gap = "clamp(1.25rem, 3vw, 2.25rem)",
}) {
  const trackRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    if (!stripRef.current || !trackRef.current) return;
    const el = stripRef.current;
    const track = trackRef.current;

    const update = () => {
      const w = Math.ceil(el.getBoundingClientRect().width);
      track.style.setProperty("--loop", `${w}px`);
      const seconds = Math.max(36, w / speed);
      track.style.setProperty("--duration", `${seconds}s`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [paths, speed]);

  return (
    <div
      className="marquee-row marquee-mask py-2 md:py-2.5"
      style={{ ["--logo-gap"]: gap }}
    >
      <div
        ref={trackRef}
        className={`marquee-track ${reverse ? "marquee-reverse" : ""} flex min-w-max`}
        style={{ gap: 0 }}
      >
        <div ref={stripRef} className="flex min-w-max" style={{ gap: "var(--logo-gap)" }}>
          {paths.map((p, i) => {
            const isLast = i === paths.length - 1;
            return (
              <div
                key={`a-${i}`}
                className="logo-slot flex items-center justify-center px-3 md:px-4"
                style={isLast ? { marginRight: "var(--logo-gap)" } : undefined}
              >
                <img
                  src={logo(`../assets/partners/${p}`)}
                  alt={p}
                  className="logo-img w-auto object-contain"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        <div className="flex min-w-max" style={{ gap: "var(--logo-gap)" }} aria-hidden="true">
          {paths.map((p, i) => (
            <div key={`b-${i}`} className="logo-slot flex items-center justify-center px-3 md:px-4">
              <img
                src={logo(`../assets/partners/${p}`)}
                alt=""
                className="logo-img w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const groups = [
  {
    label: "Network & Security",
    items: [
      "network-security/cisco.png",
      "network-security/fortinet.png",
      "network-security/tp-link.png",
      "network-security/hpe-aruba-networking.png",
      "network-security/palo-alto.png",
      "network-security/sangfor.png",
      "network-security/trend-micro.png",
      "network-security/netviel.png",
    ],
  },
  {
    label: "Computer Notebook & Peripheral",
    items: [
      "computer-notebook-peripheral/dell.png",
      "computer-notebook-peripheral/lenovo.png",
      "computer-notebook-peripheral/hp.png",
      "computer-notebook-peripheral/samsung.png",
      "computer-notebook-peripheral/apple.png",
      "computer-notebook-peripheral/asus.png",
      "computer-notebook-peripheral/lg.png",
      "computer-notebook-peripheral/epson.png",
      "computer-notebook-peripheral/logitech.png",
      "computer-notebook-peripheral/sony.png",
      "computer-notebook-peripheral/canon.png",
    ],
  },
  {
    label: "Server & Storage",
    items: [
      "server-storage/dell-emc.png",
      "server-storage/hewlett.png",
      "server-storage/ibm.png",
      "server-storage/fujitsu.png",
      "server-storage/oracle.png",
      "server-storage/net-app.png",
      "server-storage/vmware.png",
      "server-storage/synology.png",
    ],
  },
  {
    label: "Software",
    items: [
      "software/microsoft.png",
      "software/adobe.png",
      "software/foxit.png",
      "software/zoom.png",
      "software/teams.png",
      "software/webex.png",
    ],
  },
];

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

export default function Partners() {
  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-14 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header — tighter spacing between title and subheadline */}
          <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
            <motion.h2 variants={item} className="section-title leading-tight tracking-tight">
              Technology Partners We Build With
            </motion.h2>
            <motion.p
              variants={item}
              className="max-w-4xl text-ink-700 text-lg md:text-xl leading-relaxed"
            >
              We design, supply, and support solutions powered by these leading vendors—choosing
              the right products and licensing to fit your goals, budget, and scale.
            </motion.p>
          </div>

          {/* Categories */}
          <div className="space-y-7 md:space-y-8">
            {groups.map((g, idx) => (
              <motion.div key={g.label} variants={item} className="space-y-2">
                <div className="text-xs uppercase tracking-wide text-ink-700 leading-none">
                  {g.label}
                </div>
                <MarqueeRow
                  paths={g.items}
                  reverse={idx % 2 === 1}
                  speed={22}
                  gap="clamp(1.25rem, 3vw, 2.25rem)"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
