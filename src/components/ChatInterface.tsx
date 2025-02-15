import React, { useState } from "react";
import FileUploadZone from "./FileUploadZone";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Card } from "./ui/card";

interface ChatInterfaceProps {
  onFileUpload?: (file: File) => void;
  onSendMessage?: (message: string) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  uploadError?: string;
  messages?: Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  }>;
  isProcessing?: boolean;
}

const ChatInterface = ({
  onFileUpload = () => {},
  onSendMessage = () => {},
  isUploading = false,
  uploadProgress = 0,
  uploadError = "",
  messages = [
    {
      id: "welcome",
      content: "Welcome! Please upload an Excel file to begin analysis.",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ],
  isProcessing = false,
}: ChatInterfaceProps) => {
  const [hasFile, setHasFile] = useState(false);

  const handleFileUpload = (file: File) => {
    setHasFile(true);
    onFileUpload(file);
  };

  return (
    <Card className="h-full w-[756px] bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
        {!hasFile && (
          <FileUploadZone
            onFileUpload={handleFileUpload}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            error={uploadError}
          />
        )}
        <div className="flex-1 overflow-hidden">
          <ChatMessages messages={messages} />
        </div>
      </div>
      <ChatInput
        onSendMessage={onSendMessage}
        disabled={isProcessing || !hasFile}
        placeholder={
          hasFile ? "Ask about your data..." : "Upload a file to begin..."
        }
      />
    </Card>
  );
};

export default ChatInterface;
