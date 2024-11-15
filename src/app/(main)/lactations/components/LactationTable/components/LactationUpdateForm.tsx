/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import SelectCowPopover from "@/app/(main)/cows/components/CowTable/components/SelectCow";


interface LactationUpdateFormProps {
  lactation: {
    lactationNumber: number;
    lactationStartDate: Date;
    lactationEndDate: Date;
    milkYield: number;
    cowOID:  {
        _id: string;
        cowId: string;
        name: string;
      } 
  };
  onSubmit: (data: FieldValues) => void;
}

const LactationUpdateForm = ({ lactation, onSubmit }: LactationUpdateFormProps) => {
  const [selectedCowValue, setSelectedCowValue] = useState<string | undefined>(lactation.cowOID?._id);

  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(lactation.cowOID?._id);
  
  const { control, handleSubmit, setValue, register } = useForm({
    defaultValues: {
      lactationNumber: lactation.lactationNumber,
      lactationStartDate: new Date(lactation.lactationStartDate),
      lactationEndDate: new Date(lactation.lactationEndDate),
      milkYield: lactation.milkYield,
      cowOID: lactation.cowOID?._id, 
    },
  });

  useEffect(() => {
    setValue("cowOID", lactation.cowOID?._id);
  }, [lactation.cowOID?._id, setValue]);

  const processedCows = allCows?.map((cow: any) => ({
    value: cow._id,
    label: `${cow.name} - ${cow.cowId}`,
  })) || [];

  if (loadingAllCows) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Form data on submit:", data);
        onSubmit(data);
      })}
      className="bg-white rounded-md p-6 space-y-6 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-48 text-gray-700">Lactation Number:</label>
          <Input
            type="number"
            {...register("lactationNumber", { valueAsNumber: true })}
            placeholder="Enter lactation number"
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-48 text-gray-700">Start Date:</label>
          <Controller
            name="lactationStartDate"
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
          <label className="w-48 text-gray-700">End Date:</label>
          <Controller
            name="lactationEndDate"
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
          <label className="w-48 text-gray-700">Milk Yield (liters):</label>
          <Input
            type="number"
            {...register("milkYield", { valueAsNumber: true })}
            placeholder="Enter milk yield"
            className="w-full"
          />
        </div>

        <SelectCowPopover
          label="Select Cow for Lactation"
          selectedValue={selectedCowValue}
          onSelect={(value) => {
            setSelectedCowValue(value);
            setValue("cowOID", value);
          }}
          options={processedCows}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default LactationUpdateForm;
