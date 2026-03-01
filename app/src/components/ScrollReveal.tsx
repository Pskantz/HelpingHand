import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.5,
  direction = 'up'
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const directionOffset = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: 24 },
    right: { y: 0, x: -24 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration, 
        delay, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] as const,
          }
        },
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
