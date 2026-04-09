import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white-primary rounded-2xl max-w-sm w-full overflow-hidden py-6 px-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};