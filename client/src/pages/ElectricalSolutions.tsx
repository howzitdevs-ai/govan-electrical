import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import {
  Zap,
  CheckCircle,
  Wrench,
  Shield,
  Settings,
  Phone,
  ArrowRight,
  Award,
} from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";
const ORANGE_DARK = "#B8860B";
const ACTION_GREEN = "#4CAF50";

const SERVICES = [
  { icon: Zap, title: "Full Wiring & Installations", desc: "New construction, renovations and upgrades — all wiring done safely to SANS standards." },
  { icon: Settings, title: "DB Board Upgrades", desc: "Distribution board upgrades, rewiring and protection device installations for home and business." },
  { icon: Wrench, title: "Fault Finding & Repairs", desc: "Rapid diagnosis and repair of electrical faults to minimise downtime and disruption." },
  { icon: Shield, title: "Compliance Certificates (CoC)", desc: "We issue valid Certificates of Compliance for property sales, renovations and new installations." },
];

const BENEFITS = [
  "Full Residential & Commercial Wiring",
  "Distribution Board (DB) Upgrades & Repairs",
  "Industrial Electrical Contracting",
  "Fault Finding & Diagnostics",
  "Compliance Certificates (CoC)",
  "Lighting Design & Installation",
  "Surge Protection Installation",
  "Earth Leakage Installation",
];

const ELECTRICAL_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Electrical Installations & Repairs South Africa",
    "serviceType": "Electrical Contracting",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://www.govanelectrical.co.za/#business",
      "name": "Govan Electrical"
    },
    "description": "Certified electricians offering residential, commercial and industrial electrical services including wiring, DB board upgrades, fault finding, and Certificates of Compliance (CoC) across South Africa.",
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electrical Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Residential & Commercial Wiring" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Distribution Board (DB) Upgrades & Repairs" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Electrical Contracting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fault Finding & Diagnostics" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Compliance Certificates (CoC)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lighting Design & Installation" } }
      ]
    },
    "url": "https://www.govanelectrical.co.za/electrical-solutions"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.govanelectrical.co.za/" },
      { "@type": "ListItem", "position": 2, "name": "Electrical Solutions", "item": "https://www.govanelectrical.co.za/electrical-solutions" }
    ]
  }
];

export default function ElectricalSolutions() {
  useSEO({
    title: "Certified Electricians Pretoria & Gauteng | DB Board, CoC, Wiring | Govan Electrical",
    description: "Licensed electricians in Pretoria, Gauteng & across South Africa. Residential & commercial wiring, DB board upgrades, fault finding, CoC certificates & industrial electrical. SANS compliant. Free quote — call 012 023 3410.",
    keywords: "electricians Pretoria, certified electricians Gauteng, electrician South Africa, DB board upgrade Pretoria, certificate of compliance CoC Pretoria, fault finding electrician Gauteng, electrical wiring Pretoria, electrical contractor South Africa, SANS compliant electrician",
    canonical: "/electrical-solutions",
    schema: ELECTRICAL_SCHEMA,
  });

  const { openLeadForm } = useLeadForm();

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative py-28 md:py-36 text-white"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a2a2a 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            Certified Electricians
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Electrical <span style={{ color: ORANGE }}>Solutions</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-85 mb-8">
            Comprehensive electrical services for residential, commercial, and industrial properties — done safely, to code, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openLeadForm("Electrical Installations & Wiring")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE, color: NAVY }}
            >
              Get a Free Quote <ArrowRight size={16} />
            </button>
            <a
              href="tel:+27120233410"
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide border-2 transition-opacity hover:opacity-90"
              style={{ borderColor: ORANGE, color: ORANGE }}
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-8 right-8 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: ORANGE }} />
        <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: ORANGE }} />
      </section>

      {/* Trust Bar */}
      <div className="py-4" style={{ backgroundColor: ORANGE }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs sm:text-sm font-bold" style={{ color: NAVY }}>
          <span className="flex items-center gap-2"><Award size={16} /> Fully Certified Electricians</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-2"><Shield size={16} /> SANS Standards Compliant</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} /> CoC Certificates Issued</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: benefits list */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
                Our Expertise
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
              >
                Expert Electrical Services
              </h2>
              <div className="w-16 h-1 mb-8" style={{ backgroundColor: ORANGE }} />
              <p className="text-gray-600 mb-6 leading-relaxed">
                From new installations and wiring to complex industrial fault finding, our certified electricians deliver safe, compliant, and high-quality electrical solutions. We ensure that your electrical systems are efficient, reliable, and up to code.
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
                <a
                  href="tel:+27120233410"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ORANGE, color: NAVY }}
                >
                  <Phone size={16} /> Call for a Quote
                </a>
                <button
                  onClick={() => openLeadForm("Electrical Installations & Wiring")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm border-2 transition-opacity hover:opacity-90"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  Get a Free Quote <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right: service cards */}
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

      {/* Why Certified Matters */}
      <section className="py-16" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
          >
            Why Choose Certified Electricians?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Safety & Compliance", desc: "Uncertified work can void insurance and create serious safety hazards. Our work meets all SANS electrical standards." },
              { icon: Award, title: "Registered Professionals", desc: "All our electricians hold valid trade certificates and are registered with the relevant South African regulatory bodies." },
              { icon: CheckCircle, title: "Workmanship Warranty", desc: "Every installation and repair comes with a workmanship warranty. We stand fully behind the quality of our work." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 shadow-md">
                <item.icon size={40} className="mx-auto mb-4" style={{ color: ORANGE_DARK }} />
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
            Need an Electrician?
          </h2>
          <p className="text-white opacity-75 mb-8 max-w-xl mx-auto">
            Whether it's a quick repair or a full installation, our team is ready to help. Contact us for a free, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openLeadForm("Electrical Installations & Wiring")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE, color: NAVY }}
            >
              Get a Free Quote <ArrowRight size={16} />
            </button>
            <a
              href="tel:+27120233410"
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide border-2 text-white transition-opacity hover:opacity-90"
              style={{ borderColor: ORANGE }}
            >
              <Phone size={16} /> 012 023 3410
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
