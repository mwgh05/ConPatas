import React from 'react';
import { Message } from '../../data/messages';
interface ChatMessageProps {
  message: Message;
}
export const ChatMessage: React.FC<ChatMessageProps> = ({
  message
}) => {
  const isUser = message.sender === 'user';
  return <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${isUser ? 'bg-primary-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'}`}>
        <p className="text-sm">{message.text}</p>
        <span className={`text-xs mt-1 block ${isUser ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'}`}>
          {message.timestamp}
        </span>
      </div>
    </div>;
};