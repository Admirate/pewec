"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type SuccessConfirmationProps = {
  message: string;
  subtitle: string;
  onClose: () => void;
  autoCloseMs?: number;
};

export default function SuccessConfirmation({
  message,
  subtitle,
  onClose,
  autoCloseMs = 5000,
}: SuccessConfirmationProps) {
  const [elapsed, setElapsed] = useState(0);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Tick the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 50, autoCloseMs));
    }, 50);

    return () => clearInterval(interval);
  }, [autoCloseMs]);

  // Fire onClose when timer completes
  useEffect(() => {
    if (elapsed >= autoCloseMs) {
      onCloseRef.current();
    }
  }, [elapsed, autoCloseMs]);

  const progress = Math.max(0, 1 - elapsed / autoCloseMs);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${mulish.className} flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 lg:py-28 px-4`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[#006457] mb-6" strokeWidth={1.5} />
      </motion.div>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
        {message}
      </h3>

      <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8">{subtitle}</p>

      <button
        onClick={onClose}
        className="text-sm sm:text-base text-[#006457] hover:text-[#05443c] font-medium underline underline-offset-4 transition mb-8"
      >
        Close
      </button>

      {/* Auto-close progress bar */}
      <div className="w-32 sm:w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#006457] rounded-full"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </motion.div>
  );
}
