import fs from 'fs';
import path from 'path';

export interface Conversation {
  meta: {
    exported_at: string;
    title: string;
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
}

export interface Project {
  uuid: string;
  name: string;
  description: string;
  is_private: boolean;
  is_starter_project: boolean;
  prompt_template: string;
  created_at: string;
  updated_at: string;
  creator: {
    uuid: string;
    full_name: string;
  };
  docs: Array<{
    uuid: string;
    filename: string;
    content: string;
  }>;
}

export const readConversationsFile = (): Conversation[] => {
  try {
    // In a real application, this would be a path to the user's local file
    // For development, we'll use a sample file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'conversations.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading conversations file:', error);
    return [];
  }
};

export const readProjectsFile = (): Project[] => {
  try {
    // In a real application, this would be a path to the user's local file
    // For development, we'll use a sample file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading projects file:', error);
    return [];
  }
};
