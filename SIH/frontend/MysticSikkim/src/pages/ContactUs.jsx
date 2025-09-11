import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesArrayRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 0 });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Particle initialization
  const initParticles = useCallback((canvas) => {
    particlesArrayRef.current = [];
    const numberOfParticles = Math.min(
      150,
      (canvas.height * canvas.width) / 12000
    );

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (canvas.width - size * 2) + size;
      const y = Math.random() * (canvas.height - size * 2) + size;
      const directionX = (Math.random() - 0.5) * 0.4;
      const directionY = (Math.random() - 0.5) * 0.4;

      particlesArrayRef.current.push({
        x,
        y,
        directionX,
        directionY,
        size,
        color: "rgba(245, 158, 11, 0.4)",
      });
    }
  }, []);

  const updateParticle = useCallback((particle, canvas, mouse) => {
    if (particle.x > canvas.width || particle.x < 0) particle.directionX = -particle.directionX;
    if (particle.y > canvas.height || particle.y < 0) particle.directionY = -particle.directionY;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + particle.size) {
        const force = (mouse.radius + particle.size - distance) / (mouse.radius + particle.size);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        particle.x -= forceDirectionX * force * 3;
        particle.y -= forceDirectionY * force * 3;
      }
    }

    particle.x += particle.directionX;
    particle.y += particle.directionY;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArrayRef.current.forEach((particle) => {
      updateParticle(particle, canvas, mouseRef.current);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [updateParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouseRef.current.radius = Math.min(80, (canvas.height * canvas.width) / 15000);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseRef.current.radius = Math.min(80, (canvas.height * canvas.width) / 15000);
      initParticles(canvas);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    initParticles(canvas);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [initParticles, animate]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
      if (formMessage.text) setFormMessage({ text: "", type: "" });
    },
    [formMessage.text]
  );

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormMessage({ text: "Please fill out all fields.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formState.email)) {
      setFormMessage({ text: "Please enter a valid email address.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate sending
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormMessage({ text: `Thank you, ${formState.name}! We'll be in touch within 24 hours.`, type: "success" });
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setFormMessage({ text: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => setFormMessage({ text: "", type: "" }), 5000);
  };

  const messageClasses = useMemo(() => {
    if (!formMessage.text) return "opacity-0";
    return formMessage.type === "success" ? "text-green-400 opacity-100" : "text-red-400 opacity-100";
  }, [formMessage]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      <div className="relative min-h-screen w-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-700 to-yellow-600"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 backdrop-blur-xl bg-black/50 border border-amber-500/40"
          >
            <header className="text-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-serif font-extrabold text-amber-400 tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]"
              >
                Get in Touch
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 text-lg md:text-xl font-serif italic bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]"
              >
                Let's Start a Conversation
              </motion.p>
            </header>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Contact Form */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {["name", "email", "message"].map((field, idx) =>
                  field === "message" ? (
                    <textarea
                      key={idx}
                      name="message"
                      rows="4"
                      required
                      placeholder="Your Message..."
                      value={formState.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="form-input w-full px-4 py-3 bg-amber-900/50 rounded-lg text-white placeholder-yellow-200/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 resize-none disabled:opacity-50"
                    />
                  ) : (
                    <input
                      key={idx}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      required
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      value={formState[field]}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="form-input w-full px-4 py-3 bg-amber-900/50 rounded-lg text-white placeholder-yellow-200/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 disabled:opacity-50"
                    />
                  )
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-amber-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: formMessage.text ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-2 text-center ${messageClasses}`}
                  role={formMessage.type === "error" ? "alert" : "status"}
                >
                  {formMessage.text}
                </motion.div>
              </form>

              {/* Contact Info */}
              <motion.address
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-amber-100/80 space-y-6 pt-2 not-italic"
              >
                <div>
                  <p className="font-semibold text-amber-200 mb-1">Our Office</p>
                  <p className="text-sm leading-relaxed">123 Connaught Place, New Delhi</p>
                  <p className="text-sm leading-relaxed">Delhi, 110001, India</p>
                </div>

                <div>
                  <p className="font-semibold text-amber-200 mb-1">Email Us</p>
                  <a
                    href="mailto:contact@mysticsikkim.com"
                    className="text-sm hover:text-yellow-400 transition-colors"
                  >
                    contact@mysticsikkim.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-amber-200 mb-1">Call Us</p>
                  <a
                    href="tel:+919876543210"
                    className="text-sm hover:text-yellow-400 transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>

                <div className="pt-4 border-t border-amber-700/50">
                  <p className="text-xs text-amber-200/60 text-center">
                    We typically respond within 24 hours
                  </p>
                </div>
              </motion.address>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
