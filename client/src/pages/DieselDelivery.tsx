import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { useLeadForm } from "@/contexts/LeadFormContext";
import {
  Settings,
  CheckCircle,
  Truck,
  Clock,
  Shield,
  Phone,
  ArrowRight,
  Zap,
} from "lucide-react";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";
const ORANGE_DARK = "#B8860B";
const ACTION_GREEN = "#4CAF50";

const SERVICES = [
  { icon: Truck, title: "Bulk Diesel Supply & Delivery", desc: "Reliable bulk diesel delivered directly to your site — homes, businesses, construction sites and farms." },
  { icon: Settings, title: "Generator Refueling", desc: "Keep your backup generators fuelled and ready. We handle refueling on a schedule or on demand." },
  { icon: Clock, title: "Scheduled Delivery Plans", desc: "Set up a recurring delivery plan so you never run out of fuel when you need it most." },
  { icon: Zap, title: "Emergency Refueling Response", desc: "When load-shedding strikes unexpectedly, our emergency refueling service keeps you powered." },
];

const BENEFITS = [
  "Bulk Diesel Supply & Delivery",
  "Generator Refueling Services",
  "Scheduled Delivery Plans",
  "Emergency Refueling Response",
  "High-Quality, Clean Diesel Supply",
  "Diesel Generator Installation & Servicing",
  "Load-Shedding Preparedness Packages",
];

const DIESEL_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diesel Generator Installation & Supply South Africa",
    "serviceType": "Generator Installation & Fuel Supply",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://www.govanelectrical.co.za/#business",
      "name": "Govan Electrical"
    },
    "description": "Diesel generator installation, refueling services, bulk diesel supply and emergency response for homes, businesses and construction sites across South Africa.",
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Diesel Generator Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diesel Generator Installation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bulk Diesel Supply & Delivery" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Generator Refueling Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Scheduled Delivery Plans" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency Refueling Response" } }
      ]
    },
    "url": "https://www.govanelectrical.co.za/diesel-delivery"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.govanelectrical.co.za/" },
      { "@type": "ListItem", "position": 2, "name": "Diesel Power Generator", "item": "https://www.govanelectrical.co.za/diesel-delivery" }
    ]
  }
];

export default function DieselDelivery() {
  useSEO({
    title: "Diesel Generator Installation & Supply South Africa | Govan Electrical",
    description: "Diesel generator installation, refueling & bulk diesel supply for businesses, homes & construction sites. Emergency response available. Beat load-shedding. Get a free quote.",
    keywords: "diesel generator South Africa, generator installation Pretoria, diesel supply Gauteng, load shedding generator, emergency refueling, bulk diesel delivery, backup power South Africa",
    canonical: "/diesel-delivery",
    schema: DIESEL_SCHEMA,
  });

  const { openLeadForm } = useLeadForm();

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative py-28 md:py-36 text-white"
        style={{ background: `linear-gradient(135deg, #1a1a2e 0%, ${NAVY} 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            Backup Power Solutions
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Diesel <span style={{ color: ORANGE }}>Power Generator</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-85 mb-8">
            A diesel generator combines a diesel engine with an electric generator to produce electrical energy. It is widely used for backup power during outages or as a primary power source in areas without grid access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openLeadForm("Diesel Power Generator")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE, color: NAVY }}
            >
              Get a Quote <ArrowRight size={16} />
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
        {/* Decorative */}
        <div className="absolute top-10 right-10 w-56 h-56 rounded-full opacity-5" style={{ backgroundColor: ORANGE }} />
        <div className="absolute bottom-6 left-6 w-36 h-36 rounded-full opacity-5" style={{ backgroundColor: ORANGE }} />
      </section>

      {/* Trust Bar */}
      <div className="py-4" style={{ backgroundColor: ORANGE }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs sm:text-sm font-bold" style={{ color: NAVY }}>
          <span className="flex items-center gap-2"><Truck size={16} /> Fast Delivery</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-2"><Shield size={16} /> Clean Quality Diesel</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-2"><Clock size={16} /> Emergency Response Available</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE_DARK }}>
                What We Offer
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
              >
                Keeping Your Business Moving
              </h2>
              <div className="w-16 h-1 mb-8" style={{ backgroundColor: ORANGE }} />
              <p className="text-gray-600 mb-6 leading-relaxed">
                Don't let fuel shortages or load-shedding disrupt your operations. Govan Electrical offers dependable diesel power generator solutions and fuel delivery services directly to your premises. Whether you need fuel for backup generators, construction sites, or industrial machinery, we've got you covered.
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
                  onClick={() => openLeadForm("Diesel Power Generator")}
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

      {/* Key Advantages */}
      <section className="py-16" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}
          >
            Why Diesel Backup Power?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Reliable Power", desc: "Diesel generators provide stable, high-output power for critical systems when the grid fails." },
              { icon: Shield, title: "Long Runtime", desc: "Unlike solar batteries, diesel generators can run continuously as long as fuel is supplied." },
              { icon: Settings, title: "Low Maintenance", desc: "Modern diesel generators are robust and designed for longevity with simple maintenance schedules." },
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
            Don't Let Load-Shedding Stop You
          </h2>
          <p className="text-white opacity-75 mb-8 max-w-xl mx-auto">
            Contact Govan Electrical today to discuss the right diesel backup power solution for your home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openLeadForm("Diesel Power Generator")}
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
