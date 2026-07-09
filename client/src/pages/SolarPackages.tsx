import { useState } from "react";
import { Search, Info, Mail } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { useLeadForm } from "@/contexts/LeadFormContext";
import solar1 from "@/images/Solor/solar-1.png";
import solar2 from "@/images/Solor/solar-2.png";
import solar3 from "@/images/Solor/solar-3.png";
import solar4 from "@/images/Solor/solar-4.jpg";
import solar5 from "@/images/Solor/solar-5.png";
import solar6 from "@/images/Solor/solar-6.jpg";
import solar7 from "@/images/Solor/solar-7.jpg";
import solar8 from "@/images/Solor/solar-8.jpg";
import solar9 from "@/images/Solor/solar-9.png";
import solar10 from "@/images/Solor/solar-10.png";
import solar11 from "@/images/Solor/solar-11.jpg";
import solar12 from "@/images/Solor/solar-12.jpg";
import solar13 from "@/images/Solor/solar-13.jpg";
import solar14 from "@/images/Solor/solar-14.jpg";
import solar15 from "@/images/Solor/solar-15.jpg";
import solar16 from "@/images/Solor/solar-16.jpg";
import solar17 from "@/images/Solor/solar-17.jpg";
import solar18 from "@/images/Solor/solar-18.png";
import solar19 from "@/images/Solor/solar-19.png";
import solar20 from "@/images/Solor/solar-20.jpg";
import solar21 from "@/images/Solor/solar-21.png";
import solar22 from "@/images/Solor/solar-22.png";
import solar23 from "@/images/Solor/solar-23.png";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";
const ORANGE_DARK = "#B8860B";
const ACTION_GREEN = "#4CAF50";

const FILTERS = [
  "All Packages",
  "3kW",
  "5kW",
  "6kW",
  "8kW",
  "10kW",
  "12kW",
  "14kW",
  "16kW",
  "Deye/Dyness",
  "Luxpower",
  "Sunsynk",
  "Special Offers",
  "Most Popular",
];

const PACKAGES = [
  // Original 4 from first request
  {
    id: 1,
    title: "Felicity 5kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar1,
    features: [
      "5kW Felicity Hybrid Inverter",
      "5kWh Lithium Battery",
      "5 x 600W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    price: "R49,900.00",
  },
  {
    id: 2,
    title: "Felicity 8kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar2,
    features: [
      "8kW Felicity Inverter",
      "10kw Lithium Battery",
      "8 x 600W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    price: "R74,990.00",
  },
  {
    id: 3,
    title: "5kw Deye System",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: solar3,
    features: [
      "5kW Deye Inverter",
      "5kW Deye/Dyness Lithium Battery",
      "6 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    oldPrice: "R59,900.00",
    price: "R57,000.00",
  },
  {
    id: 4,
    title: "10kw Luxpower System",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: solar4,
    features: [
      "2 x 5kW Luxpower Inverter",
      "2 x 5kW SVOLT/SUN Lithium Battery",
      "12 x 600W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    oldPrice: "R94,900.00",
    price: "R89,900.00",
  },
  // Package 5
  {
    id: 5,
    title: "10kW Solar System (Vito/Ecco Inverter)",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: solar5,
    features: [
      "11kW Vito/Ecco Inverter",
      "2 x 5kW Sun/Ecco Batteries",
      "10 x 600W Solar Panels",
      "Installation & COC Included",
      "3 Year Warranty"
    ],
    oldPrice: "R87,900.00",
    price: "R79,900.00",
  },
  {
    id: 6,
    title: "5kW Solar System (Trendline)",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: solar6,
    features: [
      "5kW Luxpower Inverter",
      "5kW Svolt Lithium Ion Battery",
      "6 x 600W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    price: "R49,900.00",
  },
  {
    id: 7,
    title: "6kW Solar System (Flip the Switch)",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: solar7,
    features: [
      "6kW Luxpower Inverter",
      "2 x 5kW SVOLT/Sun Lithium Ion Battery",
      "8 x 600W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    price: "R69,900.00",
  },
  {
    id: 8,
    title: "5kW Solar System (Highline)",
    tag2: "Most Popular",
    image: solar8,
    features: [
      "5kW Sunsynk Inverter",
      "5kW Sunsynk Battery",
      "6 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    oldPrice: "R89,000.00",
    price: "R66,900.00",
  },
  // Image 2
  {
    id: 9,
    title: "6kW Deye Solar System",
    tag: "SPECIAL OFFER",
    tag2: "New!",
    tagColor: "bg-red-500",
    image: solar9,
    features: [
      "6kW Deye Hybrid Inverter",
      "2 x 5kW Deye/Dyness Lithium Batteries",
      "8 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    oldPrice: "R99,900.00",
    price: "R84,900.00",
  },
  {
    id: 10,
    title: "6kW Felicity Off-Grid System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar10,
    features: [
      "6kW Felicity Off-Grid Inverter",
      "10kW Felicity Lithium Battery",
      "8 x 585W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    price: "R63,900.00",
  },
  {
    id: 11,
    title: "8kw Sunsynk Solar System",
    image: solar11,
    features: [
      "8kW Sunsynk Inverter",
      "2 x 5kW Sunsynk Lithium Ion Battery",
      "10 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    oldPrice: "R122,500.00",
    price: "R109,900.00",
  },
  {
    id: 12,
    title: "10kW Sunsynk Solar System",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: solar12,
    features: [
      "10kW Sunsynk Inverter",
      "2 x 5kW Sunsynk Lit Ion Batteries",
      "12 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    price: "R119,900.00",
  },
  // Image 3
  {
    id: 13,
    title: "12kW Solar System (Luxpower Inverter)",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: solar13,
    features: [
      "2 x 6kW Luxpower Inverters",
      "3 x 5kW SVOLT/Sun Lithium Ion Batteries",
      "18 x 600W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    oldPrice: "R149,900.00",
    price: "R139,900.00",
  },
  {
    id: 14,
    title: "12kW Felicity Off-Grid System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar14,
    features: [
      "12kW Felicity Off-Grid Inverter",
      "10kW Felicity Lithium Battery",
      "10 x 585W Solar Panels",
      "Installation & COC Included",
      "5 Year Warranty"
    ],
    price: "R85,000.00",
  },
  {
    id: 15,
    title: "14kW Luxpower System",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: solar15,
    features: [
      "14kW Luxpower ECO Hybrid Inverter",
      "2 x 12kWh Felicity Batteries (25kWh Storage)",
      "20 x 600W Solar Panels",
      "Installation & COC Included",
      "Generates 1300–1500 kWh monthly",
      "2–3 years to break even",
      "5 Year Warranty"
    ],
    oldPrice: "R149,900.00",
    price: "R139,900.00",
  },
  {
    id: 16,
    title: "16kW Solar System (Deye - Off Grid System)",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: solar16,
    features: [
      "16kW Deye Hybrid Inverter",
      "4 x 5kW Deye/Dyness Lithium Batteries",
      "24 x 600W Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    oldPrice: "R199,900.00",
    price: "R169,900.00",
  },
  // Image 4
  {
    id: 17,
    title: "Sunsynk 16kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar17,
    features: [
      "16kW Sunsynk Inverter",
      "4 x 5kW Sunsynk Lithium Batteries",
      "24 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    price: "R199,000.00",
  },
  {
    id: 18,
    title: "Deye 20kW 3 Phase Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar18,
    features: [
      "20kW Deye 3 Phase Inverter",
      "2 x 14kW Dyness/Hina ESS Lithium Batteries",
      "36 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    price: "R249,900.00",
  },
  {
    id: 19,
    title: "Felicity 16kW 3-Phase Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar19,
    features: [
      "16kW 3-Phase Hybrid Inverter",
      "2 x 10kWh Lithium Batteries",
      "16 x 580W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    price: "R139,900.00",
  },
  {
    id: 20,
    title: "Felicity 20kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar20,
    features: [
      "20kW 3 Phase Hybrid Inverter",
      "25kWh Lithium Battery",
      "20 x 600W Solar Panels",
      "Installation & COC Included",
      "10 Year Warranty"
    ],
    price: "R159,900.00",
  },
  // Image 5
  {
    id: 21,
    title: "3.5kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: solar21,
    features: [
      "3.5kW Ecco Inverter",
      "2.7kW Svolt Battery",
      "3 x 450W Bifacial Solar Panels",
      "Installation & COC Included",
      "2 Year Warranty"
    ],
    price: "R29,900.00",
  },
  {
    id: 22,
    title: "5kW Solar System (Budget)",
    image: solar22,
    features: [
      "5kW Ecco Inverter",
      "5kW ECCO Batteries",
      "5 x 600W Solar Panels",
      "Installation & COC Included",
      "3 Year Warranty"
    ],
    price: "R39,900.00",
  },
  {
    id: 23,
    title: "5kW Backup System (Trendline)",
    image: solar23,
    features: [
      "5kW Luxpower Inverter",
      "5kW Svolt Lithium Ion Battery",
      "Installation & COC Included",
      "3 Year Warranty"
    ],
    oldPrice: "R38,000.00",
    price: "R29,900.00",
  },
];

function matchesFilter(pkg: any, filter: string): boolean {
  const searchText = (pkg.title + " " + pkg.features.join(" ")).toLowerCase();
  switch (filter) {
    case "All Packages": return true;
    case "3kW": return /3[\.]?5?kw/i.test(pkg.title);
    case "5kW": return /\b5kw\b/i.test(pkg.title);
    case "6kW": return /\b6kw\b/i.test(pkg.title);
    case "8kW": return /\b8kw\b/i.test(pkg.title);
    case "10kW": return /\b10kw\b/i.test(pkg.title);
    case "12kW": return /\b12kw\b/i.test(pkg.title);
    case "14kW": return /\b14kw\b/i.test(pkg.title);
    case "16kW": return /\b16kw\b/i.test(pkg.title);
    case "Deye/Dyness": return searchText.includes("deye") || searchText.includes("dyness");
    case "Luxpower": return searchText.includes("luxpower");
    case "Sunsynk": return searchText.includes("sunsynk");
    case "Special Offers": return pkg.tag === "SPECIAL OFFER";
    case "Most Popular": return pkg.tag2 === "Most Popular";
    default: return true;
  }
}

const PACKAGES_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solar System Packages South Africa",
    "serviceType": "Solar Energy Installation",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://www.govanelectrical.co.za/#business",
      "name": "Govan Electrical"
    },
    "description": "Browse 23+ solar system packages ranging from 3.5kW to 20kW. Brands include Deye, Sunsynk, Luxpower and Felicity. All packages include professional installation and COC certificate.",
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "offers": [
      { "@type": "Offer", "name": "3.5kW Solar System", "price": "29900", "priceCurrency": "ZAR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "5kW Solar System (Budget)", "price": "39900", "priceCurrency": "ZAR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "5kW Deye Solar System", "price": "57000", "priceCurrency": "ZAR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "8kW Felicity Solar System", "price": "74990", "priceCurrency": "ZAR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "10kW Luxpower Solar System", "price": "89900", "priceCurrency": "ZAR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "16kW Deye Off-Grid Solar System", "price": "169900", "priceCurrency": "ZAR", "availability": "https://schema.org/InStock" }
    ],
    "url": "https://www.govanelectrical.co.za/solar-packages"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.govanelectrical.co.za/" },
      { "@type": "ListItem", "position": 2, "name": "Solar Packages", "item": "https://www.govanelectrical.co.za/solar-packages" }
    ]
  }
];

export default function SolarPackages() {
  useSEO({
    title: "Solar System Packages & Prices Pretoria | Deye, Sunsynk, Luxpower | Govan Electrical",
    description: "Browse 23+ solar packages in Pretoria, Gauteng & South Africa. From R29,900. Systems from 3.5kW–20kW. Brands: Deye, Sunsynk, Luxpower, Felicity. Professional installation & CoC included. Beat load-shedding today.",
    keywords: "solar packages Pretoria, solar system prices South Africa, 5kW solar system price, 10kW solar system Gauteng, Deye solar South Africa, Sunsynk inverter price, Luxpower solar system, solar installation cost Pretoria, best solar packages South Africa 2026",
    canonical: "/solar-packages",
    schema: PACKAGES_SCHEMA,
  });

  const { openLeadForm } = useLeadForm();
  const [activeFilter, setActiveFilter] = useState("All Packages");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ lastName: "", phone: "", email: "", package: "", province: "", timeline: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.email) errors.email = "Email address is required";
    if (!formData.package) errors.package = "Please select a package";
    if (!formData.province) errors.province = "Please select your province";
    if (!formData.timeline) errors.timeline = "Please tell us your installation timeline";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
    setFormData({ lastName: "", phone: "", email: "", package: "", province: "", timeline: "" });
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 text-white text-center" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a2a2a 100%)` }}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Solar Packages</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Choose From Our <span style={{ color: ORANGE }}>Solar Systems</span>
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-80">
            From entry-level backup systems to full off-grid solar installations — we have a package for every budget and need.
          </p>
        </div>
      </section>

      <div className="py-10 md:py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Sub Header */}
          <h2 className="text-xl md:text-3xl font-extrabold mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <span style={{ color: ORANGE_DARK }}>Browse</span> <span style={{ color: NAVY }}>All Systems</span>
          </h2>
          <div className="w-24 md:w-40 h-1 mx-auto mb-6 md:mb-10" style={{ backgroundColor: ORANGE }} />

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 relative">
            <div className="flex w-full rounded-full border-2 overflow-hidden" style={{ borderColor: ORANGE }}>
              <div className="px-3 flex items-center justify-center" style={{ backgroundColor: ORANGE }}>
                <Search className="h-4 w-4" style={{ color: NAVY }} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages..."
                className="flex-1 py-2.5 px-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* Filters - horizontally scrollable on mobile */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2 justify-start md:justify-center md:flex-wrap scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full font-bold text-xs border-2 transition-colors whitespace-nowrap"
                  style={{
                    borderColor: ORANGE,
                    backgroundColor: isActive ? ORANGE : "white",
                    color: NAVY,
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {(() => {
            const filtered = PACKAGES.filter((pkg) => {
              const matchesSearch = searchQuery.trim() === "" ||
                (pkg.title + " " + pkg.features.join(" ")).toLowerCase().includes(searchQuery.toLowerCase());
              return matchesFilter(pkg, activeFilter) && matchesSearch;
            });
            return filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-xl font-bold">No packages found for "{activeFilter}"</p>
                <p className="text-sm mt-2">Try a different filter or search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className="border-2 rounded-xl overflow-hidden relative bg-white text-left shadow-md hover:shadow-xl transition-shadow flex flex-col"
                style={{ borderColor: "#E5E7EB" }}
              >
                {/* Tags */}
                <div className="absolute top-0 right-0 z-10 flex flex-col items-end">
                  {pkg.tag && (
                    <span className={`${pkg.tagColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg`}>
                      {pkg.tag}
                    </span>
                  )}
                  {pkg.tag2 && (
                    <span className={`bg-gray-800 text-white text-xs font-bold px-3 py-1 mt-1 rounded-l-lg shadow`}>
                      {pkg.tag2}
                    </span>
                  )}
                </div>

                {/* Image Placeholder */}
                <div className="h-64 bg-gray-50 flex items-center justify-center relative border-b-4 overflow-hidden" style={{ borderBottomColor: ORANGE }}>
                  {/* @ts-ignore */}
                  {pkg.image ? (
                    <img src={pkg.image} alt={`${pkg.title} — Solar System Package`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <Info size={40} className="mb-2 opacity-50" />
                      <p className="text-sm font-bold">Image Placeholder</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-4" style={{ color: NAVY }}>
                    {pkg.title}
                  </h3>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-orange-500 mt-0.5">⚡</span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Separator */}
                  <div className="h-px w-full bg-gray-200 mb-4" />

                  {/* Pricing & CTA */}
                  <div className="text-center mb-4">
                    {pkg.oldPrice && (
                      <span className="text-gray-400 line-through text-sm font-semibold mr-2">
                        {pkg.oldPrice}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold" style={{ color: ORANGE_DARK }}>
                      {pkg.price}
                    </span>
                  </div>
                  
                  <button
                    className="w-full py-2.5 rounded font-bold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ORANGE, color: NAVY }}
                    onClick={() => openLeadForm(pkg.title)}
                  >
                    Request A Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
            );
          })()}

          {/* Quote Form */}
          <div
            className="max-w-3xl mx-auto mt-20 mb-8 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
          >
            {/* Form header */}
            <div className="px-8 py-6 text-center" style={{ backgroundColor: NAVY }}>
              <h2 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Request a <span style={{ color: ORANGE }}>Free Quote</span>
              </h2>
              <p className="text-white opacity-70 text-sm">Fill in your details and we'll get back to you within 24 hours.</p>
            </div>

            <div className="bg-white px-8 py-8">
              {formSubmitted && (
                <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
                  ✓ Thank you! Your quote request was received. We'll be in touch within 24 hours.
                </div>
              )}
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    placeholder="Your Last Name"
                    className={`w-full p-3 border rounded outline-none transition-colors ${formErrors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    style={{ boxShadow: formErrors.lastName ? undefined : undefined }}
                    onFocus={(e) => { if (!formErrors.lastName) e.target.style.borderColor = ORANGE; }}
                    onBlur={(e) => { e.target.style.borderColor = formErrors.lastName ? "#ef4444" : "#d1d5db"; }}
                  />
                  {formErrors.lastName && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.lastName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="e.g. 082 123 4567"
                    className={`w-full p-3 border rounded outline-none transition-colors ${formErrors.phone ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    onFocus={(e) => { if (!formErrors.phone) e.target.style.borderColor = ORANGE; }}
                    onBlur={(e) => { e.target.style.borderColor = formErrors.phone ? "#ef4444" : "#d1d5db"; }}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                      className={`w-full p-3 pl-10 border rounded outline-none transition-colors ${formErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                      onFocus={(e) => { if (!formErrors.email) e.target.style.borderColor = ORANGE; }}
                      onBlur={(e) => { e.target.style.borderColor = formErrors.email ? "#ef4444" : "#d1d5db"; }}
                    />
                  </div>
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.email}</p>}
                </div>

                {/* Select Package */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Interested Package *</label>
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleFormChange}
                    className={`w-full p-3 border rounded outline-none bg-white transition-colors ${formErrors.package ? "border-red-500 bg-red-50" : "border-gray-300"} ${!formData.package ? "text-gray-400" : "text-gray-800"}`}
                    onFocus={(e) => { if (!formErrors.package) e.target.style.borderColor = ORANGE; }}
                    onBlur={(e) => { e.target.style.borderColor = formErrors.package ? "#ef4444" : "#d1d5db"; }}
                  >
                    <option value="" disabled>Select a package</option>
                    {PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.title} className="text-gray-800">
                        {pkg.title} — {pkg.price}
                      </option>
                    ))}
                  </select>
                  {formErrors.package && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.package}</p>}
                </div>

                {/* Province */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Your Province *</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleFormChange}
                    className={`w-full p-3 border rounded outline-none bg-white transition-colors ${formErrors.province ? "border-red-500 bg-red-50" : "border-gray-300"} ${!formData.province ? "text-gray-400" : "text-gray-800"}`}
                    onFocus={(e) => { if (!formErrors.province) e.target.style.borderColor = ORANGE; }}
                    onBlur={(e) => { e.target.style.borderColor = formErrors.province ? "#ef4444" : "#d1d5db"; }}
                  >
                    <option value="" disabled>Select your province</option>
                    {["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"].map(prov => (
                      <option key={prov} value={prov} className="text-gray-800">{prov}</option>
                    ))}
                  </select>
                  {formErrors.province && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.province}</p>}
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">When Do You Need Installation? *</label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleFormChange}
                    placeholder="e.g. Within the next 2 weeks"
                    className={`w-full p-3 border rounded outline-none transition-colors ${formErrors.timeline ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    onFocus={(e) => { if (!formErrors.timeline) e.target.style.borderColor = ORANGE; }}
                    onBlur={(e) => { e.target.style.borderColor = formErrors.timeline ? "#ef4444" : "#d1d5db"; }}
                  />
                  {formErrors.timeline && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.timeline}</p>}
                </div>

                {/* Submit */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="px-10 py-3.5 rounded-lg font-bold text-white transition-opacity hover:opacity-90 w-full sm:w-auto min-w-[220px] text-sm uppercase tracking-wide"
                    style={{ backgroundColor: ACTION_GREEN }}
                  >
                    Let's Go Green 🌱
                  </button>
                  <p className="mt-4 text-sm italic font-medium text-gray-600">
                    We will beat any written quote from a reputable company!
                  </p>
                  <p className="mt-3 text-xs text-gray-400">
                    Your information is protected under POPIA. We never share your personal details with third parties.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* New Process & Why Choose Us Section */}
          <div className="mt-20 grid md:grid-cols-2 gap-8 text-left">
            {/* Our Process */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-t-4" style={{ borderTopColor: ORANGE }}>
              <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span style={{ color: ORANGE_DARK }}>Our</span> <span style={{ color: NAVY }}>Process</span>
              </h2>
              <div className="w-24 h-1 mb-8" style={{ backgroundColor: ORANGE }} />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: ORANGE_DARK }}>Step 1:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Do you have a system in mind? Contact us to discuss specifications and to make sure our systems are a fit for your needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: ORANGE_DARK }}>Step 2:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    After our experts have talked with you and you are sure of the system you want to purchase, you decide on your installation date.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: ORANGE_DARK }}>Step 3:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We'll send you an invoice and your installation commences at your earliest convenience!
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Govan Electrical */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-t-4" style={{ borderTopColor: ORANGE }}>
              <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span style={{ color: ORANGE_DARK }}>Why Choose</span> <span style={{ color: NAVY }}>Govan Electrical</span>
              </h2>
              <div className="w-24 h-1 mb-8" style={{ backgroundColor: ORANGE }} />
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: ORANGE_DARK }}>
                Experience the Govan Advantage
              </h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We are experts in the Solar & Electrical industry with years of experience. We only deliver the best quality products and service to our community at reasonable prices. Loadshedding has seemed to become the new normal in South Africa and Govan Electrical strives to bring back the light and give the power back in your hands.
                </p>
                <p>
                  All our systems are fully upgradable to larger systems which means even if you just choose a backup system for now you can later decide to upgrade to a full solar system. Our installation process is made simple and efficient to benefit you as home or business owner to the fullest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
