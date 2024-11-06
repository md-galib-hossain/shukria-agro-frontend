import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { ReactElement, ReactNode } from 'react';

interface ReusableDialogProps {
  trigger: ReactElement; 
  title: string; 
  children: ReactNode; 
  footerButtons?: ReactElement[];
}
const ReusableDialog = ({ trigger, title, children, footerButtons }:ReusableDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="">
          {children}
        </div>
        {footerButtons && (
          <DialogFooter>
            {footerButtons.map((button, index:number) => (
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
