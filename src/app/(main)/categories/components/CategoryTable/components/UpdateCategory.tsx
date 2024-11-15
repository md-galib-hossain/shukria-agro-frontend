import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateCategoryProps {
  category: ICategory;
  onSubmit: (data: { categoryOID: string; name: string }) => void;
}

interface FormData {
  categoryOID: string;
  name: string;
  description: string
}

const UpdateCategory = ({ category, onSubmit }: UpdateCategoryProps) => {
  const { handleSubmit, setValue, register } = useForm<FormData>({
    defaultValues: {
      name: category.name,
      description: category.description,
      categoryOID: category._id,
    },
  });

  useEffect(() => {
    setValue("categoryOID", category._id); 
  }, [category._id, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Strongly typed onSubmit
      className="bg-white rounded-md p-6 space-y-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center space-x-4">
        <label className="w-32 text-gray-700">Name:</label>
        <Input
          {...register("name")}
          placeholder="Enter category name"
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="w-32 text-gray-700">Description:</label>
        <Textarea 
          {...register("description")}
          placeholder="Enter category description"
          className="w-full"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default UpdateCategory;
