"use client";

import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 px-4">
      {/* CLICK OUTSIDE CLOSE */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL BOX */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] z-10">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
