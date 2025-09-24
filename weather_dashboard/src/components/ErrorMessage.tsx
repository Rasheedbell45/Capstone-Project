import React from "react";

export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="max-w-4xl mx-auto mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
      {message}
    </div>
  );
}
