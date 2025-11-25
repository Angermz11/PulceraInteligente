import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, RefreshCw, Share2, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface LocationScreenProps {
  darkMode: boolean;
}

export default function LocationScreen({ darkMode }: LocationScreenProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('Hace 5 minutos');

  const handleRefresh = () => {
    setLastUpdate('Actualizando...');
    setTimeout(() => {
      setLastUpdate('Ahora');
    }, 1000);
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
          {/* Mock Map */}
          <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-700 dark:to-gray-600">
            {/* Map placeholder with streets pattern */}
            <svg className="w-full h-full opacity-30" viewBox="0 0 400 320">
              <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="0" x2="100" y2="320" stroke="currentColor" strokeWidth="2" />
              <line x1="200" y1="0" x2="200" y2="320" stroke="currentColor" strokeWidth="3" />
              <line x1="300" y1="0" x2="300" y2="320" stroke="currentColor" strokeWidth="2" />
            </svg>
            
            {/* Location Pin */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
            >
              <MapPin className="w-12 h-12 text-red-500 fill-red-500/20" />
            </motion.div>

            {/* Pulse effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-red-500"
              />
            </div>

            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-xl">+</span>
              </button>
              <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-xl">−</span>
              </button>
            </div>
          </div>

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
              onClick={() => setIsTracking(!isTracking)}
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
    </div>
  );
}