"use client";

import { useState, createContext, useContext } from "react";
import Modal from "@/components/Modal";
import CourseEnquiryForm from "@/components/CourseEnquiryForm";

const EnquiryContext = createContext({
  openModal: () => {},
});

export const useEnquiryModal = () => useContext(EnquiryContext);

export default function GlobalEnquiryModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <EnquiryContext.Provider value={{ openModal }}>
      {children}

      <Modal open={open} onClose={closeModal}>
        <CourseEnquiryForm onSuccess={closeModal} />
      </Modal>
    </EnquiryContext.Provider>
  );
}
