import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  errorMsg: string;
  isSuccess: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?",
  errorMsg,
  isSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-between gap-2 min-h-[200px] bg-white rounded-lg p-4 shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-center">Confirm Delete</h2>
        <p className="text-center  text-gray-700">{message}</p>
        {isSuccess ? (
          <p className="text-center text-[14px] font-bold text-green-500 ">
            Delete successfully
          </p>
        ) : (
          errorMsg && (
            <p className="text-center text-[14px]  font-bold text-red-500 ">
              {errorMsg}
            </p>
          )
        )}
        <div className="flex justify-end mt-2 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
