import { useRef } from 'react';
import { FileUp } from 'lucide-react';
import { useImageUpload } from '@hooks/useImageUpload';

interface ImagePickerProps {
  onImageSelected: (base64: string) => void;
  onError?: (error: string) => void;
  currentImage?: string;
  label?: string;
}

export default function ImagePicker({
  onImageSelected,
  onError,
  currentImage,
  label = 'Upload Image',
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useImageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { base64, error } = await uploadImage(file);
    if (error) {
      onError?.(error);
      return;
    }

    onImageSelected(base64);

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload image"
      />

      {currentImage && (
        <div className="relative w-full h-48 bg-dark-900 rounded-lg overflow-hidden border border-dark-700">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <button
        onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-700 hover:bg-dark-600 text-dark-50 rounded-lg font-medium transition-colors duration-200 border border-dark-600"
      >
        <FileUp size={18} />
        {currentImage ? 'Replace Image' : label}
      </button>
    </div>
  );
}
