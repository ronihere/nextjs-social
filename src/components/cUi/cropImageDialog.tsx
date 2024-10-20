import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import React, { Dispatch, SetStateAction, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from '../ui/button';

export default function CropImageDialog({imageSrc, setCroppedImage, onClose}:{onClose: ()=>void,imageSrc: File, setCroppedImage: Dispatch<SetStateAction<File | null | Blob>>}) {
const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => setCroppedImage(blob), "image/webp");
    onClose();
  };
  return (
    <Dialog open onOpenChange={onClose}>
        <DialogHeader><DialogTitle>
            Crop your Image
            </DialogTitle></DialogHeader>
            <DialogContent>
            <Cropper
      src={URL.createObjectURL(imageSrc)}
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={1}
      guides={false}
      ref={cropperRef}
    />
            <DialogFooter>
                <Button onClick={onCrop}>Crop</Button>
            </DialogFooter>
            </DialogContent>
    </Dialog>
  )
}
