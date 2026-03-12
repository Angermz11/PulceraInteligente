import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';

interface EmergencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  darkMode: boolean;
}

export default function EmergencyDialog({ isOpen, onClose, onConfirm, darkMode }: EmergencyDialogProps) {
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleConfirm = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onConfirm();
          return null;
        }
        return prev! - 1;
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={countdown === null ? onClose : undefined}
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
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 relative">
                <button
                  onClick={onClose}
                  disabled={countdown !== null}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex flex-col items-center">
                  <motion.div
                    animate={countdown !== null ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: countdown !== null ? Infinity : 0 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4"
                  >
                    {countdown !== null ? (
                      <span className="text-red-500 text-4xl">{countdown}</span>
                    ) : (
                      <Shield className="w-10 h-10 text-red-500" />
                    )}
                  </motion.div>
                  <h2 className="text-white text-2xl text-center">
                    {countdown !== null ? 'Enviando alerta...' : '¡Alerta de Emergencia!'}
                  </h2>
                  <p className="text-white/90 text-center mt-2">
                    {countdown !== null 
                      ? 'Notificando a tus contactos de emergencia'
                      : '¿Estás en peligro?'
                    }
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {countdown === null ? (
                  <>
                    <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-2xl p-4 mb-6`}>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Al confirmar, se enviará una alerta de emergencia a:
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Tus 3 contactos de emergencia
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Tu ubicación en tiempo real
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleConfirm}
                        className="w-full h-14 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg text-lg"
                      >
                        Confirmar Emergencia
                      </Button>
                      <Button
                        onClick={onClose}
                        variant="outline"
                        className={`w-full h-14 rounded-2xl ${
                          darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                        }`}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 mx-auto mb-4"
                    >
                      <Shield className="w-full h-full text-red-500" />
                    </motion.div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Por favor espera...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
