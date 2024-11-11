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
import SelectCowPopover from "./SelectCow";



interface CowUpdateFormProps {
  cow: ICow;
  onSubmit: (data: FieldValues) => void;
}

const CowUpdateForm = ({ cow, onSubmit }: CowUpdateFormProps) => {
  const [sireValue, setSireValue] = useState<string | undefined>(cow.sire?._id);
  const [damValue, setDamValue] = useState<string | undefined>(cow.dam?._id);

  const { data: categories, isLoading, error } = useGetAllCategoriesQuery({});
  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(cow?._id);

  const { control, handleSubmit, setValue, register, watch } = useForm({
    defaultValues: {
      cowId: cow.cowId,
      name: cow.name,
      dateOfBirth: new Date(cow.dateOfBirth),
      sex: cow.sex,
      categoryId: cow.categoryId._id,
      sire: cow.sire?._id,
      dam: cow.dam?._id,
      currentPregnancyStatus: cow.currentPregnancyStatus,
      cowOID: cow._id
    },
  });
  useEffect(() => {
    setValue("cowOID", cow._id); 
  }, [cow._id, setValue]);

  useEffect(() => {
    if (categories && cow.categoryId) setValue("categoryId", cow.categoryId._id);
  }, [categories, cow.categoryId, setValue]);

  const sex = watch("sex");

  const processedCows = allCows?.map((cow:ICow) => ({
    value: cow._id,
    label: `${cow.name} - ${cow.cowId}`,
  })) || [];

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

        {sex === "Female" && (
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-700">Pregnancy Status:</label>
            <Controller
              name="currentPregnancyStatus"
              control={control}
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
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
