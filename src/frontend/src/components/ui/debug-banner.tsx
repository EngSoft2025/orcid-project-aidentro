import React from 'react';
import { Bug, X } from 'lucide-react';
import { isDebugMode, getDebugOrcidId } from '@/utils/debugConfig';

interface DebugBannerProps {
  onClose?: () => void;
  className?: string;
}

const DebugBanner: React.FC<DebugBannerProps> = ({ onClose, className = '' }) => {
  if (!isDebugMode()) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bug className="h-5 w-5 text-purple-200" />
          <div>
            <h3 className="font-semibold text-sm">
              🔧 MODO DEBUG ATIVO
            </h3>
            <p className="text-xs text-purple-100">
              Usando ORCID ID hardcoded: {getDebugOrcidId()} • Dados simulados para desenvolvimento
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DebugBanner; 