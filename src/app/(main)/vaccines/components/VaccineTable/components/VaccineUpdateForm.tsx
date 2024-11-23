/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, } from "react";
import { useForm,  FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

interface VaccineUpdateFormProps {
  vaccine: {
    _id: string;
    name: string;
    info: string;
    interval: number;
    
  };
  onSubmit: (data: FieldValues) => void;
}

const VaccineUpdateForm = ({
  vaccine,
  onSubmit,
}: VaccineUpdateFormProps) => {



  const {  handleSubmit, setValue, register } = useForm({
    defaultValues: {
      name: vaccine.name,
      info: vaccine.info,
      interval: vaccine.interval,
      vaccineOID: vaccine?._id,
    },
  });

  useEffect(() => {
    setValue("vaccineOID", vaccine?._id);
  }, [vaccine?._id, setValue]);




  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Form data on submit:", data);
        onSubmit(data);
      })}
      className="bg-white rounded-md p-6 space-y-6 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        {/* Vaccine Name */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-gray-700 text-left">Vaccine Name:</label>
          <div className="col-span-2">
            <Input
              type="text"
              {...register("name")}
              placeholder="Enter vaccine name"
              className="w-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-gray-700 text-left">Info:</label>
          <div className="col-span-2">
            <Input
              type="text"
              {...register("info")}
              placeholder="Enter vaccine info"
              className="w-full"
            />
          </div>
        </div>

        {/* Interval */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-gray-700 text-left">Interval (Days):</label>
          <div className="col-span-2">
            <Input
              type="number"
              {...register("interval", { valueAsNumber: true })}
              placeholder="Enter interval in days"
              className="w-full"
            />
          </div>
        </div>

       
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default VaccineUpdateForm;
