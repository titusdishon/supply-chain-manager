import React from "react";

interface AlertProps {
  message: string;
}

export const InfoAlert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      {message}
    </div>
  );
};

export const ErrorAlert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
