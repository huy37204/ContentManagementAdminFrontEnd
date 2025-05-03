import React from "react";

interface TextModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const TextModal: React.FC<TextModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default TextModal;
