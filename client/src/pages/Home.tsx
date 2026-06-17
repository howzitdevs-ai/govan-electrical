import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Zap,
  Wrench,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Sun,
  Settings,
  CheckCircle,
  Award,
  Users,
  Clock,
  Handshake,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import panelsBg from "@/images/panels-electricity-order-sunlight.png";

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
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

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

const TESTIMONIALS = [
  {
    name: "Mthandazo Dube",
    role: "Residential Client",
    text: "Govan Electrical is simply the best when it comes to electrical systems. The team did a fantastic job at my house. I would definitely recommend them. Big up Nkosi and your team!",
  },
  {
    name: "Spook von Eschwege",
    role: "Commercial Client",
    text: "I just want to thank the team for a job well done. I received many compliments on the installation and it works perfectly! The level of professionalism and respectfulness is commendable.",
  },
  {
    name: "Monique Nortje",
    role: "Residential Client",
    text: "Extremely happy and very impressed with Govan Electrical! They went above and beyond, travelling to our small town without overcharging. Everything was properly explained and installation was done professionally.",
  },
  {
    name: "Matthew Mokoena",
    role: "Property Developer",
    text: "After receiving more than 20 quotes, Govan was the best hands down. Confirmed quote on Thursday, installation done on Monday. They also fixed some poor workmanship issues. Highly recommended!",
  },
];

// ─── Components ────────────────────────────────────────────────────────────

// ─── Main export ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <WhyUsSection />
      <TestimonialsSection />
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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${panelsBg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center justify-center pt-20 pb-40 text-center">

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl max-w-5xl mx-auto"
          style={{ fontFamily: "Montserrat, sans-serif", textShadow: "2px 2px 10px rgba(0,0,0,0.8)" }}
        >
          Leading Provider Of High-Quality Energy Solutions
        </h1>

        {/* Sub Heading */}
        <h2
          className="text-2xl md:text-3xl font-bold mb-10"
          style={{ color: ACTION_GREEN, textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
        >
          How Can We Assist Today?
        </h2>

        {/* 4 Action Buttons */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl mx-auto px-4">
          <Link href="/solar-solutions">
            <a className="block w-full md:w-auto px-6 md:px-8 py-4 text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: ORANGE }}>
              SOLAR SOLUTIONS
            </a>
          </Link>
          <Link href="/electrical-solutions">
            <a className="block w-full md:w-auto px-6 md:px-8 py-4 text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: ORANGE }}>
              ELECTRICAL SOLUTIONS
            </a>
          </Link>
          <Link href="/diesel-delivery">
            <a className="block w-full md:w-auto px-6 md:px-8 py-4 text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: ORANGE }}>
              DIESEL DELIVERY
            </a>
          </Link>
          <Link href="/solar-packages">
            <a className="block w-full md:w-auto px-6 md:px-8 py-4 text-sm font-bold text-white rounded uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: ACTION_GREEN }}>
              VIEW SOLAR PACKAGES
            </a>
          </Link>
        </div>

        {/* Review Pill */}
        <div className="bg-white rounded-full px-6 py-2 flex flex-col md:flex-row items-center gap-3 shadow-xl mb-16 inline-flex border border-gray-200">
          <span className="font-bold text-lg tracking-tight">
            <span className="text-blue-600">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-600">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-lg">4.9</span>
            <div className="flex text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
          </div>
          <span className="text-xs md:text-sm text-gray-600 font-medium">
            (200+ reviews (Reputable companies have reviews across Google/Hellopeter. Do not fall for fly by nights))
          </span>
        </div>

        {/* Feature Box Bottom */}
        <div className="absolute bottom-12 w-full max-w-3xl mx-auto px-4 left-0 right-0">
          <div className="rounded-xl p-6 text-left shadow-2xl" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle size={24} style={{ color: ACTION_GREEN }} />
                <span className="text-white text-sm md:text-base font-medium tracking-wide">With over 4000 installations done across SA we are an expert in the field.</span>
              </li>
              <li className="flex items-center gap-3">
                <Award size={24} style={{ color: ORANGE }} />
                <span className="text-white text-sm md:text-base font-medium tracking-wide">We offer free system monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={24} style={{ color: ACTION_GREEN }} />
                <span className="text-white text-sm md:text-base font-medium tracking-wide">Prompt support & On call full support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating Call Buttons */}
      <a href="tel:+27120233410" className="absolute bottom-6 left-6 px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 z-20" style={{ backgroundColor: ORANGE }}>
        <Phone size={20} fill="currentColor" /> Call Us
      </a>
      <a href="https://wa.me/27711863732" target="_blank" rel="noreferrer" className="absolute bottom-6 right-6 px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 z-20" style={{ backgroundColor: ACTION_GREEN }}>
        <Mail size={20} /> Chat With Us
      </a>
    </section>
  );
}

function AboutSection() {
  return (
    <>
      {/* Top light blue banner with 3 columns */}
      <section className="py-12" style={{ backgroundColor: "#EAF6FC" }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center px-4">
            <Users size={48} style={{ color: ORANGE }} className="mb-4" />
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Our teams of qualified, certified, and experienced experts always deliver the desired results without compromising on quality.
            </p>
          </div>
          <div className="flex flex-col items-center px-4">
            <Award size={48} style={{ color: ORANGE }} className="mb-4" />
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              We have years of comprehensive expertise and experience in serving the needs of our residential, commercial, and industrial clients.
            </p>
          </div>
          <div className="flex flex-col items-center px-4">
            <Handshake size={48} style={{ color: ORANGE }} className="mb-4" />
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Guaranteed satisfaction. We aim to please! You always get excellent service from our highly skilled team. Effective problem solving skills!
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000"
                alt="Govan Electrical Team"
                className="w-full h-auto object-cover shadow-lg"
              />
            </div>

            {/* Right: Text */}
            <div>
              <h2 className="text-4xl font-extrabold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span style={{ color: ORANGE }}>About</span> <span style={{ color: NAVY }}>Govan Electrical</span>
              </h2>
              <div className="w-16 h-1 mt-2 mb-8" style={{ backgroundColor: ACTION_GREEN }} />

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Welcome to Govan Electrical, your trusted partner for all your solar, electrical and fuel needs.
                </p>
                <p>
                  We are committed to providing sustainable solutions that harness the power of the sun, while also servicing your existing electrical systems.
                </p>
                <p>
                  As the world moves towards a green future, diesel generators, machinery and vehicles are still with us for a very long time and still need our attention as they still play an important role in our lives.
                </p>
                <p>
                  Our mission is to provide a service that covers all your energy needs, services that are accessible, reliable, and cost-effective for homes, businesses, and industries alike.
                </p>
                <p>
                  We strive to deliver superior results through professionalism, integrity, and a commitment to excellence in everything we do.
                </p>
              </div>

              <a
                href="#services"
                className="inline-block mt-8 px-8 py-3 font-bold text-white shadow transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesSection() {
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
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-sm font-bold text-white px-5 py-2 rounded transition"
                style={{ backgroundColor: ORANGE }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = GREEN; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ORANGE; }}
              >
                Get Quote
              </a>
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

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
            Client Reviews
          </p>
          <h2
            className="text-4xl font-extrabold"
            style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
          >
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill={ORANGE} style={{ color: ORANGE }} />
            ))}
            <span className="font-bold ml-2" style={{ color: NAVY }}>4.9 / 5</span>
            <span className="text-gray-500 text-sm">from Google Reviews</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-10 text-white relative overflow-hidden"
            style={{ backgroundColor: NAVY, boxShadow: "0 8px 40px rgba(28,54,100,0.3)" }}
          >
            {/* Quote marks */}
            <span
              className="absolute top-4 left-6 text-8xl font-serif leading-none opacity-20"
              style={{ color: ORANGE }}
            >
              "
            </span>

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={ORANGE} style={{ color: ORANGE }} />
              ))}
            </div>

            <p className="text-lg leading-relaxed mb-8 opacity-90 italic">
              "{t.text}"
            </p>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                style={{ backgroundColor: ORANGE }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm opacity-60">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition"
              style={{ borderColor: NAVY, color: NAVY }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = NAVY; el.style.color = "#fff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "transparent"; el.style.color = NAVY; }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    backgroundColor: i === current ? ORANGE : "#ccc",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition"
              style={{ borderColor: NAVY, color: NAVY }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = NAVY; el.style.color = "#fff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "transparent"; el.style.color = NAVY; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: `1px solid ${ORANGE}`,
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    fontStyle: "italic",
  };

  return (
    <section
      id="contact"
      className="py-20"
      style={{
        background: `linear-gradient(rgba(28,54,100,0.88), rgba(28,54,100,0.88)), url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80') center/cover`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: info */}
          <div className="text-white">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
              Get In Touch
            </p>
            <h2
              className="text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Start Your Project?
            </h2>
            <p className="opacity-80 mb-8 leading-relaxed">
              Have a question or need our services? Fill out the form and we'll get back to you as soon as possible. We'd love to help with your next electrical project.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "012 023 3410 / 071 186 3732", href: "tel:+27120233410" },
                { icon: Mail, label: "Email", value: "Admin@govanelectrical.co.za", href: "mailto:Admin@govanelectrical.co.za" },
                { icon: MapPin, label: "Address", value: "Unit 02, 1 Kambathi Street, N4 Gateway Industrial park, Willow Park", href: "#" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <c.icon size={18} color="#fff" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{c.label}</p>
                    <p className="text-white group-hover:text-orange-300 transition">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  style={inputStyle}
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                style={inputStyle}
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                style={{ ...inputStyle, fontStyle: "normal", color: formData.service ? "#333" : "#999" }}
              >
                <option value="" disabled>Select a Service</option>
                <option value="electrical">Electrical Installations</option>
                <option value="maintenance">Maintenance &amp; Repairs</option>
                <option value="solar">Solar &amp; Backup Power</option>
                <option value="industrial">Industrial Electrical</option>
                <option value="compliance">Safety &amp; Compliance</option>
                <option value="commercial">Commercial Projects</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <button
                type="submit"
                className="w-full py-3 font-bold text-white rounded-lg transition-all"
                style={{ backgroundColor: ORANGE }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = GREEN; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ORANGE; }}
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


