import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// TAMO green (no Tailwind config needed)
const TAMO_GREEN = "#0AA39A";

const services = [
  {
    title: "IT Infrastructure Supply",
    body:
      "Supply the hardware and software computer, network equipment and Operating System (OS), Storage Data Server, Printer, and other related to other Information and Technology System and equipment, such as; Wireless System, Public Address and General Alarm (PAGA) System, FIDS System, CCTV System.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    tile: "#0A0A0A",
  },
  {
    title: "Network Security and Data Protection",
    body:
      "Data security implementation by starting from process input, data traffic in the network to the storage and backup process.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
        <path d="M7 12h10M12 7v10" />
      </svg>
    ),
    tile: TAMO_GREEN,
  },
  {
    title: "IT Consulting and Advisor Service",
    body:
      "Also providing the Professional IT Support and Help Desk team for work at customer office professionally to monitor the network security system and do periodically check to maintain and early problem detection that could be impact to customer Infrastructure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    tile: TAMO_GREEN,
  },
  {
    title: "Manage IT Service",
    body:
      "Providing services to users end in managing, developing and take advantage of Information Technology. Maximizing the Infrastructure function shall be able to reducing costs and growth the improvement services to be better.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14.7 6.3a4 4 0 0 0-5.66 5.66l8.49 8.49a2 2 0 0 0 2.83-2.83l-8.49-8.49z" />
        <path d="M16 2v6M19 5h-6" />
      </svg>
    ),
    tile: "#0A0A0A",
  },
];

export default function Services() {
  return (
    <div className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-12 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-5 md:space-y-6"
        >
          <motion.h2 variants={item} className="section-title text-2xl md:text-3xl">
            What We Do
          </motion.h2>

          {/* Smaller cards, tighter grid & spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {services.map((s) => (
              <motion.article
                key={s.title}
                variants={item}
                className="rounded-xl bg-white ring-1 ring-black/10 shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Smaller icon tile */}
                  <div
                    className="shrink-0 rounded-lg flex items-center justify-center"
                    style={{ width: 64, height: 64, background: s.tile }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>

                  {/* More compact typography */}
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-[15px] leading-6 text-ink-900/90">
                      {s.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
