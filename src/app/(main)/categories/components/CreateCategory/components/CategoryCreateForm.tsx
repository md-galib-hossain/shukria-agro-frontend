/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CowCreateFormProps {
  onSubmit: (data: FieldValues) => void;
}

const CategoryCreateForm = ({ onSubmit }: CowCreateFormProps) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      description: "",
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
        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Name:</label>
          <Input
            {...register("name", { required: true })}
            placeholder="Enter category name"
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-gray-700">Description:</label>
          <Textarea
            {...register("description", { required: true })}
            placeholder="Enter category description"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Category</Button>
      </div>
    </form>
  );
};

export default CategoryCreateForm;
