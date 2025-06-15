//frontend/components/cheer/forms/common/CheerImageUploader.tsx
// 画像アップローダー（掛け声用）

import { useImageUploader } from "@/lib/hooks/useImageUploader";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  onUploadComplete: (url: string) => void;
};

export function CheerImageUploader({ onUploadComplete }: Props) {
  const {
    uploading,
    uploadedUrl,
    previewUrl,
    error: uploadError,
    handleFileChange,
    reset,
  } = useImageUploader();

  // アップロード完了時、親にURLを渡す
  if (uploadedUrl) {
    onUploadComplete(uploadedUrl);
  }

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-muted-foreground block'>画像ファイル(必須)</label>
      <label className='block w-full cursor-pointer rounded-xl border border-dashed border-input bg-white px-4 py-3 text-center text-sm text-muted-foreground hover:bg-gray-50 transition'>
        画像を選択
        <input type='file' accept='image/*' onChange={handleFileChange} disabled={uploading} className='hidden' />
      </label>

      {!previewUrl && !uploading && (
        <p className='text-xs text-muted-foreground text-center'>
          筋肉やポージングがわかる画像をアップロードしてください
        </p>
      )}

      {previewUrl && (
        <div className='mt-2 space-y-2'>
          <Image
            src={previewUrl}
            alt='画像プレビュー'
            className='rounded-xl border max-h-40 object-contain mx-auto'
            width={320}
            height={240}
          />
          <div className='flex justify-center'>
            <Button type='button' onClick={reset} variant='outline' size='sm' className='rounded-lg'>
              画像を変更
            </Button>
          </div>
        </div>
      )}

      {uploadError && <div className='text-sm text-red-600'>{uploadError}</div>}
    </div>
  );
}
