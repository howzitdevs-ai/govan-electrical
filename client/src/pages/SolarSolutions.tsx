import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { useLeadForm } from "@/contexts/LeadFormContext";
import {
  Sun,
  CheckCircle,
  Battery,
  Zap,
  Shield,
  Phone,
  ArrowRight,
} from "lucide-react";
import panelsBg from "@/images/panels-electricity-order-sunlight.png";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";
const ORANGE_DARK = "#B8860B";
const ACTION_GREEN = "#4CAF50";

const SERVICES = [
  { icon: Sun, title: "Solar Panel Installations", desc: "Custom-designed solar panel systems for homes and businesses, sized to your energy needs." },
  { icon: Battery, title: "Battery Backup Systems", desc: "Inverter and lithium battery solutions ensuring uninterrupted power during load-shedding." },
  { icon: Zap, title: "Hybrid Solar Systems", desc: "Grid-tied hybrid systems that use solar first, then battery, then grid — maximising savings." },
  { icon: Shield, title: "System Maintenance & Upgrades", desc: "Keep your solar investment performing at peak with our maintenance and upgrade services." },
];

const BENEFITS = [
  "Custom Solar Panel Installations",
  "Battery Backup Systems (Inverters & Lithium Batteries)",
  "Hybrid Solar Systems",
  "System Maintenance & Upgrades",
  "Energy Efficiency Consultations",
  "Free System Monitoring Included",
];

const SOLAR_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solar Panel Installation South Africa",
    "serviceType": "Solar Energy Installation",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://www.govanelectrical.co.za/#business",
      "name": "Govan Electrical"
    },
    "description": "Custom solar panel installations, battery backup systems, hybrid solar systems and ongoing maintenance for homes and businesses across South Africa.",
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Solar Solutions",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Solar Panel Installations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery Backup Systems (Inverters & Lithium Batteries)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hybrid Solar Systems" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Solar System Maintenance & Upgrades" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free System Monitoring" } }
      ]
    },
    "url": "https://www.govanelectrical.co.za/solar-solutions"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.govanelectrical.co.za/" },
      { "@type": "ListItem", "position": 2, "name": "Solar Solutions", "item": "https://www.govanelectrical.co.za/solar-solutions" }
    ]
  }
];

export default function SolarSolutions() {
  useSEO({
    title: "Solar Panel Installations South Africa | Govan Electrical",
    description: "Professional solar panel installations, battery backup & hybrid systems for homes & businesses. Free system monitoring included. 4000+ SA installs. Get a free quote today.",
    keywords: "solar panel installation South Africa, solar energy solutions, battery backup system, hybrid solar system, load shedding solar, solar installation Pretoria, Gauteng solar panels",
    canonical: "/solar-solutions",
    schema: SOLAR_SCHEMA,
  });

  const { openLeadForm } = useLeadForm();

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative py-28 md:py-36 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("${panelsBg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            Clean Energy Solutions
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Solar <span style={{ color: ORANGE }}>Solutions</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-85 mb-8">
            Reliable, clean, and efficient solar and backup power systems tailored for your home or business. Beat load-shedding and reduce your electricity bill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solar-packages">
              <a
                className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE, color: NAVY }}
              >
                View Solar Packages <ArrowRight size={16} />
              </a>
            </Link>
            <button
              onClick={() => openLeadForm("Solar Panel Installation")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide border-2 transition-opacity hover:opacity-90"
              style={{ borderColor: ORANGE, color: ORANGE }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
                What We Offer
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
              >
                Harness the Power of the Sun
              </h2>
              <div className="w-16 h-1 mb-8" style={{ backgroundColor: ORANGE }} />
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Govan Electrical, we provide top-tier solar solutions designed to reduce your reliance on the grid, lower electricity costs, and ensure uninterrupted power supply during outages. Our expert team handles everything from design to installation and ongoing maintenance.
              </p>
              <ul className="space-y-3">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 shrink-0" size={20} style={{ color: ACTION_GREEN }} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => openLeadForm("Solar Panel Installation")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ORANGE, color: NAVY }}
                >
                  Get a Free Quote <ArrowRight size={16} />
                </button>
                <Link href="/solar-packages">
                  <a
                    className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm border-2 transition-opacity hover:opacity-90"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    Browse Packages <ArrowRight size={16} />
                  </a>
                </Link>
              </div>
            </div>

            {/* Right: services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl p-6 border-t-4 hover:-translate-y-1 transition-all"
                  style={{ backgroundColor: "#f8f9fa", borderTopColor: ORANGE, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
                >
                  <s.icon size={32} className="mb-3" style={{ color: ORANGE_DARK }} />
                  <h3 className="font-bold mb-2 text-sm" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Free Consultation", desc: "We assess your energy needs and recommend the right system size and components for your home or business." },
              { step: "02", title: "Custom Quote", desc: "Receive a detailed, transparent quote with no hidden costs. We'll explain every line item clearly." },
              { step: "03", title: "Professional Install", desc: "Our certified team installs your system quickly and safely, with a COC certificate included." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl mb-4"
                  style={{ backgroundColor: ORANGE, color: NAVY, fontFamily: "Montserrat, sans-serif" }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Ready to Go Solar?
          </h2>
          <p className="text-white opacity-75 mb-8 max-w-xl mx-auto">
            Join thousands of South African homes and businesses powered by Govan Electrical. Get your free quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solar-packages">
              <a
                className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE, color: NAVY }}
              >
                View All Packages <ArrowRight size={16} />
              </a>
            </Link>
            <button
              onClick={() => openLeadForm("Solar Panel Installation")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide border-2 text-white transition-opacity hover:opacity-90"
              style={{ borderColor: ORANGE }}
            >
              Get a Free Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
