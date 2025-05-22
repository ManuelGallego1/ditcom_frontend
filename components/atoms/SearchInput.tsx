import React, { useState, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ onSearch, placeholder = 'Buscar...' }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm.trim());
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 w-full sm:w-64"
    />
  );
}
