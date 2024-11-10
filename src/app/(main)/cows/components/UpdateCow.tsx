import React, { useEffect, useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ICow, { ICategory } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import { useDebounce } from "@/hooks/useDebounce";

interface CowUpdateFormProps {
  cow: ICow;
  onSubmit: (data: FieldValues) => void;
}

const CowUpdateForm = ({ cow, onSubmit }: CowUpdateFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });
  const query: Record<string, any> = debouncedTerm
    ? { searchTerm: debouncedTerm }
    : {};
  
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery({});
  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery({
    query,excludeCowId:cow?._id
  });

  const { control, handleSubmit, setValue, register, watch } = useForm({
    defaultValues: {
      cowId: cow.cowId,
      name: cow.name,
      dateOfBirth: new Date(cow.dateOfBirth),
      sex: cow.sex,
      categoryId: cow.categoryId._id,
      sire: `${cow.sire?.name} - ${cow.sire?.cowId}`,
      dam: `${cow.dam?.name} - ${cow.dam?.cowId}`,
      currentPregnancyStatus: cow.currentPregnancyStatus,
    },
  });

  useEffect(() => {
    if (categories && cow.categoryId) {
      setValue("categoryId", cow.categoryId._id);
    }
  }, [categories, cow.categoryId, setValue]);

  const sex = watch("sex");

  const handleSireDamChange = (fieldName: string, value: string) => {
    setSearchTerm(value); // This updates the search term for sire/dam.
  };

  const getSireDamOptions = (term: string) => {
    return allCows?.filter((cow: ICow) =>
      cow.name.toLowerCase().includes(term.toLowerCase()) || cow.cowId.includes(term)
    );
  };

  if (isLoading || loadingAllCows) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-md p-6 space-y-6 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Cow ID:</label>
          <Input {...register("cowId")} disabled className="w-full" />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Name:</label>
          <Input
            {...register("name")}
            placeholder="Enter cow name"
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Date of Birth:</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full font-normal !justify-start"
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
                  {categories?.find(
                    (category: ICategory) => category._id === field.value
                  )?.name || "Select category"}
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

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Sire:</label>
          <Select
            {...register("sire")}
            onValueChange={(value) => handleSireDamChange("sire", value)}
            className="w-full"
          >
            <SelectTrigger>{watch("sire") || "Select Sire"}</SelectTrigger>
            <SelectContent>
              {getSireDamOptions(searchTerm).map((cow: ICow) => (
                <SelectItem key={cow.cowId} value={`${cow.name} - ${cow.cowId}`}>
                  {cow.name} - {cow.cowId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Dam:</label>
          <Select
            {...register("dam")}
            onValueChange={(value) => handleSireDamChange("dam", value)}
            className="w-full"
          >
            <SelectTrigger>{watch("dam") || "Select Dam"}</SelectTrigger>
            <SelectContent>
              {getSireDamOptions(searchTerm).map((cow: ICow) => (
                <SelectItem key={cow.cowId} value={`${cow.name} - ${cow.cowId}`}>
                  {cow.name} - {cow.cowId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
