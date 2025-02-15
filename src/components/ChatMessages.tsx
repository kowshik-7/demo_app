import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatMessagesProps {
  messages?: Message[];
}

export default function ChatMessages({
  messages = [
    {
      id: "1",
      content: "Hello! Upload an Excel file to get started with the analysis.",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      content: "Hi! I'd like to analyze my sales data.",
      sender: "user",
      timestamp: new Date().toISOString(),
    },
  ],
}: ChatMessagesProps) {
  return (
    <Card className="h-[642px] w-full bg-white p-4">
      <ScrollArea className="h-full w-full pr-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <img
                    src={
                      message.sender === "user"
                        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=ai"
                    }
                    alt={message.sender}
                  />
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
