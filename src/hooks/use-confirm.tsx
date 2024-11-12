import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent
        className="bg-gray-900 p-12"
        aria-describedby="confirm dialog"
      >
        <DialogHeader className="max-w-2xl">
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="text-white border-2 border-white rounded-lg"
            aria-label="cancel button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="secondary"
            className=""
            aria-label="confirm button"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmDialog, confirm];
};
