"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  light?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  light,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent
        className={cn(
          "py-5 m-0 overflow-y-auto",
          light ? "bg-white text-black" : "bg-gray-800/80"
        )}
        aria-describedby="modal"
      >
        <DialogTitle className="sr-only">modal</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
