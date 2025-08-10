import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-start min-h-screen flex items-center bg-white relative overflow-hidden"
    >
      {/* GRID BACKDROP (faded) */}
      <div className="absolute inset-0 bg-grid grid-fade pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-16 w-full grid md:grid-cols-2 gap-8 md:gap-10">
        {/* Left: copy */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-5 md:mb-6"
          >
            Get in Touch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Tighter spacing */}
            <div className="text-xl md:text-2xl font-semibold tracking-tight leading-tight mb-2">
              PT TAMO TEKNOLOGI INDONESIA
            </div>

            <p className="text-lg md:text-xl text-ink-900 leading-snug mb-3">
              Komplek Grand Ruko, Ruko Jl. Raya Rw. Bambu No.88w, Pasar Minggu,
              <br className="hidden md:block" />
              South Jakarta City, Jakarta 12520
            </p>

            <div className="text-lg md:text-xl leading-snug space-y-1.5">
              <div>
                <span className="text-ink-700">Email:</span>{" "}
                <a href="mailto:info@tamo.co.id" className="text-[#16a085] hover:underline">
                  info@tamo.co.id
                </a>
              </div>
              <div>
                <span className="text-ink-700">Phone:</span>{" "}
                <a href="tel:+622122798811" className="text-[#16a085]">
                  (021) 22798811
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://maps.app.goo.gl/TKiKH5yR3uNA1qMZA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-medium shadow-sm bg-[#16a085] text-white hover:opacity-95 transition"
              >
                Open in Google Maps
              </a>

              <a
                href="mailto:info@tamo.co.id"
                className="inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-medium bg-white text-ink-900 shadow-sm ring-1 ring-black/10 hover:ring-black/20 transition"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: embedded map */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl overflow-hidden ring-1 ring-black/10 h-[360px] md:h-[460px] bg-white"
        >
          <iframe
            title="PT Tamo Teknologi Indonesia — Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.153871409307!2d106.82610367604336!3d-6.2445807612210205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed1f7a4a3c2f%3A0x3cc652e0e5d673e8!2sPT.%20Tamo%20Teknologi%20Indonesia!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
