import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  yDistance = 50,
  duration = 0.8,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
