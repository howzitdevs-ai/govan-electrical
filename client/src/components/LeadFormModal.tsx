import { useState, useEffect } from "react";
import { X, Phone, Mail, MapPin, User, CheckCircle } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { submitLead } from "@/lib/web3forms";

const NAVY = "#1A1A1A";
const ORANGE = "#FFD700";
const ORANGE_DARK = "#B8860B";
const ACTION_GREEN = "#4CAF50";

const SERVICES = [
  "Solar Panel Installation",
  "Battery Backup / Inverter System",
  "Hybrid Solar System",
  "Electrical Installations & Wiring",
  "DB Board Upgrade",
  "Fault Finding & Repairs",
  "Compliance Certificate (CoC)",
  "Diesel Power Generator",
  "Industrial Electrical",
  "Other / Not Sure Yet",
];

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  province: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const empty: FormData = { name: "", phone: "", email: "", service: "", province: "", message: "" };

export function LeadFormModal() {
  const { isOpen, prefilledService, closeLeadForm } = useLeadForm();
  const [formData, setFormData] = useState<FormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Sync prefilled service whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...empty, service: prefilledService });
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen, prefilledService]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeLeadForm(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLeadForm]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.email.trim()) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email address";
    if (!formData.service) e.service = "Please select a service";
    if (!formData.province) e.province = "Please select your province";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setSubmitError("");
    try {
      await submitLead({
        subject: `New Quote Request — ${formData.service} (${formData.province})`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        province: formData.province,
        message: formData.message || "No additional details provided.",
      });
      setSubmitted(true);
      setTimeout(() => { closeLeadForm(); }, 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("[Web3Forms]", msg);
      setSubmitError(`Could not send your request: ${msg}. Please call us on 012 023 3410.`);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (key: keyof FormData) =>
    `w-full p-3 border rounded-lg outline-none text-sm transition-colors ${
      errors[key] ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-yellow-400"
    }`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) closeLeadForm(); }}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
        style={{ backgroundColor: "#fff" }}
      >
        {/* Header */}
        <div className="px-7 py-6 flex items-start justify-between" style={{ backgroundColor: NAVY }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>
              Free Quote
            </p>
            <h2 className="text-2xl font-extrabold text-white leading-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Let's Get You <span style={{ color: ORANGE }}>Powered Up</span>
            </h2>
            <p className="text-white opacity-60 text-sm mt-1">
              We'll call you back within 2 hours during business hours.
            </p>
          </div>
          <button
            onClick={closeLeadForm}
            className="ml-4 mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-white/20"
            style={{ color: "rgba(255,255,255,0.7)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-7 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${ACTION_GREEN}18` }}
              >
                <CheckCircle size={36} style={{ color: ACTION_GREEN }} />
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: NAVY, fontFamily: "Montserrat, sans-serif" }}>
                Request Received!
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Thank you! A member of our team will contact you within 2 hours during business hours.
              </p>
              <div className="flex flex-col items-center gap-2 mt-2">
                <a href="tel:+27120233410" className="flex items-center gap-2 text-sm font-bold" style={{ color: ORANGE_DARK }}>
                  <Phone size={15} /> 012 023 3410
                </a>
                <a href="tel:+27711863732" className="flex items-center gap-2 text-sm font-bold" style={{ color: ORANGE_DARK }}>
                  <Phone size={15} /> 071 186 3732
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Smith"
                    className={fieldClass("name") + " pl-9"}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone + Email side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Phone <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="082 123 4567"
                      className={fieldClass("phone") + " pl-9"}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className={fieldClass("email") + " pl-9"}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Service Required <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={fieldClass("service") + (!formData.service ? " text-gray-400" : " text-gray-800")}
                >
                  <option value="" disabled>Select a service…</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="text-gray-800">{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Province */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Province <span style={{ color: "red" }}>*</span>
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={fieldClass("province") + " pl-9" + (!formData.province ? " text-gray-400" : " text-gray-800")}
                  >
                    <option value="" disabled>Select your province…</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p} className="text-gray-800">{p}</option>
                    ))}
                  </select>
                </div>
                {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Additional Details <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project, property size, or any questions…"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm resize-none focus:border-yellow-400 transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90 mt-2 disabled:opacity-60"
                style={{ backgroundColor: ORANGE, color: NAVY }}
              >
                {loading ? "Sending…" : "Request My Free Quote"}
              </button>
              {submitError && (
                <p className="text-red-500 text-xs text-center">{submitError}</p>
              )}

              {/* Contact alternatives */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">or reach us directly</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="flex gap-3">
                <a
                  href="tel:+27120233410"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  <Phone size={13} /> 012 023 3410
                </a>
                <a
                  href="https://wa.me/27711863732"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>

              <p className="text-xs text-center text-gray-400 pb-1">
                Your information is protected under POPIA. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
