/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface VaccineCreateFormProps {
  onSubmit: (data: FieldValues) => void;
}

const VaccineCreateForm = ({ onSubmit }: VaccineCreateFormProps) => {


  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      info: "",
      interval: "",
    },
  });



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
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Vaccine Name:</label>
          <Input
            {...register("name", { required: true })}
            placeholder="Enter vaccine name"
            className="col-span-2 w-full"
            type="text"
          />
        </div>

        {/* Vaccine Info */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Vaccine Info:</label>
          <Input
            {...register("info", { required: true })}
            placeholder="Enter additional vaccine info"
            className="col-span-2 w-full"
            type="text"
          />
        </div>

        {/* Vaccine Interval */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-left">Interval (Days):</label>
          <Input
            {...register("interval", { required: true, valueAsNumber: true })}
            placeholder="Enter interval in days"
            className="col-span-2 w-full"
            type="number"
          />
        </div>

     
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Vaccine</Button>
      </div>
    </form>
  );
};

export default VaccineCreateForm;
