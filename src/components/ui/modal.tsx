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
          "py-20 m-0",
          light ? "bg-white text-black" : "bg-gray-800/80"
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
