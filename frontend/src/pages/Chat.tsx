import React, { useState } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { conversations } from '../data/messages';
import { SendIcon, SmileIcon, PaperclipIcon } from 'lucide-react';
export const Chat: React.FC = () => {
  const [activeChat, setActiveChat] = useState(conversations[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState(conversations);
  const currentChat = chats.find(chat => chat.id === activeChat);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, {
            id: Date.now().toString(),
            sender: 'user' as const,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            read: true
          }],
          lastMessage: newMessage,
          lastMessageTime: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        };
      }
      return chat;
    });
    setChats(updatedChats);
    setNewMessage('');
    // Simulate shelter response after a delay
    setTimeout(() => {
      const updatedChatsWithResponse = chats.map(chat => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, {
              id: Date.now().toString(),
              sender: 'user' as const,
              text: newMessage,
              timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }),
              read: true
            }, {
              id: (Date.now() + 1).toString(),
              sender: 'shelter' as const,
              text: '¡Gracias por tu mensaje! Te responderemos lo más pronto posible.',
              timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }),
              read: false
            }],
            lastMessage: '¡Gracias por tu mensaje! Te responderemos lo más pronto posible.',
            lastMessageTime: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        }
        return chat;
      });
      setChats(updatedChatsWithResponse);
    }, 1000);
  };
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Mensajes
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="flex h-[600px]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Conversaciones
                </h2>
              </div>
              <div>
                {chats.map(chat => <button key={chat.id} onClick={() => setActiveChat(chat.id)} className={`w-full text-left px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center ${activeChat === chat.id ? 'bg-primary-50 dark:bg-primary-900' : ''}`}>
                    <img src={chat.shelterAvatar} alt={chat.shelterName} className="h-12 w-12 rounded-full object-cover" />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {chat.shelterName}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {chat.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unreadCount > 0 && <span className="bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2">
                        {chat.unreadCount}
                      </span>}
                  </button>)}
              </div>
            </div>
            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
              {currentChat ? <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <img src={currentChat.shelterAvatar} alt={currentChat.shelterName} className="h-10 w-10 rounded-full object-cover" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {currentChat.shelterName}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        En línea
                      </p>
                    </div>
                  </div>
                  {/* Messages */}
                  <div className="flex-grow p-4 overflow-y-auto">
                    {currentChat.messages.map(message => <ChatMessage key={message.id} message={message} />)}
                  </div>
                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
                    <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <PaperclipIcon className="h-5 w-5" />
                    </button>
                    <input type="text" placeholder="Escribe un mensaje..." className="flex-grow mx-2 input" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                    <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <SmileIcon className="h-5 w-5" />
                    </button>
                    <button type="submit" className="p-2 rounded-full bg-primary-500 text-white">
                      <SendIcon className="h-5 w-5" />
                    </button>
                  </form>
                </> : <div className="flex-grow flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Selecciona una conversación para comenzar
                  </p>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};