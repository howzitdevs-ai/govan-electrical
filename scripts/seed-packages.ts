// One-time seed: transcribes the 23 packages that used to be hardcoded in
// client/src/pages/SolarPackages.tsx into the Neon `packages` table.
//
// Run with: pnpm run seed:packages
//
// Categories are derived by re-running the OLD regex-based matchesFilter
// logic (copied below) against each package/filter pair, so the new
// structured `categories` column reproduces the old filter behavior exactly.

import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { PACKAGE_CATEGORIES } from "../shared/packageCategories";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set (add it to .env)");
}
const sql = neon(process.env.DATABASE_URL);

interface SeedPackage {
  title: string;
  tag?: string;
  tag2?: string;
  tagColor?: string;
  image: string; // filename only, e.g. "solar-3.png"
  features: string[];
  oldPrice?: string; // "R59,900.00"
  price: string; // "R57,000.00"
}

// --- old regex-based filter logic, copied verbatim for category derivation ---
function matchesOldFilter(pkg: SeedPackage, filterLabel: string): boolean {
  const searchText = (pkg.title + " " + pkg.features.join(" ")).toLowerCase();
  switch (filterLabel) {
    case "3kW": return /3[.]?5?kw/i.test(pkg.title);
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
    default: return false;
  }
}

function priceStringToCents(price: string): number {
  const numeric = price.replace(/[^0-9.]/g, "");
  return Math.round(parseFloat(numeric) * 100);
}

function deriveCategories(pkg: SeedPackage): string[] {
  return PACKAGE_CATEGORIES.filter((cat) => matchesOldFilter(pkg, cat.label)).map((cat) => cat.slug);
}

// --- the 23 packages, transcribed from the old PACKAGES array ---
const SEED_PACKAGES: SeedPackage[] = [
  {
    title: "Felicity 5kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-1.png",
    features: ["5kW Felicity Hybrid Inverter", "5kWh Lithium Battery", "5 x 600W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    price: "R49,900.00",
  },
  {
    title: "Felicity 8kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-2.png",
    features: ["8kW Felicity Inverter", "10kw Lithium Battery", "8 x 600W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    price: "R74,990.00",
  },
  {
    title: "5kw Deye System",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: "solar-3.png",
    features: ["5kW Deye Inverter", "5kW Deye/Dyness Lithium Battery", "6 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    oldPrice: "R59,900.00",
    price: "R57,000.00",
  },
  {
    title: "10kw Luxpower System",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: "solar-4.jpg",
    features: ["2 x 5kW Luxpower Inverter", "2 x 5kW SVOLT/SUN Lithium Battery", "12 x 600W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    oldPrice: "R94,900.00",
    price: "R89,900.00",
  },
  {
    title: "10kW Solar System (Vito/Ecco Inverter)",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: "solar-5.png",
    features: ["11kW Vito/Ecco Inverter", "2 x 5kW Sun/Ecco Batteries", "10 x 600W Solar Panels", "Installation & COC Included", "3 Year Warranty"],
    oldPrice: "R87,900.00",
    price: "R79,900.00",
  },
  {
    title: "5kW Solar System (Trendline)",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: "solar-6.jpg",
    features: ["5kW Luxpower Inverter", "5kW Svolt Lithium Ion Battery", "6 x 600W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    price: "R49,900.00",
  },
  {
    title: "6kW Solar System (Flip the Switch)",
    tag: "SPECIAL OFFER",
    tag2: "Most Popular",
    tagColor: "bg-red-500",
    image: "solar-7.jpg",
    features: ["6kW Luxpower Inverter", "2 x 5kW SVOLT/Sun Lithium Ion Battery", "8 x 600W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    price: "R69,900.00",
  },
  {
    title: "5kW Solar System (Highline)",
    tag2: "Most Popular",
    image: "solar-8.jpg",
    features: ["5kW Sunsynk Inverter", "5kW Sunsynk Battery", "6 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    oldPrice: "R89,000.00",
    price: "R66,900.00",
  },
  {
    title: "6kW Deye Solar System",
    tag: "SPECIAL OFFER",
    tag2: "New!",
    tagColor: "bg-red-500",
    image: "solar-9.png",
    features: ["6kW Deye Hybrid Inverter", "2 x 5kW Deye/Dyness Lithium Batteries", "8 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    oldPrice: "R99,900.00",
    price: "R84,900.00",
  },
  {
    title: "6kW Felicity Off-Grid System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-10.png",
    features: ["6kW Felicity Off-Grid Inverter", "10kW Felicity Lithium Battery", "8 x 585W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    price: "R63,900.00",
  },
  {
    title: "8kw Sunsynk Solar System",
    image: "solar-11.jpg",
    features: ["8kW Sunsynk Inverter", "2 x 5kW Sunsynk Lithium Ion Battery", "10 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    oldPrice: "R122,500.00",
    price: "R109,900.00",
  },
  {
    title: "10kW Sunsynk Solar System",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: "solar-12.jpg",
    features: ["10kW Sunsynk Inverter", "2 x 5kW Sunsynk Lit Ion Batteries", "12 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    price: "R119,900.00",
  },
  {
    title: "12kW Solar System (Luxpower Inverter)",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: "solar-13.jpg",
    features: ["2 x 6kW Luxpower Inverters", "3 x 5kW SVOLT/Sun Lithium Ion Batteries", "18 x 600W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    oldPrice: "R149,900.00",
    price: "R139,900.00",
  },
  {
    title: "12kW Felicity Off-Grid System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-14.jpg",
    features: ["12kW Felicity Off-Grid Inverter", "10kW Felicity Lithium Battery", "10 x 585W Solar Panels", "Installation & COC Included", "5 Year Warranty"],
    price: "R85,000.00",
  },
  {
    title: "14kW Luxpower System",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: "solar-15.jpg",
    features: [
      "14kW Luxpower ECO Hybrid Inverter",
      "2 x 12kWh Felicity Batteries (25kWh Storage)",
      "20 x 600W Solar Panels",
      "Installation & COC Included",
      "Generates 1300–1500 kWh monthly",
      "2–3 years to break even",
      "5 Year Warranty",
    ],
    oldPrice: "R149,900.00",
    price: "R139,900.00",
  },
  {
    title: "16kW Solar System (Deye - Off Grid System)",
    tag: "SPECIAL OFFER",
    tagColor: "bg-red-500",
    image: "solar-16.jpg",
    features: ["16kW Deye Hybrid Inverter", "4 x 5kW Deye/Dyness Lithium Batteries", "24 x 600W Panels", "Installation & COC Included", "10 Year Warranty"],
    oldPrice: "R199,900.00",
    price: "R169,900.00",
  },
  {
    title: "Sunsynk 16kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-17.jpg",
    features: ["16kW Sunsynk Inverter", "4 x 5kW Sunsynk Lithium Batteries", "24 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    price: "R199,000.00",
  },
  {
    title: "Deye 20kW 3 Phase Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-18.png",
    features: ["20kW Deye 3 Phase Inverter", "2 x 14kW Dyness/Hina ESS Lithium Batteries", "36 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    price: "R249,900.00",
  },
  {
    title: "Felicity 16kW 3-Phase Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-19.png",
    features: ["16kW 3-Phase Hybrid Inverter", "2 x 10kWh Lithium Batteries", "16 x 580W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    price: "R139,900.00",
  },
  {
    title: "Felicity 20kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-20.jpg",
    features: ["20kW 3 Phase Hybrid Inverter", "25kWh Lithium Battery", "20 x 600W Solar Panels", "Installation & COC Included", "10 Year Warranty"],
    price: "R159,900.00",
  },
  {
    title: "3.5kW Solar System",
    tag: "New!",
    tagColor: "bg-orange-500",
    image: "solar-21.png",
    features: ["3.5kW Ecco Inverter", "2.7kW Svolt Battery", "3 x 450W Bifacial Solar Panels", "Installation & COC Included", "2 Year Warranty"],
    price: "R29,900.00",
  },
  {
    title: "5kW Solar System (Budget)",
    image: "solar-22.png",
    features: ["5kW Ecco Inverter", "5kW ECCO Batteries", "5 x 600W Solar Panels", "Installation & COC Included", "3 Year Warranty"],
    price: "R39,900.00",
  },
  {
    title: "5kW Backup System (Trendline)",
    image: "solar-23.png",
    features: ["5kW Luxpower Inverter", "5kW Svolt Lithium Ion Battery", "Installation & COC Included", "3 Year Warranty"],
    oldPrice: "R38,000.00",
    price: "R29,900.00",
  },
];

async function main() {
  console.log(`Seeding ${SEED_PACKAGES.length} packages...`);

  // Idempotent for reruns during development.
  await sql(`truncate table packages restart identity`);

  for (let i = 0; i < SEED_PACKAGES.length; i++) {
    const pkg = SEED_PACKAGES[i];
    const categories = deriveCategories(pkg);
    await sql(
      `insert into packages
         (title, tag, tag2, tag_color, image_url, features, price_cents, old_price_cents, categories, sort_order, is_active)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)`,
      [
        pkg.title,
        pkg.tag ?? null,
        pkg.tag2 ?? null,
        pkg.tagColor ?? null,
        `/images/solar-packages/${pkg.image}`,
        pkg.features,
        priceStringToCents(pkg.price),
        pkg.oldPrice ? priceStringToCents(pkg.oldPrice) : null,
        categories,
        i,
      ]
    );
    console.log(`  ✓ ${pkg.title}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
