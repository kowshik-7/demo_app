import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataPreviewProps {
  data?: Array<Record<string, any>>;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

const DataPreview = ({
  data = [
    { id: 1, name: "Product A", sales: 100, revenue: 1000 },
    { id: 2, name: "Product B", sales: 200, revenue: 2000 },
    { id: 3, name: "Product C", sales: 300, revenue: 3000 },
    { id: 4, name: "Product D", sales: 400, revenue: 4000 },
    { id: 5, name: "Product E", sales: 500, revenue: 5000 },
  ],
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange = () => {},
}: DataPreviewProps) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const columns = Object.keys(data[0] || {});

  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-lg shadow-md flex flex-col">
      <div className="flex-1 overflow-auto">
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
            {currentData.map((row, rowIndex) => (
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
      </div>

      <div className="flex items-center justify-between mt-4 border-t pt-4">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
          {data.length} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataPreview;
