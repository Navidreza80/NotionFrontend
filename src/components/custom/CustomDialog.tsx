import { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CustomDialog = ({
  children,
  open,
  title,
  footer,
  trigger,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  title?: string;
  footer?: React.ReactNode;
  trigger: React.ReactNode;
  onOpenChange?: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <div>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="border-border">
        <DialogHeader>
          <DialogTitle className="text-title">{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
