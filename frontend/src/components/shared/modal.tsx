import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  children,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-75 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg">
        {isOpen && children}
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={onClose}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
