import React from "react";
import DataPreview from "./DataPreview";
import ChartDisplay from "./ChartDisplay";
import { Card } from "./ui/card";

interface VisualizationPanelProps {
  data?: Array<Record<string, any>>;
  chartData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  chartType?: "bar" | "line" | "pie" | "table" | "chat";
  chartTitle?: string;
  messages?: Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  }>;
}

const VisualizationPanel = ({
  data = [
    { id: 1, name: "Product A", sales: 100, revenue: 1000 },
    { id: 2, name: "Product B", sales: 200, revenue: 2000 },
    { id: 3, name: "Product C", sales: 300, revenue: 3000 },
    { id: 4, name: "Product D", sales: 400, revenue: 4000 },
    { id: 5, name: "Product E", sales: 500, revenue: 5000 },
  ],
  chartData = {
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
  chartType = "bar",
  chartTitle = "Sales Overview",
  messages = [],
}: VisualizationPanelProps) => {
  return (
    <Card className="w-[756px] h-[982px] bg-gray-50 p-6 flex flex-col gap-6">
      <div className="flex-none">
        <DataPreview data={data} />
      </div>
      <div className="flex-1">
        <ChartDisplay
          data={chartData}
          type={chartType}
          title={chartTitle}
          tableData={data}
          messages={messages}
        />
      </div>
    </Card>
  );
};

export default VisualizationPanel;
