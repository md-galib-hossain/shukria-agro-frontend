"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input"; 
import { cn } from "@/lib/utils";

interface DebouncedSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
  onSearch,
  placeholder = "Search...",
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn("w-full max-w-xs", className)}
    />
  );
};

export default DebouncedSearchInput;
