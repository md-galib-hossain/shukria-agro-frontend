import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactElement, ReactNode } from "react";

interface ReusableDialogProps {
  trigger: ReactElement;
  title: string;
  children: ReactNode;
  footerButtons?: ReactElement[];
}

const ReusableDialog = ({
  trigger,
  title,
  children,
  footerButtons,
}: ReusableDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-full max-w-5xl max-h-[80vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">{children}</div>
        {footerButtons && (
          <DialogFooter>
            {footerButtons.map((button, index: number) => (
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
