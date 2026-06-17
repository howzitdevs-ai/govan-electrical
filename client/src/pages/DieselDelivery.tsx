import { Layout } from "@/components/Layout";
import { Settings, CheckCircle } from "lucide-react";

export default function DieselDelivery() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Diesel <span style={{ color: "#FFD700" }}>Delivery</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            Prompt, reliable bulk diesel delivery for generators and industrial equipment to keep you running.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Keeping Your Business Moving</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Don't let fuel shortages disrupt your operations. Govan Electrical offers dependable diesel supply and delivery services directly to your premises. Whether you need fuel for backup generators, construction sites, or industrial machinery, we've got you covered.
            </p>
            <ul className="space-y-4">
              {[
                "Bulk Diesel Supply & Delivery",
                "Generator Refueling Services",
                "Scheduled Delivery Plans",
                "Emergency Refueling Response",
                "High-Quality, Clean Diesel Supply"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-[#B8860B] mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg p-12 flex justify-center items-center shadow-inner">
            <Settings size={120} className="text-[#FFD700] opacity-80" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
