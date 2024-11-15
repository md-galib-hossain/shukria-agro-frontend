/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import  { ICategory,ICow} from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import SelectCowPopover from "../../CowTable/components/SelectCow";

interface CowCreateFormProps {
  onSubmit: (data: FieldValues) => void;
}

const CowCreateForm = ({ onSubmit }: CowCreateFormProps) => {
  const [sireValue, setSireValue] = useState<string | undefined>();
  const [damValue, setDamValue] = useState<string | undefined>();

  const { data: categories, isLoading, error } = useGetAllCategoriesQuery({});
  const { data: allCows, isLoading: loadingAllCows } =
    useGetAllCowsWithoutSpecificQuery(undefined);

  const { control, handleSubmit, setValue, register } = useForm({
    defaultValues: {
      cowId: "",
      name: "",
      dateOfBirth: undefined,
      sex: "",
      categoryId: "",
      sire: undefined ,
      dam: undefined,
    },
  });

  const processedCows =
    allCows?.map((cow: ICow) => ({
      value: cow._id,
      label: `${cow.name} - ${cow.cowId}`,
    })) || [];

  if (isLoading || loadingAllCows) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Form data on submit:", data);
        onSubmit(data);
      })}
      className="bg-white rounded-md p-6 space-y-6 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        {/* Cow ID - Optional */}
        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Cow ID:</label>
          <Input
            {...register("cowId")}
            placeholder="Enter cow ID (optional)"
            className="w-full"
          />
        </div>

        {/* Cow Name */}
        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Name:</label>
          <Input
            {...register("name", { required: true })}
            placeholder="Enter cow name"
            className="w-full"
          />
        </div>

        {/* Date of Birth */}
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

        {/* Sex */}
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

        {/* Category */}
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

        <SelectCowPopover
          label="Sire"
          selectedValue={sireValue}
          onSelect={(value) => {
            setSireValue(value);
            setValue("sire", value);
          }}
          options={processedCows}
        />

        <SelectCowPopover
          label="Dam"
          selectedValue={damValue}
          onSelect={(value) => {
            setDamValue(value);
            setValue("dam", value);
          }}
          options={processedCows}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Cow</Button>
      </div>
    </form>
  );
};

export default CowCreateForm;
