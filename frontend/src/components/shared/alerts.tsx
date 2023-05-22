import React from "react";

interface AlertProps {
  message: string;
}

export const InfoAlert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-white rounded-lg bg-blue-800 "
      role="alert"
    >
      {message}
    </div>
  );
};

export const ErrorAlert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-white rounded-lg bg-red-800 "
      role="alert"
    >
      {message}
    </div>
  );
};

interface AlertProps {
  message: string;
}

export const SuccessAlert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-white rounded-lg bg-green-800 "
      role="alert"
    >
      {message}
    </div>
  );
};
