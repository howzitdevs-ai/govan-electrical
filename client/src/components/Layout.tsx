import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logo from "../images/GOVANELECTRICAL logo.png";
import {
  Phone,
  Mail,
  MapPin,
  Zap,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

// ─── Color palette (Govan Electrical brand colors) ──────────────────────────
const NAVY = "#1A1A1A";      // Black (primary dark)
const ORANGE = "#FFD700";    // Yellow (primary brand)
const ORANGE_DARK = "#B8860B"; // Dark gold for text on light backgrounds
const GREEN = "#333333";     // Dark gray (secondary dark)

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
  { label: "Testimonials", href: "/#testimonials" },
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

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {NAV_LINKS.map((l) => (
            <li key={l.label} className="relative group">
              {l.dropdown ? (
                <div className="px-3 py-5 cursor-pointer flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-orange-500" style={{ color: NAVY, fontFamily: "Roboto, sans-serif" }}>
                  <span
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ORANGE)}
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
                          className="px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
                          style={{ color: NAVY }}
                          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ORANGE_DARK)}
                          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = NAVY)}
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
                    className="px-3 py-5 block text-sm font-semibold uppercase tracking-wide transition-colors hover:text-orange-500"
                    style={{ color: NAVY, fontFamily: "Roboto, sans-serif" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ORANGE)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = NAVY)}
                  >
                    {l.label}
                  </a>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link href="/#contact">
            <a
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded transition"
              style={{ backgroundColor: ORANGE }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = GREEN)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ORANGE)}
            >
              <Phone size={14} /> Get a Quote
            </a>
          </Link>
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
          {NAV_LINKS.map((l) => (
            <div key={l.label}>
              {l.dropdown ? (
                <>
                  <div className="block px-4 py-3 text-sm font-bold bg-gray-50 rounded mt-2" style={{ color: NAVY }}>
                    {l.label}
                  </div>
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-gray-100 ml-4">
                    {l.dropdown.map((drop) => (
                      <Link key={drop.label} href={drop.href}>
                        <a
                          className="block px-4 py-2 text-sm font-semibold rounded hover:bg-gray-50"
                          style={{ color: NAVY }}
                          onClick={() => setOpen(false)}
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
                    className="block px-4 py-3 text-sm font-semibold rounded hover:bg-gray-50"
                    style={{ color: NAVY }}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </Link>
              )}
            </div>
          ))}
          <Link href="/#contact">
            <a
              className="block mt-4 px-4 py-3 text-sm font-bold text-white text-center rounded"
              style={{ backgroundColor: ORANGE }}
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: NAVY }}>
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
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
                    <a className="hover:opacity-100 transition hover:text-orange-400">{s.label}</a>
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
                    <a className="hover:opacity-100 transition hover:text-orange-400">{l.label}</a>
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

export function Layout({ children }: { children: React.ReactNode }) {
  // Scroll to hash on mount and when location changes
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
