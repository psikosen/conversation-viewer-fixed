import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import NeuromorphicCard from './NeuromorphicCard';

interface MessageProps {
  type: 'prompt' | 'response';
  content: Array<{
    type: string;
    data: string;
    language?: string;
  }>;
}

const Message: React.FC<MessageProps> = ({ type, content }) => {
  return (
    <div className={`message ${type === 'prompt' ? 'user-message' : 'ai-message'} mb-4`}>
      <div className="message-header text-sm text-gray-400 mb-1">
        {type === 'prompt' ? 'User' : 'AI'}
      </div>
      <NeuromorphicCard className={`${type === 'prompt' ? 'bg-gray-900' : ''} text-white p-5` }>
        {content.map((item, index) => {
          switch (item.type) {
            case 'p':
              return (
                <div key={index} className="mb-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {item.data}
                  </ReactMarkdown>
                </div>
              );
            case 'pre':
              return (
                <div key={index} className="mb-3">
                  <SyntaxHighlighter
                    language={item.language || 'text'}
                    style={atomDark}
                    className="rounded-md"
                  >
                    {item.data}
                  </SyntaxHighlighter>
                </div>
              );
            default:
              return <div key={index} className="text-white">{item.data}</div>;
          }
        })}
      </NeuromorphicCard>
    </div>
  );
};

export default Message;
