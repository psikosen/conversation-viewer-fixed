# Neuromorphic Design JS Application - Usage Guide

This application is a neuromorphic design viewer for conversations exported from Claude or similar AI assistants. It features a black neuromorphic design with adjustable grid view, search functionality, and proper formatting for conversations including code blocks and LaTeX.

## Features

- **Neuromorphic Design**: Black theme with soft shadows and subtle depth effects
- **Adjustable Grid View**: Responsive grid layout that adapts to different screen sizes
- **Sortable Conversations**: Sort by title or date
- **Search Functionality**: Search through conversations by title or content
- **Pagination**: Navigate through multiple pages of conversations
- **Proper Syntax Formatting**: Code blocks with syntax highlighting
- **LaTeX Support**: Render mathematical equations
- **Accessibility**: ARIA attributes and keyboard navigation support

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Loading Conversations

The application can load conversations from a JSON file. The expected format is:

```json
{
  "conversations": [
    {
      "meta": {
        "exported_at": "2024-03-19 16:03:09",
        "title": "Conversation Title"
      },
      "chats": [
        {
          "index": 0,
          "type": "prompt",
          "message": [
            {
              "type": "p",
              "data": "User message content"
            }
          ]
        },
        {
          "index": 1,
          "type": "response",
          "message": [
            {
              "type": "p",
              "data": "AI response content"
            },
            {
              "type": "pre",
              "language": "javascript",
              "data": "console.log('Code example');"
            }
          ]
        }
      ]
    }
  ]
}
```

Click the "Load Conversations JSON" button to select and load your conversations file.

## Project Structure

- `/src/components`: UI components including neuromorphic cards and conversation display
- `/src/hooks`: Custom hooks for data loading and state management
- `/src/utils`: Utility functions for file reading and data processing
- `/public`: Sample JSON files for testing

## Technologies Used

- Next.js with TypeScript
- Tailwind CSS for styling
- React Grid Layout for adjustable grid
- React Markdown for text formatting
- KaTeX for LaTeX rendering
- React Syntax Highlighter for code blocks
