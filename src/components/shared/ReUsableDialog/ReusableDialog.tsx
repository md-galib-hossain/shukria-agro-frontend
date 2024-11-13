import React, { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; 

interface ReusableDialogProps {
  title: string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  footerButtons?: ReactElement[];
  className?: string; 
}

const ReusableDialog = ({
  title,
  open,
  onOpenChange,
  children,
  footerButtons,
  className,
}: ReusableDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("w-full max-w-5xl max-h-[80vh] overflow-y-auto hide-scrollbar", className)}>
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
