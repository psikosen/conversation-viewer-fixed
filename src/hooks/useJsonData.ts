import { useState, useEffect } from 'react';
import { Conversation, Project } from '../utils/fileReader';

// Custom hook for loading conversations
export const useConversations = (initialData: Conversation[] = []) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load conversations from a file
  const loadConversations = async (file?: File) => {
    setLoading(true);
    setError(null);
    
    try {
      if (file) {
        // Client-side file loading using FileReader for broader compatibility
        const text = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsText(file);
        });
        const data = JSON.parse(text);
        
        // Check if the data is an array or has a conversations property
        const conversationsData = Array.isArray(data) ? data : data.conversations;
        
        if (conversationsData && Array.isArray(conversationsData)) {
          setConversations(conversationsData);
        } else {
          throw new Error('Invalid conversations data format');
        }
      } else {
        // Default to fetch from public directory in development
        const response = await fetch('/conversations.json');
        const data = await response.json();
        
        // Check if the data is an array or has a conversations property
        const conversationsData = Array.isArray(data) ? data : data.conversations;
        
        if (conversationsData && Array.isArray(conversationsData)) {
          setConversations(conversationsData);
        } else {
          throw new Error('Invalid conversations data format');
        }
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError(err instanceof Error ? err.message : 'Unknown error loading conversations');
    } finally {
      setLoading(false);
    }
  };

  // Load default conversations on mount
  useEffect(() => {
    if (initialData.length === 0) {
      loadConversations();
    }
    // We intentionally only run on mount to fetch defaults
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { conversations, loading, error, loadConversations, setConversations };
};

// Custom hook for loading projects
export const useProjects = (initialData: Project[] = []) => {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load projects from a file
  const loadProjects = async (file?: File) => {
    setLoading(true);
    setError(null);
    
    try {
      if (file) {
        // Client-side file loading using FileReader for broader compatibility
        const text = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsText(file);
        });
        const data = JSON.parse(text);
        
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error('Invalid projects data format');
        }
      } else {
        // Default to fetch from public directory in development
        const response = await fetch('/projects.json');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error('Invalid projects data format');
        }
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err instanceof Error ? err.message : 'Unknown error loading projects');
    } finally {
      setLoading(false);
    }
  };

  // Load default projects on mount
  useEffect(() => {
    if (initialData.length === 0) {
      loadProjects();
    }
    // We intentionally only run on mount to fetch defaults
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { projects, loading, error, loadProjects, setProjects };
};
