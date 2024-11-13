import ReusableDialog from "../shared/ReusableDialog/ReusableDialog";
import { Button } from "../ui/button";


interface ConfirmDialogProps {
  title: string;
  message: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <ReusableDialog title={title} open={open} onOpenChange={onCancel} className="max-w-xl">
      <div className="p-4">
        <p>{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </ReusableDialog>
  );
};

export default ConfirmDialog;
