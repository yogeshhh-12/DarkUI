import React, { useState, useRef } from 'react';
import { 
  Search, 
  UploadCloud, 
  Sparkles, 
  Clipboard, 
  AlertCircle, 
  FileText, 
  Image as ImageIcon, 
  X, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

interface ScannerCardProps {
  initialMode?: 'url' | 'screenshot';
}

export const ScannerCard: React.FC<ScannerCardProps> = ({ initialMode = 'url' }) => {
  const { 
    runUrlScan, 
    runDemoScan, 
    runScreenshotScan, 
    isScanning, 
    scanError 
  } = useSafeCart();

  const [activeTab, setActiveTab] = useState<'url' | 'screenshot'>(initialMode);
  const [urlInput, setUrlInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrlInput(text);
    } catch {
      // Fallback
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    runUrlScan(urlInput.trim());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleScreenshotSubmit = () => {
    if (!selectedFile) return;
    runScreenshotScan(selectedFile);
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 sm:p-7 transition-all"
      id="main-scanner-card"
    >
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            id="tab-mode-url"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'url'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Website URL</span>
          </button>

          <button
            type="button"
            id="tab-mode-screenshot"
            onClick={() => setActiveTab('screenshot')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'screenshot'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Screenshot</span>
          </button>
        </div>

        {/* Demo Scan Trigger Button */}
        <button
          type="button"
          id="scanner-demo-scan-shortcut"
          onClick={() => runDemoScan('shopease')}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Try Sample Scan</span>
          <span className="sm:hidden">Demo</span>
        </button>
      </div>

      {/* Mode 1: URL Scanner */}
      {activeTab === 'url' ? (
        <form onSubmit={handleUrlSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="checkout-url-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Paste Merchant or Checkout Page URL
            </label>
            <div className="relative flex items-center">
              <input
                id="checkout-url-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="e.g. https://store.example.com/checkout or cart"
                className="w-full pl-3.5 pr-28 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
              <button
                type="button"
                id="paste-url-btn"
                onClick={handlePaste}
                className="absolute right-2 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              SafeCart inspects pricing tables, pre-checked checkboxes, and fine print.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero credentials or card info requested</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setUrlInput('https://shopease-fictional-store.demo/checkout');
                  runDemoScan('shopease');
                }}
                className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Load Sample Store
              </button>

              <button
                type="submit"
                id="btn-scan-website"
                disabled={isScanning || !urlInput.trim()}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-xl shadow-sm transition-all"
              >
                <Search className="w-4 h-4" />
                <span>{isScanning ? 'Analyzing...' : 'Scan Website'}</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Mode 2: Screenshot Analyzer */
        <div className="mt-5 space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="screenshot-file-input"
          />

          {!previewUrl ? (
            /* Upload Dropzone */
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-emerald-500 bg-emerald-50/50' 
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
              id="screenshot-dropzone"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 mb-3 shadow-2xs">
                <UploadCloud className="w-6 h-6 text-slate-700" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-800">
                Click or drag & drop a checkout screenshot
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Supports product pages, order review, payment step, or subscription renewal screens (PNG, JPG, WebP)
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                <span>Max 15MB</span>
                <span>•</span>
                <span>Audited client-side or with secure AI vision</span>
              </div>
            </div>
          ) : (
            /* Upload Preview Box */
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 max-h-64 flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="Checkout screenshot preview" 
                  className="max-h-64 object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-slate-600 truncate">
                  {selectedFile?.name} ({(selectedFile?.size ? (selectedFile.size / 1024).toFixed(1) : 0)} KB)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Replace Image
                  </button>

                  <button
                    type="button"
                    onClick={handleScreenshotSubmit}
                    disabled={isScanning}
                    className="px-4 py-1.5 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Analyze Screenshot</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Honest Error & Inaccessible Website Fallback Notification */}
      {scanError && (
        <div 
          className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2 animate-in fade-in"
          id="scanner-inaccessible-error-box"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">
                {scanError}
              </p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Most live e-commerce checkouts require active user session cookies or logins, which prevents direct external crawling.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[11px]">Recommended alternatives:</span>
            <button
              type="button"
              onClick={() => setActiveTab('screenshot')}
              className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 transition-colors"
            >
              Upload Checkout Screenshot
            </button>
            <button
              type="button"
              onClick={() => runDemoScan('shopease')}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
            >
              Try Demo Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
