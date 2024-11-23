/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import VaccineCreateForm from "./components/VaccineCreateForm";
import { useCreateVaccineMutation } from "@/redux/api/vaccineApi";

const CreateVaccine = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [createVaccine] = useCreateVaccineMutation();

  const handleCreateVaccineSubmit = async (formData: any) => {
    try {
      await createVaccine(formData);
      setOpenDialog(false);
      toast({ title: "Vaccine record created successfully!" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Failed to create vaccine record." });
    }
  };

  return (
    <div>
      <ReusableDialog
        title="Vaccine Details"
        open={openDialog}
        onOpenChange={setOpenDialog} className="max-w-xl"
      >
        <VaccineCreateForm onSubmit={handleCreateVaccineSubmit} />
      </ReusableDialog>
      <Button onClick={() => setOpenDialog(true)}>Create Vaccine</Button>
    </div>
  );
};

export default CreateVaccine;
