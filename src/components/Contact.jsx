import { motion } from "framer-motion";

const ADDRESS_LINE_1 =
  "Komplek Grand Ruko, Ruko Jl. Raya Rw. Bambu No.88w, Pasar Minggu";
const ADDRESS_LINE_2 = "South Jakarta City, Jakarta 12520";

const EMAIL = "info@tamo.co.id";
const PHONE_DISPLAY = "(021) 22798811";
const PHONE_TEL = "02122798811";

// This URL style reliably shows the red pin without an API key.
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(
    `PT TAMO TEKNOLOGI INDONESIA, ${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`
  ) +
  "&z=16&output=embed";

const MAP_LINK_URL =
  "https://maps.google.com/?q=" +
  encodeURIComponent(
    `PT TAMO TEKNOLOGI INDONESIA, ${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`
  );

export default function Contact() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-16 w-full">
      {/* two columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: text + actions */}
        <div className="md:max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="section-title mb-4"
          >
            Get in Touch
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-xl md:text-2xl font-semibold text-ink-900"
          >
            PT TAMO TEKNOLOGI INDONESIA
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="mt-3 space-y-1.5 text-ink-900"
          >
            <p className="text-base md:text-lg">{ADDRESS_LINE_1}</p>
            <p className="text-base md:text-lg">{ADDRESS_LINE_2}</p>

            <p className="mt-3 text-base md:text-lg">
              Email:{" "}
              <a href={`mailto:${EMAIL}`} className="underline decoration-ink-900/30">
                {EMAIL}
              </a>
            </p>
            <p className="text-base md:text-lg">
              Phone:{" "}
              <a href={`tel:${PHONE_TEL}`} className="underline decoration-ink-900/30">
                {PHONE_DISPLAY}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.25, delay: 0.12 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href={MAP_LINK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-2xl bg-[#16a085] text-white px-5 py-3 font-medium shadow-sm hover:opacity-95 transition"
            >
              Open in Google Maps
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-2xl bg-white text-ink-900 px-5 py-3 font-medium ring-1 ring-black/10 shadow-sm hover:shadow transition"
            >
              Email Us
            </a>
          </motion.div>
        </div>

        {/* Right: map with visible red pin */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="w-full"
        >
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-sm bg-white">
            <iframe
              key={MAP_EMBED_URL}
              title="PT TAMO TEKNOLOGI INDONESIA - Google Map"
              src={MAP_EMBED_URL}
              className="w-full h-[340px] md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
