import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  closeModal: () => void;
}
export default function Modal({ children, open, closeModal }: Props) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [open]);

  return (
    <div onClick={closeModal} className={`modalBox ${!open ? "hide" : ""}`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContent"
      >
        {children}
      </div>
    </div>
  );
}
