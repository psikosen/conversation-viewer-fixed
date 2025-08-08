"use client";

import React, { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { Conversation } from '../utils/fileReader';
import Message from './Message';
import NeuromorphicCard from './NeuromorphicCard';

// This component is needed to make the page client-side rendered
// since we're using browser APIs and interactive components

interface ConversationDetailProps {
  conversation: Conversation;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({ conversation }) => {
  // Add LaTeX script for proper rendering
  useEffect(() => {
    type RenderMathInElementFn = (
      element: HTMLElement,
      options?: {
        delimiters?: Array<{ left: string; right: string; display: boolean }>;
        throwOnError?: boolean;
      }
    ) => void;

    // Dynamically import auto-render to avoid SSR issues
    import('katex/contrib/auto-render').then((mod) => {
      const maybeDefault = (mod as unknown as { default?: unknown }).default;
      let renderMathInElement: RenderMathInElementFn | null = null;

      if (typeof maybeDefault === 'function') {
        renderMathInElement = maybeDefault as RenderMathInElementFn;
      } else if (typeof (mod as unknown) === 'function') {
        renderMathInElement = mod as unknown as RenderMathInElementFn;
      }

      if (renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
          ],
          throwOnError: false,
        });
      }
    });
  }, [conversation]);

  return (
    <div className="conversation-detail">
      <NeuromorphicCard className="mb-6 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 text-white">{conversation.meta.title}</h2>
        <p className="text-sm text-gray-300">
          Exported: {new Date(conversation.meta.exported_at).toLocaleString()}
        </p>
      </NeuromorphicCard>
      
      <div className="messages-container space-y-6">
        {conversation.chats.map((chat) => (
          <Message 
            key={chat.index}
            type={chat.type}
            content={chat.message}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationDetail;
