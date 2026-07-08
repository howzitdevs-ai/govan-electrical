import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logo from "../images/GOVANELECTRICAL logo.png";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import { LeadFormProvider, useLeadForm } from "@/contexts/LeadFormContext";
import { LeadFormModal } from "@/components/LeadFormModal";

// ─── Color palette (Govan Electrical brand colors) ──────────────────────────
const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";
const ORANGE_DARK = "#B8860B";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { 
    label: "Services", 
    href: "/#services",
    dropdown: [
      { label: "Services Overview", href: "/#services" },
      { label: "Solar Solutions", href: "/solar-solutions" },
      { label: "Electrical Solutions", href: "/electrical-solutions" },
      { label: "Diesel Delivery", href: "/diesel-delivery" },
    ]
  },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#contact" },
];

function TopBar() {
  return (
    <div
      className="w-full py-2 text-sm"
      style={{ backgroundColor: ORANGE, color: NAVY }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 font-bold tracking-wide">
        <a
          href="tel:+27120233410"
          className="flex items-center gap-2 hover:opacity-70 transition"
        >
          <Phone size={15} strokeWidth={2.5} />
          <span>012 023 3410</span>
        </a>
        <a
          href="tel:+27711863732"
          className="flex items-center gap-2 hover:opacity-70 transition"
        >
          <Phone size={15} strokeWidth={2.5} />
          <span>071 186 3732</span>
        </a>
        <a
          href="mailto:Admin@govanelectrical.co.za"
          className="items-center gap-2 hover:opacity-70 transition hidden md:flex"
        >
          <Mail size={15} strokeWidth={2.5} />
          <span>Admin@govanelectrical.co.za</span>
        </a>
        <span className="items-center gap-2 hidden lg:flex">
          <MapPin size={15} strokeWidth={2.5} />
          <span>Unit 02, 1 Kambathi Street, N4 Gateway Industrial park, Willow Park</span>
        </span>
      </div>
    </div>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When already on home page, clicking /#hash doesn't change location,
  // so we scroll directly instead of relying on the Layout effect.
  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.substring(2);
      if (location === "/") {
        scrollToId(id);
        setOpen(false);
        return true;
      }
    }
    return false;
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white transition-shadow"
      style={{ boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.12)" : "none", borderBottom: `1px solid #eee` }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="GOVAN ELECTRICAL" className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0" />
            <div className="flex flex-col items-start text-left">
              <p className="font-extrabold text-base sm:text-lg md:text-2xl leading-tight tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span style={{ color: "#E3C242" }}>GOVAN</span><span style={{ color: "#3A3A3A" }}>ELECTRICAL</span>
              </p>
              <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase mt-0.5 whitespace-nowrap" style={{ color: "#555555" }}>Maintenance &amp; Installations</p>
            </div>
          </a>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = l.href === "/" ? location === "/" : location.startsWith(l.href.replace("/#", "/"));
            return (
              <li key={l.label} className="relative group">
                {l.dropdown ? (
                  <div className="px-3 py-5 cursor-pointer flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors" style={{ color: NAVY, fontFamily: "Roboto, sans-serif" }}>
                    <span
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ORANGE_DARK)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = NAVY)}
                    >
                      {l.label}
                    </span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden">
                      {l.dropdown.map((drop) => (
                        <Link key={drop.label} href={drop.href}>
                          <a
                            className="px-4 py-3 text-sm font-semibold hover:bg-yellow-50 transition-colors"
                            style={{ color: NAVY }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ORANGE_DARK)}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = NAVY)}
                            onClick={(e) => { if (handleNavClick(drop.href)) e.preventDefault(); }}
                          >
                            {drop.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={l.href}>
                    <a
                      className="px-3 py-5 block text-sm font-semibold uppercase tracking-wide transition-colors relative"
                      style={{ color: isActive ? ORANGE_DARK : NAVY, fontFamily: "Roboto, sans-serif" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ORANGE_DARK)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isActive ? ORANGE_DARK : NAVY)}
                      onClick={(e) => { if (handleNavClick(l.href)) e.preventDefault(); }}
                    >
                      {l.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ backgroundColor: ORANGE }} />
                      )}
                    </a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openLeadForm()}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded transition"
            style={{ backgroundColor: ORANGE, color: NAVY }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ORANGE_DARK; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ORANGE; (e.currentTarget as HTMLElement).style.color = NAVY; }}
          >
            <Phone size={14} /> Get a Quote
          </button>
          <button
            className="lg:hidden p-2 rounded"
            style={{ color: NAVY }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          {NAV_LINKS.map((l) => {
            const isActive = l.href === "/" ? location === "/" : location.startsWith(l.href.replace("/#", "/"));
            return (
              <div key={l.label}>
                {l.dropdown ? (
                  <>
                    <div className="block px-4 py-3 text-xs font-bold bg-gray-50 rounded mt-2 uppercase tracking-widest" style={{ color: ORANGE_DARK }}>
                      {l.label}
                    </div>
                    <div className="pl-4 space-y-1 mt-1 border-l-2 ml-4" style={{ borderColor: ORANGE }}>
                      {l.dropdown.map((drop) => (
                        <Link key={drop.label} href={drop.href}>
                          <a
                            className="block px-4 py-2.5 text-sm font-semibold rounded hover:bg-yellow-50 transition-colors"
                            style={{ color: NAVY }}
                            onClick={(e) => { if (handleNavClick(drop.href)) e.preventDefault(); else setOpen(false); }}
                          >
                            {drop.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={l.href}>
                    <a
                      className="flex items-center justify-between px-4 py-3 text-sm font-semibold rounded hover:bg-yellow-50 transition-colors"
                      style={{ color: isActive ? ORANGE_DARK : NAVY, borderLeft: isActive ? `3px solid ${ORANGE}` : "3px solid transparent" }}
                      onClick={(e) => { if (handleNavClick(l.href)) e.preventDefault(); else setOpen(false); }}
                    >
                      {l.label}
                      {isActive && <span className="text-xs font-bold" style={{ color: ORANGE }}>●</span>}
                    </a>
                  </Link>
                )}
              </div>
            );
          })}
          <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
            <a
              href="tel:+27120233410"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded hover:bg-gray-50 transition-colors"
              style={{ color: NAVY }}
              onClick={() => setOpen(false)}
            >
              <Phone size={16} style={{ color: ORANGE_DARK }} /> 012 023 3410
            </a>
            <button
              className="w-full px-4 py-3 text-sm font-bold text-center rounded"
              style={{ backgroundColor: ORANGE, color: NAVY }}
              onClick={() => { setOpen(false); openLeadForm(); }}
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const [location] = useLocation();

  const handleFooterClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#") && location === "/") {
      e.preventDefault();
      scrollToId(href.substring(2));
    }
  };

  return (
    <footer className="text-white" style={{ backgroundColor: NAVY }}>
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <img src={logo} alt="GOVAN ELECTRICAL" className="h-10 sm:h-12 w-auto object-contain bg-white p-1 rounded shrink-0" />
              <div className="flex flex-col items-start text-left">
                <p className="font-extrabold text-base sm:text-lg md:text-xl leading-tight tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <span style={{ color: "#E3C242" }}>GOVAN</span><span style={{ color: "#FFFFFF" }}>ELECTRICAL</span>
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase mt-0.5 opacity-80 whitespace-nowrap" style={{ color: "#FFFFFF" }}>Maintenance &amp; Installations</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Professional electrical maintenance and installations for residential, commercial and industrial clients.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: ORANGE }}>
              Services
            </h4>
            <ul className="space-y-2 text-sm opacity-75">
              {[
                { label: "Electrical Installations", href: "/electrical-solutions" },
                { label: "Solar & Backup Power", href: "/solar-solutions" },
                { label: "Diesel Delivery", href: "/diesel-delivery" },
                { label: "Maintenance & Repairs", href: "/#services" },
                { label: "Industrial Electrical", href: "/#services" },
              ].map((s) => (
                <li key={s.label}>
                  <Link href={s.href}>
                    <a className="hover:opacity-100 transition hover:text-orange-400" onClick={(e) => handleFooterClick(s.href, e)}>{s.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: ORANGE }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm opacity-75">
              {NAV_LINKS.filter(l => !l.dropdown).map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <a className="hover:opacity-100 transition hover:text-orange-400" onClick={(e) => handleFooterClick(l.href, e)}>{l.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: ORANGE }}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm opacity-75">
              <li>
                <a href="tel:+27120233410" className="flex items-center gap-2 hover:text-orange-400 transition">
                  <Phone size={14} /> 012 023 3410
                </a>
              </li>
              <li>
                <a href="tel:+27711863732" className="flex items-center gap-2 hover:text-orange-400 transition">
                  <Phone size={14} /> 071 186 3732
                </a>
              </li>
              <li>
                <a href="mailto:Admin@govanelectrical.co.za" className="flex items-center gap-2 hover:text-orange-400 transition">
                  <Mail size={14} /> Admin@govanelectrical.co.za
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <span>Unit 02, 1 Kambathi Street, N4 Gateway Industrial park, Willow Park</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>Copyright © 2026 | Govan Electrical. All rights reserved.</p>
          <p>Designed ⚡ by <a href="https://www.aluwanienterprise.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Aluwani Enterprise</a></p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky Mobile CTA Bar ──────────────────────────────────────────────────
function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden grid grid-cols-2 shadow-2xl"
      style={{ borderTop: "2px solid #FFD700" }}
    >
      <a
        href="tel:+27120233410"
        className="flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wide"
        style={{ backgroundColor: NAVY, color: ORANGE }}
        aria-label="Call Govan Electrical"
      >
        <Phone size={18} fill="currentColor" /> Call Now
      </a>
      <a
        href="https://wa.me/27711863732"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wide text-white"
        style={{ backgroundColor: "#25D366" }}
        aria-label="WhatsApp Govan Electrical"
      >
        <MessageCircle size={18} /> WhatsApp
      </a>
    </div>
  );
}

// ─── Back to Top Button ──────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ backgroundColor: ORANGE, color: NAVY, focusRingColor: ORANGE } as React.CSSProperties}
      aria-label="Scroll back to top"
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Scroll to hash after page navigation (e.g. /solar-packages → /#contact)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      // Retry up to 3 times — content may not be painted yet
      const attempt = (delay: number) => setTimeout(() => scrollToId(id), delay);
      const t1 = attempt(100);
      const t2 = attempt(350);
      const t3 = attempt(700);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  // Handle hash changes when already on the same page (hashchange fires,
  // but wouter location doesn't change, so the effect above won't re-run)
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.substring(1);
      if (id) scrollToId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <LeadFormProvider>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        {/* pb-16 on mobile creates space above the sticky CTA bar */}
        <main className="flex-grow pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <BackToTop />
        <LeadFormModal />
      </div>
    </LeadFormProvider>
  );
}
