import { useState } from 'react';
import FileUpload from './FileUpload';
import ImageGrid from './ImageGrid';

function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <FileUpload onFileChange={handleFileChange} filesLength={files.length} />
        <ImageGrid files={files} />
      </div>
    </>
  );
}

export default ImageUploader;
