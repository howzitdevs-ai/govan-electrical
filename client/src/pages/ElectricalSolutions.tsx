import { Layout } from "@/components/Layout";
import { Zap, CheckCircle } from "lucide-react";

export default function ElectricalSolutions() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Electrical <span style={{ color: "#FFD700" }}>Solutions</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            Comprehensive electrical services for residential, commercial, and industrial properties.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Expert Electrical Services</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              From new installations and wiring to complex industrial fault finding, our certified electricians deliver safe, compliant, and high-quality electrical solutions. We ensure that your electrical systems are efficient, reliable, and up to code.
            </p>
            <ul className="space-y-4">
              {[
                "Full Residential & Commercial Wiring",
                "Distribution Board (DB) Upgrades & Repairs",
                "Industrial Electrical Contracting",
                "Fault Finding & Diagnostics",
                "Compliance Certificates (CoC)",
                "Lighting Design & Installation"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-[#B8860B] mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg p-12 flex justify-center items-center shadow-inner">
            <Zap size={120} className="text-[#FFD700] opacity-80" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
