/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LactationCreateForm from "./components/LactationCreateForm";
import { useCreateLactationMutation } from "@/redux/api/lactationApi";
import { toast } from "@/hooks/use-toast";

const CreateLactation = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [createLactation] = useCreateLactationMutation();

  const handleCreateLactationSubmit = async (formData: any) => {
    try {
      await createLactation(formData);
      setOpenDialog(false);
      toast({ title: "Lactation record created successfully!" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Failed to create lactation record." });
    }
  };

  return (
    <div>
      <ReusableDialog
        title="Lactation Details"
        open={openDialog}
        onOpenChange={setOpenDialog} className="max-w-xl"
      >
        <LactationCreateForm onSubmit={handleCreateLactationSubmit} />
      </ReusableDialog>
      <Button onClick={() => setOpenDialog(true)}>Create Lactation</Button>
    </div>
  );
};

export default CreateLactation;
