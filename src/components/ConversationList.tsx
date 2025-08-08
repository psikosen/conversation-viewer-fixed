import React, { useState } from 'react';
import { Conversation } from '../utils/fileReader';
import ConversationCard from './ConversationCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import NeuromorphicCard from './NeuromorphicCard';

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations,
  onSelectConversation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'title' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const conversationsPerPage = 9;
  
  // Normalized search term and safe includes helper
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const safeIncludes = (value: unknown): boolean => {
    return typeof value === 'string' 
      ? value.toLowerCase().includes(normalizedSearch)
      : false;
  };

  // Filter conversations based on search term (null-safe)
  const filteredConversations = conversations.filter((conversation) => {
    const title = conversation?.meta?.title ?? '';
    const titleMatch = safeIncludes(title);
    const messageMatch = Array.isArray(conversation?.chats) && conversation.chats.some((chat) =>
      Array.isArray(chat?.message) && chat.message.some((msg) => safeIncludes(msg?.data))
    );
    return normalizedSearch === '' ? true : (titleMatch || messageMatch);
  });
  
  // Sort conversations
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    if (sortField === 'title') {
      const aTitle = a?.meta?.title ?? '';
      const bTitle = b?.meta?.title ?? '';
      return sortDirection === 'asc'
        ? aTitle.localeCompare(bTitle)
        : bTitle.localeCompare(aTitle);
    } else {
      const aTime = a?.meta?.exported_at ? new Date(a.meta.exported_at).getTime() : 0;
      const bTime = b?.meta?.exported_at ? new Date(b.meta.exported_at).getTime() : 0;
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    }
  });
  
  // Get current conversations
  const indexOfLastConversation = currentPage * conversationsPerPage;
  const indexOfFirstConversation = indexOfLastConversation - conversationsPerPage;
  const currentConversations = sortedConversations.slice(indexOfFirstConversation, indexOfLastConversation);
  
  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on search
  };
  
  // Handle sort
  const handleSort = (field: 'title' | 'date') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="conversation-list">
      <NeuromorphicCard className="mb-6 text-white">
        <div className="flex flex-col gap-3">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
            placeholder="Search conversations..."
          />
          <div className="sort-controls flex flex-wrap gap-2 text-white">
            <button 
              className={`neuromorphic-button px-3 py-2 text-white ${sortField === 'title' ? 'bg-blue-900' : ''}`}
              onClick={() => handleSort('title')}
            >
              Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={`neuromorphic-button px-3 py-2 text-white ${sortField === 'date' ? 'bg-blue-900' : ''}`}
              onClick={() => handleSort('date')}
            >
              Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </NeuromorphicCard>
      
      <div className="grid-container">
        {currentConversations.map((conversation, index) => (
          <div key={index} className="h-full">
            <ConversationCard 
              conversation={conversation}
              onClick={() => onSelectConversation(conversation)}
            />
          </div>
        ))}
      </div>
      
      {Math.ceil(sortedConversations.length / conversationsPerPage) > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedConversations.length / conversationsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ConversationList;
