/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusableDialog from "@/components/ReUsableDialog/ReusableDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CowCreateForm from "./components/CowCreateForm";
import { useCreateCowMutation } from "@/redux/api/cowApi";
import { toast } from "@/hooks/use-toast";

const CreateCow = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [createCow] = useCreateCowMutation();
  const handleCreateCowSubmit = async (formData: any) => {
    try {
      await createCow(formData);
      setOpenDialog(false)
      toast({ title: "Cow created" });

    } catch (error) {
        console.log(error)
        toast({ variant: "destructive", title: "Something went wrong" });

    }
  };
  return (
    <div className="">
      <ReusableDialog
        title="Cow Details"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <CowCreateForm onSubmit={handleCreateCowSubmit} />
      </ReusableDialog>
      <Button onClick={() => setOpenDialog(true)}>Create Cow</Button>
    </div>
  );
};

export default CreateCow;
