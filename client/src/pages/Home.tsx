import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import {
  Phone,
  Mail,
  MapPin,
  Zap,
  Wrench,
  Shield,
  Star,
  ChevronDown,
  Sun,
  Settings,
  CheckCircle,
  Award,
  Users,
  Clock,
  Handshake,
  MessageCircle,
  Calculator,
  MapPinned,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLeadForm } from "@/contexts/LeadFormContext";
import panelsBg from "@/images/panels-electricity-order-sunlight.png";
import aboutImg from "@/images/imh.jpeg";

// ─── Color palette (Govan Electrical brand colors) ──────────────────────────
const NAVY = "#1A1A1A";      // Black (primary dark)
const ORANGE = "#FFD700";    // Yellow (primary brand)
const ORANGE_DARK = "#B8860B"; // Dark gold for text on light backgrounds
const GREEN = "#333333";     // Dark gray (secondary dark)
const ACTION_GREEN = "#4CAF50"; // Bright green for specific action buttons (like screenshot)

// ─── Helpers ───────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    heading: "Powering Your Future",
    sub: "Professional electrical maintenance & installations for residential, commercial and industrial clients across South Africa.",
    cta: "Get a Quote",
    ctaHref: "#contact",
  },
  {
    heading: "Expert Electrical Solutions",
    sub: "From solar installations to full electrical upgrades — we deliver safe, reliable and cost-effective services every time.",
    cta: "Our Services",
    ctaHref: "#services",
  },
  {
    heading: "Trusted Since Day One",
    sub: "With a team of qualified professionals, Govan Electrical brings unmatched expertise and quality workmanship to every project.",
    cta: "Learn More",
    ctaHref: "#about",
  },
];

const SERVICES = [
  {
    icon: Zap,
    title: "Electrical Installations",
    desc: "Complete wiring, DB board upgrades, lighting and power installations for new builds and renovations — done safely and to code.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    desc: "Regular maintenance inspections, emergency fault-finding and repairs to keep your electrical systems running safely at all times.",
  },
  {
    icon: Sun,
    title: "Solar & Backup Power",
    desc: "Solar panel systems, inverter installations and battery backup solutions to keep your home or business powered around the clock.",
  },
  {
    icon: Settings,
    title: "Industrial Electrical",
    desc: "Heavy-duty industrial electrical work including motor controls, switchgear, cable management and compliance certificates.",
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    desc: "COC certificates, surge protection, earth leakage installation and safety audits to protect your property and people.",
  },
  {
    icon: CheckCircle,
    title: "Commercial Projects",
    desc: "Turnkey electrical solutions for offices, retail spaces and commercial buildings — on time and within budget.",
  },
];

const STATS = [
  { value: 500, label: "Projects Completed" },
  { value: 12, label: "Years Experience" },
  { value: 300, label: "Happy Clients" },
  { value: 15, label: "Expert Technicians" },
];

const WHY_US = [
  {
    icon: Award,
    title: "Fully Certified",
    desc: "All our electricians hold valid trade certificates and are registered with the relevant regulatory bodies.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    desc: "We respond quickly to emergency callouts and ensure minimal disruption to your home or business.",
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    desc: "We stand behind our work. Every installation and repair comes with a workmanship warranty.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Our team brings years of hands-on experience across residential, commercial and industrial sectors.",
  },
  {
    icon: Shield,
    title: "Safety First",
    desc: "We adhere to SANS standards and never cut corners — your safety is our highest priority.",
  },
  {
    icon: Star,
    title: "Competitive Pricing",
    desc: "Top-quality electrical work at fair, transparent prices with no hidden fees or surprises.",
  },
];


// ─── Components ────────────────────────────────────────────────────────────

const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.govanelectrical.co.za/#business",
    "name": "Govan Electrical",
    "description": "Professional electrical maintenance, solar panel installations and diesel generator solutions for residential, commercial and industrial clients across South Africa.",
    "url": "https://www.govanelectrical.co.za",
    "telephone": "+27120233410",
    "email": "Admin@govanelectrical.co.za",
    "priceRange": "$$",
    "currenciesAccepted": "ZAR",
    "paymentAccepted": "Cash, Bank Transfer, EFT",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 02, 1 Kambathi Street, N4 Gateway Industrial Park",
      "addressLocality": "Willow Park",
      "addressRegion": "Gauteng",
      "postalCode": "0184",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-25.6748",
      "longitude": "28.3975"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "13:00"
      }
    ],
    "hasMap": "https://maps.google.com/?q=-25.6748,28.3975",
    "areaServed": [
      { "@type": "State", "name": "Gauteng" },
      { "@type": "State", "name": "Limpopo" },
      { "@type": "State", "name": "Mpumalanga" },
      { "@type": "State", "name": "North West" },
      { "@type": "State", "name": "Western Cape" },
      { "@type": "State", "name": "KwaZulu-Natal" },
      { "@type": "Country", "name": "South Africa" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electrical & Solar Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Solar Panel Installations", "url": "https://www.govanelectrical.co.za/solar-solutions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Installations & Wiring", "url": "https://www.govanelectrical.co.za/electrical-solutions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diesel Generator Solutions", "url": "https://www.govanelectrical.co.za/diesel-delivery" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DB Board Upgrades & Repairs" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Certificate of Compliance (CoC)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery Backup & Inverter Systems" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fault Finding & Electrical Repairs" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Electrical Contracting" } }
      ]
    }
  }
];

// ─── Main export ───────────────────────────────────────────────────────────
export default function Home() {
  useSEO({
    title: "Govan Electrical | Electricians Pretoria & South Africa | Solar, DB Board, CoC",
    description: "Certified electricians in Pretoria, Gauteng & across South Africa. Solar panel installations, DB board upgrades, CoC certificates, fault finding & diesel generator solutions. 4000+ completed jobs. Call 012 023 3410.",
    keywords: "electricians Pretoria, electricians Gauteng, electricians South Africa, solar panel installation Pretoria, solar panels South Africa, DB board upgrade Pretoria, CoC certificate electrician, fault finding electrician, electrical contractor Gauteng, load shedding solutions, diesel generator South Africa, Govan Electrical",
    canonical: "/",
    schema: HOME_SCHEMA,
  });

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <WhyUsSection />
      <BrandsSection />
      <SavingsCalculatorSection />
      <FAQSection />
      <AreasWeServeSection />
      <ContactSection />
    </Layout>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${panelsBg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center justify-center py-24 md:py-20 md:pb-44 text-center">

        {/* Main Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-2xl max-w-5xl mx-auto"
          style={{ fontFamily: "Montserrat, sans-serif", textShadow: "2px 2px 10px rgba(0,0,0,0.8)" }}
        >
          Leading Provider Of High-Quality Energy Solutions
        </h1>

        {/* Sub Heading */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-8"
          style={{ color: ACTION_GREEN, textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
        >
          How Can We Assist Today?
        </h2>

        {/* 4 Action Buttons */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap justify-center gap-3 mb-8 w-full max-w-4xl mx-auto">
          <Link href="/solar-solutions">
            <a className="block px-5 md:px-8 py-3 md:py-4 text-xs sm:text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity text-center" style={{ backgroundColor: ORANGE }}>
              SOLAR SOLUTIONS
            </a>
          </Link>
          <Link href="/electrical-solutions">
            <a className="block px-5 md:px-8 py-3 md:py-4 text-xs sm:text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity text-center" style={{ backgroundColor: ORANGE }}>
              ELECTRICAL SOLUTIONS
            </a>
          </Link>
          <Link href="/diesel-delivery">
            <a className="block px-5 md:px-8 py-3 md:py-4 text-xs sm:text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity text-center" style={{ backgroundColor: ORANGE }}>
              DIESEL GENERATOR
            </a>
          </Link>
          <Link href="/solar-packages">
            <a className="block px-5 md:px-8 py-3 md:py-4 text-xs sm:text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity text-center" style={{ backgroundColor: ACTION_GREEN }}>
              SOLAR PACKAGES
            </a>
          </Link>
        </div>

        {/* Feature Box — inline on mobile, absolute on desktop */}
        <div className="w-full max-w-3xl mx-auto md:absolute md:bottom-12 md:left-0 md:right-0 md:mx-auto md:px-4">
          <div className="rounded-xl p-5 md:p-6 text-left shadow-2xl" style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle size={22} className="shrink-0 mt-0.5" style={{ color: ACTION_GREEN }} />
                <span className="text-white text-sm md:text-base font-medium tracking-wide">With over 4000 installations done across SA we are an expert in the field.</span>
              </li>
              <li className="flex items-start gap-3">
                <Award size={22} className="shrink-0 mt-0.5" style={{ color: ORANGE }} />
                <span className="text-white text-sm md:text-base font-medium tracking-wide">We offer free system monitoring on all installed systems.</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={22} className="shrink-0 mt-0.5" style={{ color: ACTION_GREEN }} />
                <span className="text-white text-sm md:text-base font-medium tracking-wide">Prompt support &amp; on-call full support for every client.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <a
        href="tel:+27120233410"
        className="absolute bottom-5 left-4 sm:left-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 z-20 text-sm"
        style={{ backgroundColor: ORANGE }}
      >
        <Phone size={18} fill="currentColor" /> Call Us
      </a>
      <a
        href="https://wa.me/27711863732"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-5 right-4 sm:right-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 z-20 text-sm"
        style={{ backgroundColor: ACTION_GREEN }}
      >
        <MessageCircle size={18} /> WhatsApp
      </a>
    </section>
  );
}

function AboutSection() {
  return (
    <>
      {/* Top 3-column feature strip */}
      <section className="py-14" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-0 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="flex flex-col items-center px-6 pb-10 md:pb-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${ORANGE}22` }}>
              <Users size={30} style={{ color: ORANGE_DARK }} />
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>Expert Team</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
              Qualified, certified and experienced experts who always deliver results without compromising on quality.
            </p>
          </div>
          <div className="flex flex-col items-center px-6 py-10 md:py-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${ORANGE}22` }}>
              <Award size={30} style={{ color: ORANGE_DARK }} />
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>Years of Experience</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
              Comprehensive expertise serving residential, commercial and industrial clients across all 9 provinces.
            </p>
          </div>
          <div className="flex flex-col items-center px-6 pt-10 md:pt-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${ORANGE}22` }}>
              <Handshake size={30} style={{ color: ORANGE_DARK }} />
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>Guaranteed Satisfaction</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
              We aim to please. Excellent service from a highly skilled team with effective problem solving skills.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Image with experience badge */}
            <div className="relative">
              <img
                src={aboutImg}
                alt="Govan Electrical professional team performing electrical installation in South Africa"
                className="w-full h-auto object-cover shadow-lg rounded-xl"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute bottom-6 right-6 rounded-xl p-4 text-center shadow-2xl"
                style={{ backgroundColor: NAVY }}
              >
                <p className="text-3xl font-extrabold leading-none" style={{ color: ORANGE, fontFamily: "Montserrat, sans-serif" }}>12+</p>
                <p className="text-white text-xs font-semibold uppercase tracking-wide mt-1 opacity-80">Years Experience</p>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>Who We Are</p>
              <h2 className="text-4xl font-extrabold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span style={{ color: ORANGE }}>About</span> <span style={{ color: NAVY }}>Govan Electrical</span>
              </h2>
              <div className="w-16 h-1 mt-2 mb-8" style={{ backgroundColor: ACTION_GREEN }} />

              <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  Welcome to <strong>Govan Electrical</strong>, your trusted partner for all your solar, electrical and diesel power generator needs.
                </p>
                <p>
                  We are committed to providing sustainable solutions that harness the power of the sun, while also servicing your existing electrical systems.
                </p>
                <p>
                  As the world moves towards a green future, diesel generators and industrial machinery still play an important role — and still need our full attention and expertise.
                </p>
                <p>
                  Our mission is to provide energy solutions that are accessible, reliable, and cost-effective for homes, businesses, and industries alike. We strive to deliver superior results through professionalism, integrity, and a commitment to excellence in everything we do.
                </p>
              </div>

              {/* Key bullet points */}
              <div className="mt-6 space-y-3">
                {[
                  "Registered & certified electricians",
                  "Free system monitoring on all installed systems",
                  "Nationwide coverage — all 9 provinces",
                  "4000+ successful installations completed",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle size={18} style={{ color: ACTION_GREEN }} className="shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-block mt-8 px-8 py-3 font-bold rounded shadow transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE, color: NAVY }}
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesSection() {
  const { openLeadForm } = useLeadForm();
  return (
    <section id="services" className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
            What We Offer
          </p>
          <h2
            className="text-4xl font-extrabold"
            style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
          >
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              {/* Accent strip */}
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: ORANGE }} />
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${ORANGE}15` }}
              >
                <s.icon size={28} style={{ color: ORANGE }} />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.desc}</p>
              <button
                onClick={() => openLeadForm(s.title)}
                className="inline-flex items-center gap-1 text-sm font-bold px-5 py-2 rounded transition"
                style={{ backgroundColor: ORANGE, color: NAVY }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ORANGE_DARK; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ORANGE; (e.currentTarget as HTMLElement).style.color = NAVY; }}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label, active }: { value: number; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="text-center">
      <p
        className="text-5xl md:text-6xl font-extrabold mb-2"
        style={{ color: ORANGE, fontFamily: "Montserrat, sans-serif", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
      >
        {count}+
      </p>
      <p className="text-white opacity-80 font-semibold text-sm uppercase tracking-wide">{label}</p>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a2a2a 100%)` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
            Our Advantages
          </p>
          <h2
            className="text-4xl font-extrabold"
            style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
          >
            Why Choose Govan Electrical?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US.map((w) => (
            <div
              key={w.title}
              className="rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "#f8f9fa", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              <w.icon size={36} style={{ color: ORANGE }} className="mb-4" />
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
              >
                {w.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.service) errs.service = "Please select a service";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const fieldCls = (key: string) =>
    `w-full px-4 py-3 border rounded-lg text-sm outline-none transition-colors ${
      errors[key] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
    }`;

  return (
    <>
      {/* ── Contact Info + Form ── */}
      <section id="contact" className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Section heading */}
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
              Get In Touch
            </p>
            <h2 className="text-4xl font-extrabold" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
              Contact Us
            </h2>
            <div className="w-16 h-1 mx-auto mt-3" style={{ backgroundColor: ACTION_GREEN }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left: contact details + hours */}
            <div className="space-y-6">
              {/* Info cards */}
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  lines: ["012 023 3410", "071 186 3732"],
                  href: "tel:+27120233410",
                },
                {
                  icon: Mail,
                  label: "Email",
                  lines: ["Admin@govanelectrical.co.za"],
                  href: "mailto:Admin@govanelectrical.co.za",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  lines: ["Unit 02, 1 Kambathi Street", "N4 Gateway Industrial Park, Willow Park"],
                  href: "https://maps.google.com/?q=-25.6748,28.3975",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.label === "Address" ? "_blank" : undefined}
                  rel={c.label === "Address" ? "noreferrer" : undefined}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 group transition-shadow hover:shadow-md"
                  style={{ border: "1px solid #f0f0f0" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: NAVY }}
                  >
                    <c.icon size={20} style={{ color: ORANGE }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE_DARK }}>{c.label}</p>
                    {c.lines.map((line, i) => (
                      <p key={i} className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{line}</p>
                    ))}
                  </div>
                </a>
              ))}

              {/* Business hours */}
              <div
                className="bg-white rounded-xl p-5"
                style={{ border: "1px solid #f0f0f0" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ORANGE_DARK }}>
                  Business Hours
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "07:00 – 17:00" },
                    { day: "Saturday", hours: "08:00 – 13:00" },
                    { day: "Sunday", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">{day}</span>
                      <span
                        className="font-bold text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: hours === "Closed" ? "#f3f4f6" : `${ORANGE}22`,
                          color: hours === "Closed" ? "#9ca3af" : ORANGE_DARK,
                        }}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
              <div className="px-8 py-5" style={{ backgroundColor: NAVY }}>
                <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Send Us a <span style={{ color: ORANGE }}>Message</span>
                </h3>
                <p className="text-white opacity-60 text-xs mt-1">We'll respond within 2 business hours.</p>
              </div>

              <div className="px-8 py-7">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ACTION_GREEN}18` }}>
                      <CheckCircle size={32} style={{ color: ACTION_GREEN }} />
                    </div>
                    <p className="font-bold text-lg" style={{ color: NAVY }}>Message Sent!</p>
                    <p className="text-gray-500 text-sm">Thank you — a member of our team will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. John Smith"
                          className={fieldCls("name")}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className={fieldCls("email")}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 082 123 4567"
                        className={fieldCls("phone")}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Service Required *</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={fieldCls("service") + (!formData.service ? " text-gray-400" : " text-gray-800")}
                      >
                        <option value="" disabled>Select a service…</option>
                        <option value="solar">Solar Panel Installation</option>
                        <option value="battery">Battery Backup / Inverter</option>
                        <option value="electrical">Electrical Installations & Wiring</option>
                        <option value="db">DB Board Upgrade</option>
                        <option value="maintenance">Maintenance & Repairs</option>
                        <option value="coc">Compliance Certificate (CoC)</option>
                        <option value="diesel">Diesel Power Generator</option>
                        <option value="industrial">Industrial Electrical</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Message <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or ask a question…"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none resize-none focus:border-yellow-400 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
                      style={{ backgroundColor: ORANGE, color: NAVY }}
                    >
                      Send Message
                    </button>
                    <p className="text-xs text-center text-gray-400">
                      Protected under POPIA. We never share your details.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <div className="w-full" style={{ height: 420 }}>
        <iframe
          title="Govan Electrical location"
          src="https://maps.google.com/maps?q=-25.6748,28.3975&z=16&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}

// ─── Brands / Partners Strip ────────────────────────────────────────────────
const BRANDS = [
  { name: "Deye", tag: "Inverters" },
  { name: "Sunsynk", tag: "Inverters" },
  { name: "Luxpower", tag: "Inverters" },
  { name: "Felicity", tag: "Solar Systems" },
  { name: "Dyness", tag: "Batteries" },
  { name: "SVOLT", tag: "Batteries" },
  { name: "Ecco", tag: "Inverters" },
];

function BrandsSection() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: ORANGE_DARK }}>
          Trusted Brands We Install
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="flex flex-col items-center px-5 py-3 rounded-xl border-2 hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#E5E7EB" }}
            >
              <span
                className="font-extrabold text-lg md:text-xl tracking-tight"
                style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
              >
                {b.name}
              </span>
              <span className="text-xs font-semibold mt-0.5" style={{ color: ORANGE_DARK }}>
                {b.tag}
              </span>
            </div>
          ))}
          <div
            className="flex flex-col items-center px-5 py-3 rounded-xl border-2 border-dashed hover:shadow-md transition-all"
            style={{ borderColor: ORANGE }}
          >
            <span className="font-extrabold text-lg tracking-tight" style={{ color: ORANGE_DARK, fontFamily: "Montserrat, sans-serif" }}>
              +More
            </span>
            <span className="text-xs font-semibold mt-0.5 text-gray-500">Brands</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Solar Savings Calculator ────────────────────────────────────────────────
function SavingsCalculatorSection() {
  const [bill, setBill] = useState(2500);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Calculation logic
  const savingsPct = 0.78; // average 78% reduction with hybrid solar
  const monthlySavings = Math.round(bill * savingsPct);
  const annualSavings = monthlySavings * 12;
  const tenYearSavings = annualSavings * 10;

  // Recommend system size based on bill
  const systemKw = bill < 1500 ? 3.5 : bill < 2500 ? 5 : bill < 4000 ? 8 : bill < 6000 ? 10 : 16;
  const systemPrice = bill < 1500 ? 29900 : bill < 2500 ? 49900 : bill < 4000 ? 74990 : bill < 6000 ? 89900 : 169900;
  const paybackYears = (systemPrice / annualSavings).toFixed(1);

  return (
    <section ref={ref} className="py-20" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a2a2a 100%)` }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <Calculator size={20} style={{ color: ORANGE }} />
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
              Solar Savings Estimator
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
            How Much Could You Save?
          </h2>
          <p className="text-white opacity-70 mt-3 max-w-xl mx-auto">
            Move the slider to match your average monthly electricity bill and see your estimated savings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Input */}
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <label className="block text-white font-bold mb-2 text-sm uppercase tracking-wide">
              Monthly Electricity Bill
            </label>
            <div className="text-5xl font-extrabold mb-6" style={{ color: ORANGE, fontFamily: "Montserrat, sans-serif" }}>
              R{bill.toLocaleString()}
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={100}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: ORANGE }}
              aria-label="Monthly electricity bill slider"
            />
            <div className="flex justify-between text-white opacity-50 text-xs mt-2">
              <span>R500</span><span>R15,000</span>
            </div>

            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)" }}>
              <p className="text-white text-sm font-semibold mb-1">Recommended System</p>
              <p className="font-extrabold text-xl" style={{ color: ORANGE, fontFamily: "Montserrat, sans-serif" }}>
                {systemKw}kW Solar System
              </p>
              <p className="text-white opacity-60 text-xs mt-1">Starting from R{systemPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, label: "Monthly Savings", value: `R${monthlySavings.toLocaleString()}`, sub: "per month" },
              { icon: BadgeCheck, label: "Annual Savings", value: `R${annualSavings.toLocaleString()}`, sub: "per year" },
              { icon: Clock, label: "Payback Period", value: `${paybackYears} yrs`, sub: "to break even" },
              { icon: Star, label: "10-Year Savings", value: `R${tenYearSavings.toLocaleString()}`, sub: "total return" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 flex flex-col"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <item.icon size={20} className="mb-3" style={{ color: ORANGE }} />
                <p className="text-white opacity-60 text-xs font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-extrabold text-xl text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {animated ? item.value : "—"}
                </p>
                <p className="text-white opacity-40 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}

            <div className="col-span-2 mt-2">
              <Link href="/solar-packages">
                <a
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ORANGE, color: NAVY }}
                >
                  View Packages &amp; Prices
                </a>
              </Link>
              <p className="text-center text-white opacity-40 text-xs mt-3">
                * Estimates based on average SA grid tariffs. Actual savings vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How long does a solar installation take?",
    a: "Most residential solar installations are completed within 1–2 days. Larger commercial systems may take 3–5 days. We minimise disruption and clean up fully after every job.",
  },
  {
    q: "What warranties do your solar systems come with?",
    a: "All our solar systems include manufacturer warranties of 3–10 years depending on the brand, plus our workmanship warranty on the installation itself. Deye and Sunsynk systems carry 10-year warranties.",
  },
  {
    q: "Do you service all provinces in South Africa?",
    a: "Yes! We serve clients across all 9 provinces of South Africa. Our head office is in Pretoria (Gauteng), but we regularly travel to KZN, Western Cape, Mpumalanga and beyond.",
  },
  {
    q: "Can I start with a backup system and add solar panels later?",
    a: "Absolutely. All our systems are fully upgradable. You can start with an inverter-and-battery backup system now and add solar panels at any point — the system grows with your needs and budget.",
  },
  {
    q: "Do you issue a Certificate of Compliance (CoC)?",
    a: "Yes, every electrical installation includes a valid Certificate of Compliance (CoC) as required by South African law. This is essential for insurance validity and property sales.",
  },
  {
    q: "What size solar system do I need?",
    a: "A typical South African home uses a 5–10kW system. The right size depends on your monthly electricity usage, number of appliances, and budget. Use our savings calculator above or contact us for a free assessment.",
  },
  {
    q: "Will my solar system work during load-shedding?",
    a: "Yes! Our hybrid and battery backup systems switch to battery power instantly when the grid goes down — usually within milliseconds. You won't even notice the power going out.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "We work with financing partners to make solar accessible. Contact us to discuss payment options. Remember — your monthly savings often exceed your monthly loan repayment, making solar cash-flow positive from day one.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
            Got Questions?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border transition-all"
              style={{ borderColor: open === i ? ORANGE : "#E5E7EB" }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-sm md:text-base"
                style={{ color: NAVY, backgroundColor: open === i ? "#FFFDF0" : "white" }}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className="shrink-0 transition-transform duration-200"
                  style={{
                    color: ORANGE_DARK,
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed" style={{ backgroundColor: "#FFFDF0" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm mb-4">Still have questions? We're happy to help.</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE, color: NAVY }}
          >
            <Phone size={16} /> Ask Us Anything
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Areas We Serve ──────────────────────────────────────────────────────────
const PROVINCES = [
  { name: "Gauteng", note: "Head Office" },
  { name: "KwaZulu-Natal", note: "" },
  { name: "Western Cape", note: "" },
  { name: "Eastern Cape", note: "" },
  { name: "Mpumalanga", note: "" },
  { name: "Limpopo", note: "" },
  { name: "North West", note: "" },
  { name: "Free State", note: "" },
  { name: "Northern Cape", note: "" },
];

function AreasWeServeSection() {
  return (
    <section className="py-16" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <MapPinned size={18} style={{ color: ORANGE_DARK }} />
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE_DARK }}>
            Nationwide Coverage
          </p>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
          Areas We Serve
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Govan Electrical installs and services clients across all 9 provinces of South Africa. No matter where you are, we've got you covered.
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {PROVINCES.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm border-2 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{
                borderColor: p.note ? ORANGE : "#E5E7EB",
                backgroundColor: p.note ? ORANGE : "white",
                color: p.note ? NAVY : "#333",
              }}
            >
              <MapPin size={14} className="shrink-0" />
              <span>{p.name}</span>
              {p.note && <span className="text-xs font-bold opacity-70">({p.note})</span>}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
          {[
            { icon: Users, label: "300+", sub: "Happy Clients Nationwide" },
            { icon: MapPin, label: "9/9", sub: "Provinces Covered" },
            { icon: CheckCircle, label: "4000+", sub: "Installations Completed" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <item.icon size={28} className="mx-auto mb-2" style={{ color: ORANGE_DARK }} />
              <p className="text-2xl font-extrabold" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>{item.label}</p>
              <p className="text-gray-500 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
