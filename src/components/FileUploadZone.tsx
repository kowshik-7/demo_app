import React, { useCallback, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFileUpload?: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
}

const FileUploadZone = ({
  onFileUpload = () => {},
  isUploading = false,
  uploadProgress = 0,
  error = "",
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.includes("spreadsheet")) {
        onFileUpload(file);
      }
    },
    [onFileUpload],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload],
  );

  return (
    <Card
      className={cn(
        "w-full h-[200px] bg-white flex flex-col items-center justify-center p-6 border-2 border-dashed transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-gray-200",
        error ? "border-destructive" : "",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        {error ? (
          <>
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </>
        ) : isUploading ? (
          <>
            <FileSpreadsheet className="w-10 h-10 text-primary animate-pulse" />
            <Progress value={uploadProgress} className="w-[200px]" />
            <p className="text-sm text-muted-foreground">Uploading file...</p>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Drag and drop your Excel file here, or click to select
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileInput}
              id="file-upload"
            />
            <Button asChild variant="secondary">
              <label htmlFor="file-upload" className="cursor-pointer">
                Select File
              </label>
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default FileUploadZone;
