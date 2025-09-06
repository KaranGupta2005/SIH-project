import { motion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  yDistance = 50,
  xDistance = 0,
  duration = 0.8,
  once = true,
  amount = 0.2,
  ease = "easeOut",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yDistance, x: xDistance }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
