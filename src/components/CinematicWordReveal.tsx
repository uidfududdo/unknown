import React from "react";
import { motion } from "motion/react";

interface CinematicWordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDuration?: number;
}

export default function CinematicWordReveal({
  text,
  className = "",
  delay = 0,
  wordDuration = 0.6,
}: CinematicWordRevealProps) {
  // Split words by space to animate them layout-agnostically
  const words = text.split(/\s+/);

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    initial: {
      opacity: 0,
      y: 10,
      filter: "blur(3px)",
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: wordDuration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      className={`inline-flex flex-wrap leading-relaxed ${className}`}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {words.map((word, idx) => {
        // Leave trailing spaces for inline-flex layout Flow wrap
        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={wordVariants}
            className="inline-block whitespace-pre mr-[0.25em]"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
