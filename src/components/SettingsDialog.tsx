import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  title: string;
  description: string;
  content: React.ReactNode;
}

export default function SettingsDialog({ 
  isOpen, 
  onClose, 
  darkMode, 
  title, 
  description,
  content 
}: SettingsDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl max-w-md w-full overflow-hidden`}>
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <h2 className="text-white text-2xl mb-2">{title}</h2>
                <p className="text-white/80 text-sm">{description}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {content}
                
                <Button
                  onClick={onClose}
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-2xl mt-6"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
