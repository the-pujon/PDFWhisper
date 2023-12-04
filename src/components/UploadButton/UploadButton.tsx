import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import UploadPDF from "../UploadPDF/UploadPDF";

const UploadButton = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadPDF isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
