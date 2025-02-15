import React, { useState } from "react";
import ChatInterface from "./ChatInterface";
import VisualizationPanel from "./VisualizationPanel";

interface HomeProps {
  initialMessages?: Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  }>;
  initialData?: Array<Record<string, any>>;
  initialChartData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
}

export default function Home({
  initialMessages = [
    {
      id: "welcome",
      content: "Welcome! Please upload an Excel file to begin analysis.",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ],
  initialData = [
    { id: 1, name: "Product A", sales: 100, revenue: 1000 },
    { id: 2, name: "Product B", sales: 200, revenue: 2000 },
    { id: 3, name: "Product C", sales: 300, revenue: 3000 },
    { id: 4, name: "Product D", sales: 400, revenue: 4000 },
    { id: 5, name: "Product E", sales: 500, revenue: 5000 },
  ],
  initialChartData = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 300, 400, 500],
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
      },
    ],
  },
}: HomeProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState(initialData);
  const [chartData, setChartData] = useState(initialChartData);
  const [chartType, setChartType] = useState<
    "bar" | "line" | "pie" | "table" | "chat"
  >("bar");

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError("");

    try {
      // Simulate file upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Add file upload success message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `Successfully uploaded ${file.name}`,
          sender: "ai",
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setUploadError("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: message,
        sender: "user",
        timestamp: new Date().toISOString(),
      },
    ]);

    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "I'm analyzing your request. Here's what I found...",
          sender: "ai",
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsProcessing(false);

      // Switch to chat view when there's a new message
      setChartType("chat");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-start justify-center p-4 gap-4">
      <ChatInterface
        onFileUpload={handleFileUpload}
        onSendMessage={handleSendMessage}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        uploadError={uploadError}
        messages={messages}
        isProcessing={isProcessing}
      />
      <VisualizationPanel
        data={data}
        chartData={chartData}
        chartType={chartType}
        chartTitle="Data Analysis"
        messages={messages}
      />
    </div>
  );
}
