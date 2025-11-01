import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { saveFileAction } from '@/actions/saveFileAction';
import { useSession } from 'next-auth/react';


const CustomFileInput = () => {
  const { data:session } = useSession();

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("")
  const inputRef = useRef(null);

  // Handle File Selection
    // if(!["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(uploadFile?.type)){
    //   setUploadMessage("Please upload only PNG, JPG, or PDF files.");
    //   return;
    // }
  


  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setUploadMessage("")
    if (selectedFile) {
      setUploadFile(selectedFile); // Pass file data to a parent component
    }
  };

  const handleButtonClick = () => {
    // Triggers the hidden file input when the button is clicked
    inputRef.current.click();
  };

  const handleUpload = async (formData) => {
    if (!uploadFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }
    setUploadFileLoading(true);
    setUploadMessage("Uploading...")
    try {
      // Construct the FormData Object
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      // Define the Cloudinary API URL
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`;

      // Send the request to Cloudinary
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed with status " + response.status);
      }
      const result = await response.json();
      setUploadMessage("File uploaded successfully!");
      console.log('Upload successful:', result);

      // Sending file data to server action to save in database
      await saveFileAction({
        userId: session.user.id,
        fileUrl: result.secure_url,
        publicId: result.public_id,
        fileName: uploadFile.name,
        fileType: uploadFile.type,
        fileSize: uploadFile.size,
      })

      // Clear selected file after upload
      setUploadFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage("Upload failed." + error.message);
    } finally {
      setUploadFileLoading(false);
    }
  }

  return (
    <div className="fileUpload flex flex-col gap-4 justify-center items-center">
      {/* Hidden File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
        aria-label="Upload file selector"
      />

      {/* Button Area*/}
      <div className="text-gray-200 flex flex-col items-center justify-center gap-3">
        {/* Upload Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className=" text-white bg-gray-800 border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 hover:bg-gray-700 font-semibold rounded-lg text-sm px-6 py-2.5 transition duration-150 ease-in-out shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          {uploadFile ? 'Change File' : 'Upload File'}
        </button>

        {/* Display Selected File Name */}
        {uploadFile ? (
          <p className="text-sm text-gray-700 font-medium flex items-center gap-2 max-w-full truncate">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span className="truncate">{uploadFile.name}</span>
            <span className="text-xs text-gray-400"> ({(uploadFile.size / 1024).toFixed(1)} KB)</span>
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            PNG, JPG, or PDF (Max 10MB)
          </p>
        )
        }

        {/* Upload Action Button */}
        {uploadFile && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploadFileLoading}
            className={`mt-2 font-semibold rounded-lg text-sm px-10 py-2.5 flex items-center justify-center gap-2 transition duration-150 cursor-pointer ${uploadFileLoading
                ? 'bg-indigo-300 text-indigo-100 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-800 shadow-md'
              }`}
          >
            {uploadFileLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              'Submit File'
            )}
          </button>
        )}
        {/* Upload Message */}
        {uploadMessage && (
          <p className={`mt-2 text-sm font-medium ${uploadMessage.startsWith('❌') ? 'text-red-500' : 'text-green-600'}`}>
            {uploadMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomFileInput;