import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Shield, Bluetooth, Bell, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TutorialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const tutorialSteps = [
  {
    icon: Shield,
    title: 'Bienvenido a ÉGIDA',
    description: 'Tu sistema personal de seguridad y alerta de emergencias',
    content: 'ÉGIDA es una aplicación diseñada para protegerte en todo momento. Con tu pulsera inteligente, puedes enviar alertas de emergencia con solo pulsar un botón.',
    color: 'text-blue-500'
  },
  {
    icon: Bluetooth,
    title: 'Conecta tu pulsera',
    description: 'Vincula tu dispositivo ÉGIDA',
    content: 'Ve a Ajustes > Vincular pulsera para conectar tu dispositivo. Asegúrate de que el Bluetooth esté activado y la pulsera esté encendida.',
    color: 'text-purple-500'
  },
  {
    icon: Phone,
    title: 'Contactos de emergencia',
    description: 'Configura quién recibirá tus alertas',
    content: 'Añade hasta 5 contactos de emergencia. Ellos recibirán notificaciones inmediatas con tu ubicación cuando actives una alerta.',
    color: 'text-green-500'
  },
  {
    icon: Bell,
    title: 'Alertas automáticas',
    description: 'Protección inteligente',
    content: 'Activa la detección de caídas, alertas por inactividad y zonas seguras para una protección completa y automática.',
    color: 'text-orange-500'
  },
  {
    icon: MapPin,
    title: 'Ubicación en tiempo real',
    description: 'Comparte tu posición',
    content: 'Tu ubicación se comparte automáticamente cuando activas una alerta. También puedes compartirla manualmente desde la sección de Ubicación.',
    color: 'text-red-500'
  }
];

export default function TutorialDialog({ isOpen, onClose, darkMode }: TutorialDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const step = tutorialSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-md`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            Guía de inicio
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Progress indicators */}
          <div className="flex gap-2 mb-6">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  index <= currentStep
                    ? darkMode ? 'bg-blue-500' : 'bg-blue-600'
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {step.description}
                </p>
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {step.content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t dark:border-gray-700">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className={`${
                currentStep === 0 ? 'invisible' : ''
              } ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentStep + 1} de {tutorialSteps.length}
            </span>

            {currentStep < tutorialSteps.length - 1 ? (
              <Button
                onClick={nextStep}
                className={darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                className={darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}
              >
                ¡Empezar!
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
