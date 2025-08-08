import React from 'react';
import NeuromorphicCard from './NeuromorphicCard';

interface ConversationCardProps {
  conversation: {
    meta: {
      title: string;
      exported_at: string;
    };
    chats: Array<{
      index: number;
      type: 'prompt' | 'response';
      message: Array<{
        type: string;
        data: string;
        language?: string;
      }>;
    }>;
  };
  onClick?: () => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ conversation, onClick }) => {
  // Get first message preview
  const firstMessage = conversation?.chats?.[0]?.message?.[0]?.data || 'No content';
  const preview = firstMessage.length > 100 ? firstMessage.substring(0, 100) + '...' : firstMessage;
  
  return (
    <NeuromorphicCard className="cursor-pointer h-full" onClick={onClick}>
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2">{conversation?.meta?.title || 'Untitled Conversation'}</h3>
        <div className="text-sm text-gray-400 mb-2">
          Exported: {conversation?.meta?.exported_at ? new Date(conversation.meta.exported_at).toLocaleDateString() : 'Unknown'}
        </div>
        <p className="text-gray-300 flex-grow">{preview}</p>
        <div className="text-sm text-gray-400 mt-4">
          {Array.isArray(conversation?.chats) ? conversation.chats.length : 0} messages
        </div>
      </div>
    </NeuromorphicCard>
  );
};

export default ConversationCard;
