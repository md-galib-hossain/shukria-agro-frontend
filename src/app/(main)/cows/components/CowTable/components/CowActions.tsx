/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSoftDeleteCowMutation, useUpdateCowMutation } from "@/redux/api/cowApi";
import { Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import {ICow} from "@/types";
import DetailView from "./DetailView";
import CowUpdateForm from "./UpdateCow";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";


interface CowActionsProps {
  cow: ICow;
}

const CowActions = ({ cow }: CowActionsProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [softDeleteCow] = useSoftDeleteCowMutation();

  const [updateCow] = useUpdateCowMutation();
  const { toast } = useToast();

  const handleUpdateFormSubmit = async (formData: any) => {
    try {
      await updateCow({ id: formData.cowOID, data: formData });
      setOpenUpdateDialog(false);
      toast({ title: "Cow updated" });
    } catch {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };
  const handleDelete =async (id: string) => {
      try {
        await softDeleteCow(id);
        toast({ title: "Deleted" });
      } catch (error) {
        console.log(error);
      }
    }
    
 
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={() => setOpenDetailDialog(true)}>
        <Eye className="h-4 w-4" />
      </Button>
      <ReusableDialog title="Cow Details" open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
        <DetailView cow={cow} />
      </ReusableDialog>

      <Button variant="outline" size="sm" onClick={() => setOpenUpdateDialog(true)}>
        <Edit className="h-4 w-4" />
      </Button>
      <ReusableDialog title="Update Cow" open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        <CowUpdateForm cow={cow} onSubmit={handleUpdateFormSubmit} />
      </ReusableDialog>

      <Button variant="outline" size="sm" onClick={() => setOpenDeleteDialog(true)}>
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete this cow?"
        open={openDeleteDialog}
        onConfirm={() => handleDelete(cow._id)}
        onCancel={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};

export default CowActions;
