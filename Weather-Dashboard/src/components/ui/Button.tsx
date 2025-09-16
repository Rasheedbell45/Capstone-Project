import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}
