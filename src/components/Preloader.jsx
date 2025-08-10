import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clientLogos, partnerLogos } from "../data/assetsManifest";

const B = import.meta.env.BASE_URL;

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
    document.documentElement.classList.add("overflow-hidden");

    const allPaths = [
      ...clientLogos.map((f) => `${B}clients/${f}`),
      ...partnerLogos.map((f) => `${B}partners/${f}`),
      `${B}tamo-logo.png`, // if you have it in /public
    ];
    // Dedupe in case of repeats
    const images = Array.from(new Set(allPaths));

    const onWindowLoad = () => setDone(true);

    const kickoff = Promise.race([
      Promise.all(images.map(preload)), // wait for ALL logos
      new Promise((r) => setTimeout(r, 10000)), // hard cap 10s
    ]);

    kickoff.then(() => {
      if (document.readyState === "complete") setDone(true);
      else window.addEventListener("load", onWindowLoad, { once: true });
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm text-ink-700/80">Loading assets…</div>
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
