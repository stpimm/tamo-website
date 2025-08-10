import { useEffect, useState, useCallback } from "react";
import logo from "../assets/tamo-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll that respects the snap container
  const smoothTo = useCallback((hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // keep the URL hash in sync without jumping
    history.replaceState(null, "", hash);
  }, []);

  const links = [
    { href: "#story", label: "About" },
    { href: "#clients", label: "Clients" },
    { href: "#services", label: "Services" },
    { href: "#partners", label: "Partners" },
    { href: "#contact", label: "Contact", primary: true },
  ];

  return (
    <header className="fixed left-0 right-0 top-3 z-50 flex justify-center">
      <nav
        className={`flex items-center gap-6 rounded-2xl backdrop-blur-xl px-4 sm:px-5 py-2.5 shadow-sm ring-1 transition-colors
        ${scrolled ? "bg-white/45 ring-black/10" : "bg-white/40 ring-black/10"}`}
        style={{ width: "min(920px, 92vw)" }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            smoothTo("#hero");
          }}
          className="shrink-0 inline-flex items-center"
          aria-label="Go to top"
        >
          <img src={logo} alt="TAMO Teknologi Indonesia" className="h-8 w-auto object-contain" />
        </a>

        <div className="ml-auto hidden md:flex items-center gap-5">
          {links.map(({ href, label, primary }) =>
            primary ? (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothTo(href);
                }}
                className="btn-primary inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium"
              >
                {label}
              </a>
            ) : (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothTo(href);
                }}
                className="text-sm text-ink-900/80 hover:text-ink-900 transition-colors"
              >
                {label}
              </a>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
