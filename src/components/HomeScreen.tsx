import image_3521519f8aeac2ff98e73980f3c55c821b88931f from 'figma:asset/3521519f8aeac2ff98e73980f3c55c821b88931f.png';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Battery, MapPin, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { Button } from './ui/button';
import logoShield from 'figma:asset/c2e7196379613d07604a35a47c7e9ed8afd840e7.png';

interface HomeScreenProps {
  darkMode: boolean;
}

export default function HomeScreen({ darkMode }: HomeScreenProps) {
  const [braceletConnected, setBraceletConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);

  const recentAlerts = [
    { id: 1, type: 'emergency', message: 'Alerta manual enviada', time: 'Hace 2 horas', location: 'Calle Mayor, 45' },
    { id: 2, type: 'info', message: 'Batería baja', time: 'Ayer', location: '-' },
  ];

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] pt-12 pb-8 px-6 rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
            <img src={image_3521519f8aeac2ff98e73980f3c55c821b88931f} alt="ÉGIDA" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-white text-3xl tracking-wide mb-2">ÉGIDA</h1>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full ${braceletConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className="text-white text-sm">
              {braceletConnected ? 'Pulsera conectada' : 'Pulsera desconectada'}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="px-6 -mt-6">
        {/* Protection Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#2563eb] rounded-3xl p-6 shadow-xl mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-[#2563eb]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl">Sistema de protección activo</h3>
              <p className="text-white/80 text-sm mt-1">Tu seguridad está siendo monitoreada</p>
            </div>
          </div>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg`}
          >
            <Battery className={`w-6 h-6 ${batteryLevel > 20 ? 'text-green-500' : 'text-red-500'} mb-2`} />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Batería</p>
            <p className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'} mt-1`}>{batteryLevel}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg`}
          >
            <MapPin className="w-6 h-6 text-blue-500 mb-2" />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ubicación</p>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} mt-1`}>Disponible</p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-6"
        >
          <Button className="w-full h-14 bg-[#1e3a5f] hover:bg-[#152a45] text-white rounded-2xl shadow-md">
            <Phone className="w-5 h-5 mr-2" />
            Contactos de emergencia
          </Button>
          
          <Button className="w-full h-14 bg-[#1e3a5f] hover:bg-[#152a45] text-white rounded-2xl shadow-md">
            <MapPin className="w-5 h-5 mr-2" />
            Ver ubicación compartida
          </Button>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Alertas recientes</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${alert.type === 'emergency' ? 'text-red-500' : 'text-yellow-500'}`} />
                  <div className="flex-1">
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.message}</p>
                    <div className={`flex items-center gap-3 mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>{alert.time}</span>
                      {alert.location !== '-' && (
                        <>
                          <span>•</span>
                          <span>{alert.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center pb-4"
        >
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tu seguridad está activa</p>
        </motion.div>
      </div>

      {/* Emergency FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-2xl flex items-center justify-center z-20"
      >
        <Shield className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}
