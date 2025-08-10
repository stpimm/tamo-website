import { motion } from "framer-motion";

export default function Contact() {
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

  const address =
    "Komplek Grand Ruko, Ruko Jl. Raya Rw. Bambu No.88w, Pasar Minggu, South Jakarta City, Jakarta 12520";
  const mapsEmbed =
    "https://www.google.com/maps?q=PT%20TAMO%20TEKNOLOGI%20INDONESIA%20" +
    encodeURIComponent(address) +
    "&output=embed";

  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-14 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center"
        >
          {/* Left: copy + actions */}
          <div className="space-y-4 md:space-y-5">
            <motion.h2 variants={item} className="section-title leading-[1.1]">
              Get in Touch
            </motion.h2>

            <motion.div
              variants={item}
              className="space-y-1.5 md:space-y-2 text-base md:text-lg leading-7 md:leading-8"
            >
              <h3 className="font-semibold tracking-wide text-lg md:text-xl">
                PT TAMO TEKNOLOGI INDONESIA
              </h3>

              <p className="text-ink-900/90">{address}</p>

              <p>
                <span className="text-ink-700">Email:</span>{" "}
                <a
                  href="mailto:info@tamo.co.id"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  info@tamo.co.id
                </a>
              </p>

              <p>
                <span className="text-ink-700">Phone:</span>{" "}
                <a
                  href="tel:+622122798811"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  (021) 22798811
                </a>
              </p>
            </motion.div>

            <motion.div variants={item} className="pt-1 flex flex-wrap gap-3 md:gap-4">
              <a
                href="https://maps.app.goo.gl/TKiKH5yR3uNA1qMZA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-medium shadow-sm"
              >
                Open in Google Maps
              </a>

              <a
                href="mailto:info@tamo.co.id?subject=Hello%20TAMO"
                className="inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-medium bg-white text-ink-900 shadow-sm ring-1 ring-black/10 hover:bg-white hover:ring-black/20 transition-colors"
              >
                Email Us
              </a>
            </motion.div>
          </div>

          {/* Right: embedded Google Map */}
          <motion.div variants={item} className="w-full">
            <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-black/10 bg-white">
              {/* 16:10 aspect without plugin */}
              <div className="pb-[62.5%]" />
              <iframe
                title="PT TAMO TEKNOLOGI INDONESIA — Google Map"
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
