import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Table as TableIcon,
  MessageSquare,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChartDisplayProps {
  data?: ChartData;
  type?: "bar" | "line" | "pie" | "table" | "chat";
  title?: string;
  tableData?: Array<Record<string, any>>;
  messages?: Message[];
}

const defaultData: ChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Sample Data",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "#4f46e5",
      borderColor: "#4f46e5",
    },
  ],
};

const ChartDisplay = ({
  data = defaultData,
  type = "bar",
  title = "Data Visualization",
  tableData = [],
  messages = [],
}: ChartDisplayProps) => {
  const renderContent = () => {
    switch (type) {
      case "table":
        if (!tableData.length) return null;
        const columns = Object.keys(tableData[0]);
        return (
          <ScrollArea className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column} className="font-semibold">
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column}`}>
                        {row[column]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        );

      case "chat":
        return (
          <ScrollArea className="h-full w-full pr-4">
            <div className="flex flex-col space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center p-4">
              <p className="text-sm text-gray-500 mb-2">
                Chart will be rendered here using a charting library
              </p>
              <div className="space-y-2">
                <p className="text-xs text-gray-400">
                  Data Points: {data.datasets[0].data.length}
                </p>
                <p className="text-xs text-gray-400">Type: {type}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full h-full bg-white p-4 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Tabs defaultValue={type} className="w-fit">
            <TabsList>
              <TabsTrigger value="bar">
                <BarChart className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="line">
                <LineChart className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="pie">
                <PieChart className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="table">
                <TableIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 min-h-0">{renderContent()}</div>

        {type !== "table" && type !== "chat" && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {data.datasets.map((dataset, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dataset.backgroundColor }}
                  />
                  <span>{dataset.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChartDisplay;
