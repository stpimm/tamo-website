import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Minimal set of "above-the-fold" images to warm up.
// (BASE_URL makes these work both locally and on GitHub Pages)
const B = import.meta.env.BASE_URL;
const CRITICAL_IMAGES = [
  // Floating clients (first row shows fastest)
  `${B}clients/adidas-seeklogo.png`,
  `${B}clients/honda.png`,
  `${B}clients/english-first.png`,
  `${B}clients/textile-one-indonesia.png`,
  // A few partner logos so the first marquee looks ready
  `${B}partners/network-security/cisco.png`,
  `${B}partners/network-security/fortinet.png`,
  `${B}partners/software/microsoft.png`,
  `${B}partners/software/adobe.png`,
];

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });
}

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.documentElement.classList.add("overflow-hidden");

    const onWindowLoad = () => setDone(true);

    // Wait for critical images OR a 4s cap,
    // then also wait for the window "load" if it hasn't happened yet.
    const kickoff = Promise.race([
      Promise.all(CRITICAL_IMAGES.map(preload)),
      new Promise((r) => setTimeout(r, 4000)),
    ]);

    kickoff.then(() => {
      if (document.readyState === "complete") {
        setDone(true);
      } else {
        window.addEventListener("load", onWindowLoad, { once: true });
      }
    });

    return () => {
      window.removeEventListener("load", onWindowLoad);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm text-ink-700/80">Loading…</div>
            <div className="h-1.5 w-40 rounded-full bg-black/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#16a085]"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
