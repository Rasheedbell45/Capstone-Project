import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-4xl mx-auto bg-red-100 text-red-700 p-4 rounded-lg mb-4 shadow-md text-center">
      {message}
    </div>
  );
};

export default ErrorMessage;
