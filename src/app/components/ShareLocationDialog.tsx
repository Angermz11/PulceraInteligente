import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Mail, Link2, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface ShareLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onShare: (method: string) => void;
}

export default function ShareLocationDialog({ isOpen, onClose, darkMode, onShare }: ShareLocationDialogProps) {
  const shareOptions = [
    { id: 'whatsapp', icon: MessageSquare, label: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'email', icon: Mail, label: 'Email', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'copy', icon: Copy, label: 'Copiar enlace', color: 'bg-gray-500 hover:bg-gray-600' }
  ];

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

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Link2 className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl">Compartir ubicación</h2>
                    <p className="text-white/80 text-sm">Elige cómo compartir</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-2xl p-4 mb-6`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    <strong>Ubicación actual:</strong>
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Salamanca, Guanajuato, México
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                    20.5738° N, 101.1826° W
                  </p>
                </div>

                <div className="space-y-3">
                  {shareOptions.map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => {
                        onShare(option.id);
                        onClose();
                      }}
                      className={`w-full h-14 ${option.color} text-white rounded-2xl shadow-md flex items-center justify-center gap-3`}
                    >
                      <option.icon className="w-5 h-5" />
                      {option.label}
                    </Button>
                  ))}
                </div>

                <div className={`mt-6 p-4 rounded-2xl ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    🔒 Tu ubicación solo será compartida con las personas que elijas. El enlace expirará en 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
