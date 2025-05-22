import React, { useState, useEffect } from 'react';
import tokens from '@/utils/Token';

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
      className={tokens.input}
    />
  );
}
