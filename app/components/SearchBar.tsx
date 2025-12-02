interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-7xl flex justify-end">
      <input
        type="text"
        placeholder="Buscar tarafa"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-2/3 max-w-md px-4 py-2 rounded-lg bg-white border-2 border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent text-black placeholder-gray-300 shadow-md"
      />
    </div>
  );
}
