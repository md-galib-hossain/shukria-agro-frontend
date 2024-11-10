'use client'
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const SelectCow = ({ label, value, onSelect, cows,key }: any) => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="flex items-center space-x-4" key={key}>
        <label className="w-32 text-gray-700">{label}:</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {value ? `${value.name} - ${value.cowId}` : `Select ${label}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={`Search ${label} by name or ID...`} />
              <CommandList>
                <CommandEmpty>No matches found.</CommandEmpty>
                <CommandGroup>
                  {cows.map((cow: any) => (
                    <CommandItem key={cow._id} onSelect={() => onSelect(cow)}>
                      <Check className={cn("mr-2 h-4 w-4", value?._id === cow._id ? "opacity-100" : "opacity-0")} />
                      {cow.name} - {cow.cowId}
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

  export default SelectCow