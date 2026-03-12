import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, RefreshCw, Share2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import MapComponent from './MapComponent';
import ShareLocationDialog from './ShareLocationDialog';

interface LocationScreenProps {
  darkMode: boolean;
}

export default function LocationScreen({ darkMode }: LocationScreenProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('Hace 5 minutos');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleRefresh = () => {
    setLastUpdate('Actualizando...');
    toast.info('Actualizando ubicación...');
    setTimeout(() => {
      setLastUpdate('Ahora');
      toast.success('Ubicación actualizada');
    }, 1000);
  };

  const handleShare = (method: string) => {
    const messages: Record<string, string> = {
      whatsapp: 'Ubicación compartida por WhatsApp',
      email: 'Ubicación compartida por Email',
      copy: 'Enlace copiado al portapapeles'
    };
    toast.success(messages[method] || 'Ubicación compartida');
  };

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    toast.success(
      !isTracking ? 'Rastreo en tiempo real activado' : 'Rastreo en tiempo real desactivado'
    );
  };

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] pt-12 pb-6 px-6 rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white text-3xl mb-2">Ubicación</h1>
          <p className="text-white/80">Rastrea tu pulsera en tiempo real</p>
        </motion.div>
      </div>

      <div className="px-6 mt-6">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-xl overflow-hidden mb-6`}
        >
          {/* Real Map */}
          <MapComponent darkMode={darkMode} />

          {/* Location Info */}
          <div className="p-5 border-t dark:border-gray-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>Última ubicación registrada</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Salamanca, Guanajuato
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {lastUpdate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <Button
            onClick={handleRefresh}
            className={`h-14 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
            }`}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Actualizar
          </Button>

          <Button
            onClick={() => setShowShareDialog(true)}
            className={`h-14 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
            }`}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartir
          </Button>
        </motion.div>

        {/* Tracking Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isTracking ? 'bg-green-100 dark:bg-green-950' : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                <Navigation className={`w-6 h-6 ${isTracking ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                  Rastreo en tiempo real
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isTracking ? 'Activo' : 'Desactivado'}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleToggleTracking}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isTracking ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <motion.div
                layout
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ left: isTracking ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Location History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Historial de ubicaciones
          </h2>
          <div className="space-y-3">
            {[
              { time: 'Hoy, 14:30', location: 'Salamanca, Guanajuato' },
              { time: 'Hoy, 11:15', location: 'Salamanca, Guanajuato' },
              { time: 'Ayer, 18:20', location: 'Salamanca, Guanajuato' }
            ].map((item, index) => (
              <div
                key={index}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-sm`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm mb-1`}>
                      {item.location}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Share Location Dialog */}
      <ShareLocationDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        onShare={handleShare}
        darkMode={darkMode}
      />
    </div>
  );
}