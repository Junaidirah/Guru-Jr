"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface UploadMediaCardProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
  register: UseFormRegisterReturn;
  previewUrl: string | null;
  onClearPreview: () => void;
}

export function UploadMediaCard({
  onFileChange,
  file,
  register,
  previewUrl,
  onClearPreview,
}: UploadMediaCardProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid File Type",
          description: "Only JPG, PNG, or WEBP formats are allowed.",
          variant: "destructive",
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onFileChange(null);
        return;
      }
    }

    onFileChange(selectedFile);
    register.onChange(event);
  };

  return (
    <div className="bg-white rounded-[25px] p-6 shadow-around flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
      {previewUrl ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden group flex items-center justify-center">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Media Preview"
            layout="fill"
            objectFit="contain"
          />
          <Button
            type="button"
            onClick={onClearPreview}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Hapus pratinjau media"
          >
            <Icon icon="solar:trash-bin-trash-bold" className="w-5 h-5" />
          </Button>
        </div>
      ) : (
        <Icon
          icon="material-symbols:upload-rounded"
          className="w-24 h-24 text-dashboardIconBlue"
        />
      )}
      <span className="text-sm text-gray-400 font-light">
        {file ? file.name : "upload media"}
      </span>
      <Input
        id="media"
        name="media"
        type="file"
        ref={(e) => {
          register.ref(e);
          fileInputRef.current = e;
        }}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
      />
      <Button
        type="button"
        onClick={handleButtonClick}
        variant="outline"
        className="rounded-[10px] px-6 py-2 text-screenBackground border-gray-200 hover:bg-dashboardBlue bg-[#77A7D1]"
      >
        Upload
      </Button>
    </div>
  );
}
