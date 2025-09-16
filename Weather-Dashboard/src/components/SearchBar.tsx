import React, { useState } from "react";


interface Props {
onSearch: (city: string) => void;
}


export default function SearchBar({ onSearch }: Props) {
const [query, setQuery] = useState("");


const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (query.trim()) {
onSearch(query.trim());
setQuery("");
}
};


return (
<form onSubmit={handleSubmit} className="flex justify-center gap-2">
<input
type="text"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Enter city name..."
className="px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
/>
<button
type="submit"
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
Search
</button>
</form>
);
}
