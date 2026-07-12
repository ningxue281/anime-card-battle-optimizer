import { useCallback } from 'react';

const SUPPORTED_FORMATS = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const useImageUpload = () => {
  const validateImage = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        return {
          valid: false,
          error: 'Supported formats: PNG, JPG, JPEG, WEBP',
        };
      }

      if (file.size > MAX_FILE_SIZE) {
        return {
          valid: false,
          error: 'Image must be smaller than 5MB',
        };
      }

      return { valid: true };
    },
    []
  );

  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadImage = useCallback(
    async (file: File): Promise<{ base64: string; error?: string }> => {
      const validation = validateImage(file);
      if (!validation.valid) {
        return { base64: '', error: validation.error };
      }

      try {
        const base64 = await fileToBase64(file);
        return { base64 };
      } catch (error) {
        return {
          base64: '',
          error: error instanceof Error ? error.message : 'Failed to upload image',
        };
      }
    },
    [validateImage, fileToBase64]
  );

  return { uploadImage, validateImage };
};
