import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-md p-4 text-white">
      {children}
    </div>
  );
}
