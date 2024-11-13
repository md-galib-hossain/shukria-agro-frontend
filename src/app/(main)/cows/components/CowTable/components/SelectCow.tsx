"use client"
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface CowOption {
  value: string;
  label: string;
}

interface SelectCowPopoverProps {
  label: string;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  options: CowOption[];
}

const SelectCowPopover = ({ label, selectedValue, onSelect, options }: SelectCowPopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <label className="w-32 text-gray-700">{label}:</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label || `Select ${label}`
              : `Select ${label}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label} by name or ID...`} />
            <CommandList>
              <CommandEmpty>No matches found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} onSelect={() => {
                    onSelect(option.value);
                    setOpen(false);
                  }}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedValue === option.value ? "opacity-100" : "opacity-0")}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectCowPopover