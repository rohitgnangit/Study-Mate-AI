import React, { useState, useRef } from 'react';
import { Upload, FileText } from 'lucide-react';


const CustomFileInput = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile || null);
    if (onFileSelect) {
      onFileSelect(selectedFile || null); // Pass file data to a parent component
    }
  };

  const handleButtonClick = () => {
    // Triggers the hidden file input when the button is clicked
    inputRef.current.click();
  };

  return (
    <div className="fileUpload flex flex-col gap-4 justify-center items-center">
      {/* 1. Hidden Native File Input */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden" // Hides the input but keeps its functionality
        aria-label="Upload file selector"
      />

      {/* 2. Custom Trigger Button/Area */}
      <div className="flex flex-col items-center justify-center gap-3">

        {/* The Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className=" text-white bg-gray-800 border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 hover:bg-gray-700 font-semibold rounded-lg text-sm px-6 py-2.5 transition duration-150 ease-in-out shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          {file ? 'Change File' : 'Select or Drop File'}
        </button>

        {/* 3. Display Selected File Name */}
        {file ? (
          <p className="text-sm text-gray-700 font-medium flex items-center gap-2 max-w-full truncate">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-400"> ({(file.size / 1024).toFixed(1)} KB)</span>
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            PNG, JPG, or PDF (Max 5MB)
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomFileInput;