/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import CategoryCreateForm from "./components/CategoryCreateForm";
import { useCreateCowCategoryMutation } from "@/redux/api/categoryApi";

const CreateCategory = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [createCowCategory] = useCreateCowCategoryMutation();
  const handleCreateCategorySubmit = async (formData: any) => {
    try {
      await createCowCategory(formData);
      setOpenDialog(false);
      toast({ title: "Category created" });
    } catch (error) {
      console.log(error);
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };
  return (
    <div className="">
      <ReusableDialog
        title="Cow Details"
        open={openDialog}
        onOpenChange={setOpenDialog}
        className="max-w-xl"
      >
        <CategoryCreateForm onSubmit={handleCreateCategorySubmit} />
      </ReusableDialog>
      <Button onClick={() => setOpenDialog(true)}>Create Category</Button>
    </div>
  );
};

export default CreateCategory;
