import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

interface ReusableDialogProps {
  title: string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  footerButtons?: ReactElement[];
}

const ReusableDialog = ({
  title,
  open,
  onOpenChange,
  children,
  footerButtons,
}: ReusableDialogProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl max-h-[80vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">{children}</div>
        {footerButtons && (
          <DialogFooter>
            {footerButtons.map((button, index) => (
              <DialogClose asChild key={index}>
                {button}
              </DialogClose>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};



export default ReusableDialog;
