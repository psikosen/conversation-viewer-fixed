'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import ConversationList from '../components/ConversationList';
import ConversationViewer from '../components/ConversationViewer';
import ClientFileReader from '../components/ClientFileReader';
import { useConversations } from '../hooks/useJsonData';
import { Conversation } from '../utils/fileReader';
import NeuromorphicCard from '../components/NeuromorphicCard';
import { normalizeToConversations } from '../utils/normalize';

export default function Home() {
  const { conversations, loading, error, setConversations } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  const handleFileLoaded = (data: unknown) => {
    try {
      const normalized = normalizeToConversations(data);
      setConversations(normalized as Conversation[]);
    } catch (e) {
      console.error(e);
      alert('Invalid conversations data format');
    }
  };

  return (
    <Layout title="Conversation Viewer">
      <div className="mb-6 text-white">
        <ClientFileReader 
          onFileLoaded={handleFileLoaded}
          buttonText="Load Conversations JSON"
        />
      </div>

      {loading && (
        <NeuromorphicCard className="p-4 mb-6">
          <p className="text-white">Loading conversations...</p>
        </NeuromorphicCard>
      )}

      {error && (
        <NeuromorphicCard className="p-4 mb-6 bg-red-900">
          <p className="text-white">Error: {error}</p>
        </NeuromorphicCard>
      )}

      {viewMode === 'list' ? (
        <ConversationList 
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
        />
      ) : selectedConversation && (
        <div>
          <button 
            onClick={handleBackToList}
            className="neuromorphic-button mb-6 text-white"
            aria-label="Back to conversation list"
          >
            ← Back to List
          </button>
          <ConversationViewer conversation={selectedConversation} />
        </div>
      )}
    </Layout>
  );
}
