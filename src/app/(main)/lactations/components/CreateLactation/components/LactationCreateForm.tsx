/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useGetAllCowsWithoutSpecificQuery } from "@/redux/api/cowApi";
import SelectCowPopover from "@/components/SelectCowPopover/SelectCowPopover";
import { useState } from "react";

interface LactationCreateFormProps {
  onSubmit: (data: FieldValues) => void;
}

const LactationCreateForm = ({ onSubmit }: LactationCreateFormProps) => {
  const [selectedCowValue, setSelectedCowValue] = useState<string | undefined>(undefined);

  const { data: allCows, isLoading: loadingAllCows } = useGetAllCowsWithoutSpecificQuery(undefined);

  const { control, handleSubmit, setValue, register } = useForm({
   
  });

  const processedCows =
    allCows?.map((cow: any) => ({
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
        {/* Lactation Number */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Lactation Number:</label>
          <Input
            {...register("lactationNumber", { required: true,valueAsNumber:true })}
            placeholder="Enter lactation number"
            className="col-span-2 w-full"
            type="number"
          />
        </div>

        {/* Lactation Start Date */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Start Date:</label>
          <Controller
            name="lactationStartDate"
            control={control}
            render={({ field }) => (
              <div className="col-span-2">
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
              </div>
            )}
          />
        </div>

        {/* Lactation End Date */}
        {/* <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">End Date:</label>
          <Controller
            name="lactationEndDate"
            control={control}
            render={({ field }) => (
              <div className="col-span-2">
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
              </div>
            )}
          />
        </div> */}

        {/* Milk Yield */}
        {/* <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Milk Yield (liters):</label>
          <Input
            {...register("milkYield")}
            placeholder="Enter milk yield"
            className="col-span-2 w-full"
            type="number"
          />
        </div> */}

        {/* Cow Selection */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Cow:</label>
          <div className="col-span-2">
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
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Lactation</Button>
      </div>
    </form>
  );
};

export default LactationCreateForm;
