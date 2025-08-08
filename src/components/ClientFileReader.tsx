import React, { useRef, useState } from 'react';

interface FileReaderProps {
  onFileLoaded: (data: unknown) => void;
  accept?: string;
  buttonText?: string;
}

const ClientFileReader: React.FC<FileReaderProps> = ({
  onFileLoaded,
  accept = '.json',
  buttonText = 'Select JSON File'
}) => {
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    // Head-check first few KB to validate structure quickly
    const headReader = new FileReader();
    const HEAD_BYTES = 64 * 1024; // 64KB
    const headBlob = file.slice(0, HEAD_BYTES);

    headReader.onload = (e) => {
      try {
        const headText = (e.target?.result as string) || '';
        // Attempt partial JSON detection: supports {"conversations": [ ... or top-level [
        const looksLikeArray = headText.trimStart().startsWith('[');
        const looksLikeObjectWithConversations = /"conversations"\s*:\s*\[/i.test(headText);
        if (!looksLikeArray && !looksLikeObjectWithConversations) {
          // Not obviously valid shape; continue but warn
          console.warn('File head does not look like expected conversations JSON shape. Proceeding to full parse.');
        }
      } catch (err) {
        console.warn('Head check failed; proceeding to full parse.', err);
      } finally {
        // Full read and parse
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const content = (ev.target?.result as string) || '';
            const parsedData = JSON.parse(content);
            onFileLoaded(parsedData);
          } catch (error) {
            console.error('Error parsing JSON file:', error);
            alert('Error parsing JSON file. Please make sure it is valid JSON.');
          }
        };
        reader.readAsText(file);
      }
    };

    headReader.readAsText(headBlob);
  };

  const openPicker = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div className="mb-6">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        aria-hidden
      />
      <button type="button" onClick={openPicker} className="neuromorphic-button cursor-pointer">
        {buttonText}
      </button>
      {fileName && (
        <span className="ml-3 text-sm text-white/80 align-middle">
          {fileName}
        </span>
      )}
    </div>
  );
};

export default ClientFileReader;
