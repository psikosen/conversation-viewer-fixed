import React from 'react';
import NeuromorphicCard from './NeuromorphicCard';

interface ConversationCardProps {
  conversation: {
    meta: { title: string; exported_at: string };
    chats: Array<{
      index: number;
      type: 'prompt' | 'response';
      message: Array<{ type: string; data: string; language?: string }>;
    }>;
  };
  onClick?: () => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ conversation, onClick }) => {
  const firstMessage = conversation?.chats?.[0]?.message?.[0]?.data || 'No content';
  const preview = firstMessage.length > 400 ? firstMessage.substring(0, 400) + '…' : firstMessage;

  return (
    <NeuromorphicCard className="cursor-pointer h-full" onClick={onClick}>
      {/* min-w-0 is CRUCIAL inside flex containers to allow wrapping */}
      <div className="flex flex-col h-full min-w-0 text-white p-4 gap-1">
        <h3 className="text-xl font-bold mb-2 text-white break-words line-clamp-1">
          {conversation?.meta?.title || 'Untitled Conversation'}
        </h3>

        <div className="text-sm text-gray-300 mb-2 shrink-0">
          Exported:{' '}
          {conversation?.meta?.exported_at
            ? new Date(conversation.meta.exported_at).toLocaleDateString(undefined, { dateStyle: 'medium' })
            : 'Unknown'}
        </div>

        {/* wrap everything, clamp to 3 lines for consistent card height */}
        <p className="text-gray-200 flex-grow leading-relaxed break-words line-clamp-3 min-w-0">
          {preview}
        </p>

        <div className="text-sm text-gray-300 mt-4 shrink-0">
          {Array.isArray(conversation?.chats) ? conversation.chats.length : 0} messages
        </div>
      </div>
    </NeuromorphicCard>
  );
};

export default ConversationCard;
