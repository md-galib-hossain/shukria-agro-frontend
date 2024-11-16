/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useSoftDeleteLactationMutation,
  useUpdateLactationMutation,
} from "@/redux/api/lactationApi";
import { Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import LactationDetailView from "./LactationDetailView";
import LactationUpdateForm from "./LactationUpdateForm";
import { ILactationTableProps } from "../../../hooks/useProcessedLactationTable";

interface LactationActionsProps {
  lactation: ILactationTableProps;
}

const LactationActions = ({ lactation }: LactationActionsProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [softDeleteLactation] = useSoftDeleteLactationMutation();
  const [updateLactation] = useUpdateLactationMutation();
  const { toast } = useToast();

  const handleUpdateFormSubmit = async (formData: any) => {
    try {
      const { lactationOID, ...lactationData } = formData;
      await updateLactation({ id: lactationOID, data: lactationData });
      setOpenUpdateDialog(false);
      toast({ title: "Lactation updated" });
    } catch {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await softDeleteLactation(id);
      setOpenDeleteDialog(false);
      toast({ title: "Lactation deleted" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Failed to delete lactation" });
    }
  };

  return (
    <div className="flex space-x-2">
      {/* View Details Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenDetailDialog(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <ReusableDialog
        title="Lactation Details"
        open={openDetailDialog}
        onOpenChange={setOpenDetailDialog}
        className="max-w-xl"
      >
        <LactationDetailView lactation={lactation} />
      </ReusableDialog>

      {/* Update Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenUpdateDialog(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <ReusableDialog
        title="Update Lactation"
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        className="max-w-xl"
      >
        <LactationUpdateForm
          lactation={lactation}
          onSubmit={handleUpdateFormSubmit}
        />
      </ReusableDialog>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenDeleteDialog(true)}
      >
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete this lactation?"
        open={openDeleteDialog}
        onConfirm={() => handleDelete(lactation._id)}
        onCancel={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};

export default LactationActions;
