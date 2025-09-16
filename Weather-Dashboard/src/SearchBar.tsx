import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-4 w-full max-w-md justify-center"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="w-full p-2 rounded-lg text-black"
      />
      <button
        type="submit"
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
      >
        Search
      </button>
    </form>
  );
}
