"use client";

import { useState, createContext, useContext } from "react";
import Modal from "@/components/Modal";
import CourseEnquiryForm from "@/components/CourseEnquiryForm";

type EnquiryContextValue = {
  openModal: (courseName?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue>({
  openModal: () => {},
});

export const useEnquiryModal = () => useContext(EnquiryContext);

export default function GlobalEnquiryModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialCourseName, setInitialCourseName] = useState<string | undefined>(undefined);

  const openModal = (courseName?: string) => {
    setInitialCourseName(courseName);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setInitialCourseName(undefined);
  };

  return (
    <EnquiryContext.Provider value={{ openModal }}>
      {children}

      <Modal open={open} onClose={closeModal}>
        <CourseEnquiryForm initialCourseName={initialCourseName} onSuccess={closeModal} />
      </Modal>
    </EnquiryContext.Provider>
  );
}
