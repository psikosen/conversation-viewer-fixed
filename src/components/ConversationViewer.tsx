import React, { useState } from 'react';
import { Conversation } from '../utils/fileReader';
import Message from './Message';
import NeuromorphicCard from './NeuromorphicCard';
import Pagination from './Pagination';

interface ConversationViewerProps {
  conversation: Conversation;
}

const ConversationViewer: React.FC<ConversationViewerProps> = ({ conversation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;
  
  // Calculate pagination
  const chats = Array.isArray(conversation?.chats) ? conversation.chats : [];
  const totalMessages = chats.length;
  const totalPages = Math.ceil(totalMessages / messagesPerPage) || 1;
  
  // Get current messages
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = chats.slice(indexOfFirstMessage, indexOfLastMessage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="conversation-viewer">
      <NeuromorphicCard className="mb-6 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 text-white">{conversation.meta.title}</h2>
        <p className="text-sm text-gray-300">
          Exported: {new Date(conversation.meta.exported_at).toLocaleString()}
        </p>
      </NeuromorphicCard>
      
      <div className="messages-container space-y-6">
        {currentMessages.map((chat) => (
          <Message 
            key={chat.index}
            type={chat.type}
            content={chat.message}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ConversationViewer;
