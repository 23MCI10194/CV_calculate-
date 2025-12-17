import React from 'react';
import { X, Key, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleUpdateKey = async () => {
    try {
      if ((window as any).aistudio?.openSelectKey) {
        await (window as any).aistudio.openSelectKey();
        // The process.env.API_KEY is updated automatically in the background
      } else {
        alert("API Key selection is not supported in this environment.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to open key selection dialog.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-400" />
          Settings
        </h2>

        <div className="space-y-6">
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">API Configuration</h3>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              This application is powered by the Gemini 2.5 Flash model. The API key is managed securely by the environment.
            </p>
            
            <button 
              onClick={handleUpdateKey}
              className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-slate-600 shadow-sm"
            >
              <Key className="w-4 h-4" />
              Update API Key
            </button>
            <p className="text-xs text-slate-500 mt-3 text-center">
              You will be prompted to select a Google Cloud project or API key.
            </p>
          </div>

          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
             <div className="flex gap-3">
                <ExternalLink className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                    <h3 className="text-sm font-semibold text-blue-400 mb-1">About Gemini 2.5</h3>
                    <p className="text-xs text-blue-300/80 leading-relaxed">
                        This tool utilizes the latest Gemini 2.5 Flash model for high-speed, accurate resume analysis and ATS scoring.
                    </p>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};