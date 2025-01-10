import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

interface ImageUploadFieldProps {
  label: string;
  id: string;
  onChange: (file: File | null) => void;
}

export function ImageUploadField({
  label,
  id,
  onChange,
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file to get a data URL
    } else {
      setPreview(null);
    }
    onChange(file); // Pass the file to the parent component
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file); // Pass the file to the helper function
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] || null; // Extract the file from the drag event
    handleFileChange(file); // Pass the file to the helper function
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="col-span-full">
      {/* <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label> */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mt-2 justify-center rounded-lg border min-h-[250px] items-center relative ${
          dragging
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-900/25 border-dashed'
        }`}
      >
        <div className="relative text-center h-full">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover max-h-[300px] rounded-md w-full"
            />
          ) : (
            <>
              <div className="flex flex-col text-sm text-gray-600 mt-12">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-16 w-16 text-gray-300 mb-4"
                />
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                >
                  <span>Upload Cover Photo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*" // Restrict to image files
                    onChange={handleFileInputChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 2MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
