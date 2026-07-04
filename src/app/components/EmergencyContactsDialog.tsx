import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Mail, UserPlus, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

interface EmergencyContactsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function EmergencyContactsDialog({ isOpen, onClose, darkMode }: EmergencyContactsDialogProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'María García', phone: '+34 600 111 222', email: 'maria.garcia@email.com', relationship: 'Madre' },
    { id: 2, name: 'Carlos Ramírez', phone: '+34 600 333 444', email: 'carlos.ramirez@email.com', relationship: 'Padre' },
    { id: 3, name: 'Laura Martínez', phone: '+34 600 555 666', email: 'laura.martinez@email.com', relationship: 'Hermana' }
  ]);
  const [isAdding, setIsAdding] = useState(false);

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
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col`}>
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] p-6 relative flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <h2 className="text-white text-2xl mb-2">Contactos de Emergencia</h2>
                <p className="text-white/80 text-sm">Personas que serán notificadas en caso de emergencia</p>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-3 mb-4">
                  {contacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                            {contact.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {contact.relationship}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 rounded-full bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                            <Edit2 className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {contact.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-500" />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {contact.email}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {contacts.length < 5 && (
                  <Button
                    onClick={() => setIsAdding(true)}
                    variant="outline"
                    className={`w-full h-12 rounded-2xl border-dashed ${
                      darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300'
                    }`}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Agregar contacto
                  </Button>
                )}

                <div className={`mt-6 p-4 rounded-2xl ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    💡 Recomendamos tener al menos 3 contactos de emergencia configurados.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t dark:border-gray-700 flex-shrink-0">
                <Button
                  onClick={onClose}
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-2xl"
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
