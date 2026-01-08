import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const BlogSearch = ({ onSearch, placeholder = "Rechercher des articles..." }: BlogSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-md mx-auto mb-12">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-4 py-3 text-base"
        aria-label="Rechercher des articles de blog"
      />
      {query && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
          {query.length}/50
        </div>
      )}
    </div>
  );
};
