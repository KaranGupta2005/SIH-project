import { useState } from "react";
import { motion } from "motion/react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ text: "", type: "" });

    if (!form.name || !form.email || !form.message) {
      setStatus({ text: "Please fill all required fields.", type: "error" });
      setLoading(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 1000));
    setStatus({ text: `Thanks ${form.name}! We'll respond within 24 hours.`, type: "success" });
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const contactInfo = [
    { label: "Email", value: "contact@mysticsikkim.com", href: "mailto:contact@mysticsikkim.com" },
    { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { label: "Office", value: "Gangtok, Sikkim, India", href: null },
    { label: "Hours", value: "Mon–Sat, 9 AM – 6 PM IST", href: null },
  ];

  const faqs = [
    { q: "Do I need permits to visit monasteries?", a: "Most monasteries are free to visit. North Sikkim requires ILP. Check our Travel Guide for details." },
    { q: "Can I take photos inside monasteries?", a: "Photography rules vary. Always ask permission before photographing prayer halls or monks." },
    { q: "Is the platform free to use?", a: "Yes, MysticSikkim is completely free for all users." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-50 pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-200 tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 text-amber-400/60 max-w-lg mx-auto">
            Questions, feedback, or collaboration ideas? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — takes 3 columns */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-stone-800/40 border border-amber-800/30 rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-1.5 block">Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required disabled={loading}
                  className="w-full px-4 py-3 bg-stone-700/40 border border-amber-800/30 rounded-xl text-amber-100 placeholder-amber-600/40 text-sm focus:outline-none focus:border-amber-600/60 transition-colors disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-1.5 block">Email *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required disabled={loading}
                  className="w-full px-4 py-3 bg-stone-700/40 border border-amber-800/30 rounded-xl text-amber-100 placeholder-amber-600/40 text-sm focus:outline-none focus:border-amber-600/60 transition-colors disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-1.5 block">Subject</label>
              <input
                name="subject" value={form.subject} onChange={handleChange} disabled={loading}
                className="w-full px-4 py-3 bg-stone-700/40 border border-amber-800/30 rounded-xl text-amber-100 placeholder-amber-600/40 text-sm focus:outline-none focus:border-amber-600/60 transition-colors disabled:opacity-50"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-1.5 block">Message *</label>
              <textarea
                name="message" rows={5} value={form.message} onChange={handleChange} required disabled={loading}
                className="w-full px-4 py-3 bg-stone-700/40 border border-amber-800/30 rounded-xl text-amber-100 placeholder-amber-600/40 text-sm focus:outline-none focus:border-amber-600/60 transition-colors resize-none disabled:opacity-50"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-600/20"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status.text && (
              <p className={`text-sm text-center ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {status.text}
              </p>
            )}
          </motion.form>

          {/* Sidebar — takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info */}
            <div className="bg-stone-800/40 border border-amber-800/30 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">Contact Info</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-amber-500/60">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-amber-200 hover:text-amber-100 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-amber-200">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-stone-800/40 border border-amber-800/30 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">Quick FAQ</h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-amber-200">{faq.q}</p>
                    <p className="text-xs text-amber-400/60 mt-1 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
