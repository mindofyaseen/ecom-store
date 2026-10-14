import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, CheckCircle2, RefreshCw } from 'lucide-react';

export const ImageUploadField = ({
  label = "Upload Image",
  value = "",
  onChange,
  maxDimension = 1000,
  quality = 0.82,
  placeholder = "https://... ya /assets/...",
  helpText = "Upload directly from your device (Laptop, Phone gallery) or paste a web URL."
}) => {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [isProcessing, setIsProcessing] = useState(false);
  const [sizeInfo, setSizeInfo] = useState(null);
  const fileInputRef = useRef(null);

  // Compress & convert file to Base64 Data URL via Canvas
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Bara-e-meharbani sirf image file (JPG, PNG, WebP) select karein.');
      return;
    }

    setIsProcessing(true);
    const originalSizeKb = Math.round(file.size / 1024);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Calculate proportional scale
        const maxDim = maxDimension || 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        // Draw onto Canvas for client-side compression
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-quality JPEG or PNG
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, quality || 0.82);

        // Calculate compressed size
        const compressedSizeKb = Math.round((compressedDataUrl.length * (3 / 4)) / 1024);
        setSizeInfo({ original: originalSizeKb, compressed: compressedSizeKb });
        setIsProcessing(false);

        // Pass back to parent
        onChange(compressedDataUrl);
      };

      img.onerror = () => {
        setIsProcessing(false);
        alert('Image process karne mein masla aaya. Dobara koshish karein.');
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      setIsProcessing(false);
      alert('File parhne mein masla aaya.');
    };

    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange('');
    setSizeInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>{label}</span>
        </label>

        {/* Mode Toggle: Device Upload vs Paste URL */}
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image URL</span>
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-2">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Upload Area / Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
              value
                ? 'border-amber-500/40 bg-amber-500/5 hover:border-amber-400'
                : 'border-slate-700 bg-slate-950 hover:border-amber-500/60 hover:bg-slate-900/50'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2 text-amber-400 text-xs py-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing & compressing image from device...</span>
              </div>
            ) : value ? (
              <div className="flex items-center gap-3 w-full justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-[#1C0A02] border border-[#ECB85A]/40 overflow-hidden shrink-0 flex items-center justify-center">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="text-xs font-bold text-white block truncate flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Image Loaded
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {sizeInfo ? `${sizeInfo.original} KB ➔ ${sizeInfo.compressed} KB (Optimized)` : 'Ready to use on store'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold rounded-lg border border-slate-700"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg border border-rose-800/60"
                    title="Remove Photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400 block hover:underline">
                    📁 Device se Image Select Karein (Laptop / Mobile)
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    JPG, PNG, WebP — automatically compressed for fast loading
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* URL Input Mode */
        <div className="space-y-1.5">
          <div className="relative">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pr-8"
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Helpful Hint */}
      <p className="text-[10px] text-slate-400 italic">
        {helpText}
      </p>
    </div>
  );
};
