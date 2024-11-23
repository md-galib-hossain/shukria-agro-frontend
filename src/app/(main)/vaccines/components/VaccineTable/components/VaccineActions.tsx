/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import VaccineUpdateForm from "./VaccineUpdateForm";
import { IVaccine } from "@/types";
import { useSoftDeleteVaccineMutation, useUpdateVaccineMutation } from "@/redux/api/vaccineApi";

interface VaccineActionProps {
  vaccine: IVaccine;
}

const VaccineActions = ({ vaccine }: VaccineActionProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [softDeleteVaccine] = useSoftDeleteVaccineMutation();
  const [updateVaccine] = useUpdateVaccineMutation();
  const { toast } = useToast();

  const handleUpdateFormSubmit = async (formData: any) => {
    try {
      const { vaccineOID, ...vaccineData } = formData;
      await updateVaccine({ id: vaccineOID, data: vaccineData });
      setOpenUpdateDialog(false);
      toast({ title: "Vaccine updated" });
    } catch {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await softDeleteVaccine(id);
      setOpenDeleteDialog(false);
      toast({ title: "Vaccine deleted" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Failed to delete vaccine" });
    }
  };

  return (
    <div className="flex space-x-2">
      {/* View Details Button */}
      {/* <Button
        variant="default" className="bg-[#212d3d]" size="sm"
        onClick={() => setOpenDetailDialog(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <ReusableDialog
        title="Vaccine Details"
        open={openDetailDialog}
        onOpenChange={setOpenDetailDialog}
        className="max-w-xl"
      >
        <LactationDetailView lactation={lactation} />
      </ReusableDialog> */}

      {/* Update Button */}
      <Button
           variant="default" className="bg-[#212d3d]" size="sm"
        onClick={() => setOpenUpdateDialog(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <ReusableDialog
        title="Update Vaccine"
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        className="max-w-xl"
      >
        <VaccineUpdateForm
          vaccine={vaccine}
          onSubmit={handleUpdateFormSubmit}
        />
      </ReusableDialog>

      {/* Delete Button */}
      <Button
          variant="default" className="bg-[#212d3d]" size="sm"
        onClick={() => setOpenDeleteDialog(true)}
      >
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure you want to delete this vaccine?"
        open={openDeleteDialog}
        onConfirm={() => handleDelete(vaccine._id)}
        onCancel={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};

export default VaccineActions;
