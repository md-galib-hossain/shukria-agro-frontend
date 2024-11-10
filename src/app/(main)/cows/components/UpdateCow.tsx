/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ICow, { ICategory } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Reusable component for Popover Select
const SelectCow = ({ label, value, onSelect, cows }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
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

interface CowUpdateFormProps {
  cow: ICow;
  onSubmit: (data: FieldValues) => void;
}

const CowUpdateForm = ({ cow, onSubmit }: CowUpdateFormProps) => {
  const [openSire, setOpenSire] = useState(false);
  const [openDam, setOpenDam] = useState(false);
  const [sireValue, setSireValue] = useState("");
  const [damValue, setDamValue] = useState("");

  const { data: categories, isLoading, error } = useGetAllCategoriesQuery({});
  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(cow?._id);

  const { control, handleSubmit, setValue, register, watch } = useForm({
    defaultValues: {
      cowId: cow.cowId,
      name: cow.name,
      dateOfBirth: new Date(cow.dateOfBirth),
      sex: cow.sex,
      categoryId: cow.categoryId._id,
      sire: cow.sire?._id, // Track the selected sire ID
      dam: cow.dam?._id,   // Track the selected dam ID
      currentPregnancyStatus: cow.currentPregnancyStatus,
    },
  });

  useEffect(() => {
    if (categories && cow.categoryId) {
      setValue("categoryId", cow.categoryId._id);
    }
  }, [categories, cow.categoryId, setValue]);

  const sex = watch("sex");

  const processedCows = allCows?.map((cow) => ({
    value: cow._id,
    label: `${cow.name} - ${cow.cowId}`,
  }));

  const handleSireSelect = (id: string) => setSireValue(id);
  const handleDamSelect = (id: string) => setDamValue(id);

  if (isLoading || loadingAllCows) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md p-6 space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Cow ID:</label>
          <Input {...register("cowId")} disabled className="w-full" />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Name:</label>
          <Input {...register("name")} placeholder="Enter cow name" className="w-full" />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Date of Birth:</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full font-normal !justify-start">
                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Sex:</label>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>{field.value || "Select sex"}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Category:</label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  {categories?.find((category: ICategory) => category._id === field.value)?.name || "Select category"}
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: ICategory) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Sire field */}
        <div className="flex items-center space-x-4">
        <label className="w-32 text-gray-700">Sire:</label>
        <Popover open={openSire} onOpenChange={setOpenSire}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {sireValue
                ? processedCows.find((cow) => cow.value === sireValue)?.label
                : "Select Sire"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search sire by name or ID..." />
              <CommandList>
                <CommandEmpty>No matches found.</CommandEmpty>
                <CommandGroup>
                  {processedCows.map((cow) => (
                    <CommandItem
                      key={cow.value}
                      onSelect={() => {
                        handleSireSelect(cow.value);
                        setOpenSire(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          sireValue === cow.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {cow.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Dam field */}
      <div className="flex items-center space-x-4">
        <label className="w-32 text-gray-700">Dam:</label>
        <Popover open={openDam} onOpenChange={setOpenDam}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {damValue
                ? processedCows.find((cow) => cow.value === damValue)?.label
                : "Select Dam"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search dam by name or ID..." />
              <CommandList>
                <CommandEmpty>No matches found.</CommandEmpty>
                <CommandGroup>
                  {processedCows.map((cow) => (
                    <CommandItem
                      key={cow.value}
                      onSelect={() => {
                        handleDamSelect(cow.value);
                        setOpenDam(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          damValue === cow.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {cow.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

        {sex === "Female" && (
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-700">Pregnancy Status:</label>
            <Switch {...register("currentPregnancyStatus")} />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CowUpdateForm;
