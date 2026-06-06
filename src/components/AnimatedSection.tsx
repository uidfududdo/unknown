import { ReactNode } from "react";
import { motion, Variants } from "motion/react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "slide-up" | "slide-left" | "slide-right" | "zoom" | "fade" | "stagger-container";
}

// Cinematic ease-out curve (fluid, quick response with custom micro-deceleration)
export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

// Shareable child item variants for staggered parent grids
export const itemVariants: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: CINEMATIC_EASE,
    },
  },
};

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  variant = "slide-up",
}: AnimatedSectionProps) {
  const getVariants = (): Variants => {
    switch (variant) {
      case "slide-left":
        return {
          initial: { opacity: 0, x: -60, filter: "blur(8px)" },
          whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
        };
      case "slide-right":
        return {
          initial: { opacity: 0, x: 60, filter: "blur(8px)" },
          whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
        };
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.88, filter: "blur(12px)" },
          whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
        };
      case "fade":
        return {
          initial: { opacity: 0, filter: "blur(4px)" },
          whileInView: { opacity: 1, filter: "blur(0px)" },
        };
      case "stagger-container":
        return {
          initial: { opacity: 0 },
          whileInView: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: delay,
            },
          },
        };
      case "slide-up":
      default:
        return {
          initial: { opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        };
    }
  };

  const activeVariants = getVariants();

  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, amount: 0.12, margin: "-60px 0px -60px 0px" }}
      variants={activeVariants}
      className={className}
      transition={
        variant !== "stagger-container"
          ? {
              duration: 1.8,
              ease: CINEMATIC_EASE,
              delay,
            }
          : undefined
      }
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedItem({ children, className = "" }: AnimatedItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}
