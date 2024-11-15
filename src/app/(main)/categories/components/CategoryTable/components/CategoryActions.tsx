/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { ICategory } from "@/types";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import {
  useSoftDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import UpdateCategory from "./UpdateCategory";

interface CategoryActionsProps {
  category: ICategory;
}

const CategoryActions = ({ category }: CategoryActionsProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [softDeleteCategory] = useSoftDeleteCategoryMutation();

  const [updateCategory] = useUpdateCategoryMutation();
  const { toast } = useToast();

  const handleUpdateFormSubmit = async (formData: {
    categoryOID: string;
    name: string;
  }) => {
    try {
      const { categoryOID, ...category } = formData;
      await updateCategory({ id: categoryOID, data: category });
      setOpenUpdateDialog(false);
      toast({ title: "Catgory updated" });
    } catch {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await softDeleteCategory(id);
      toast({ title: "Deleted" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex space-x-2 justify-start">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenUpdateDialog(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <ReusableDialog
        title="Update Category"
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        className="max-w-xl"
      >
        <UpdateCategory category={category} onSubmit={handleUpdateFormSubmit} />
      </ReusableDialog>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenDeleteDialog(true)}
      >
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete this category?"
        open={openDeleteDialog}
        onConfirm={() => handleDelete(category._id)}
        onCancel={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};

export default CategoryActions;
