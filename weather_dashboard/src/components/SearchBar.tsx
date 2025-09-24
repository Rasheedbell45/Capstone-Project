import React, { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSearch(v);
  };

  return (
    <form onSubmit={submit} className="max-w-4xl mx-auto px-4">
      <div className="flex gap-2">
        <input
          aria-label="City"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 px-4 py-3 rounded-md shadow focus:outline-none"
          placeholder="Search city (e.g. London)"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-white text-blue-600 rounded-md font-semibold shadow hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
