import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput = ({
  onSendMessage = () => {},
  disabled = false,
  placeholder = "Ask a question about your Excel data...",
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-t p-4 flex gap-2 items-end sticky bottom-0 w-full"
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="resize-none min-h-[60px] max-h-[120px]"
        rows={2}
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        size="icon"
        className="h-[60px] w-[60px] bg-blue-600 hover:bg-blue-700"
      >
        <Send className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default ChatInput;
