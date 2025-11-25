import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, MapPin, Clock, Filter, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface AlertsScreenProps {
  darkMode: boolean;
}

const alertsData = [
  {
    id: 1,
    type: 'emergency',
    title: 'Alerta de emergencia',
    message: 'Botón de pánico activado',
    date: '2025-11-11',
    time: '14:30',
    location: 'Salamanca, Guanajuato',
    coordinates: '40.4168, -3.7038'
  },
  {
    id: 2,
    type: 'manual',
    title: 'Alerta manual',
    message: 'Alerta enviada desde la app',
    date: '2025-11-10',
    time: '19:15',
    location: 'Salamanca, Guanajuato',
    coordinates: '40.4169, -3.7033'
  },
  {
    id: 3,
    type: 'fall',
    title: 'Detección de caída',
    message: 'Posible caída detectada',
    date: '2025-11-09',
    time: '11:20',
    location: 'Salamanca, Guanajuato',
    coordinates: '40.4153, -3.6844'
  },
  {
    id: 4,
    type: 'battery',
    title: 'Batería baja',
    message: 'Nivel de batería: 15%',
    date: '2025-11-08',
    time: '22:45',
    location: '-',
    coordinates: null
  },
  {
    id: 5,
    type: 'emergency',
    title: 'Alerta de emergencia',
    message: 'Botón de pánico activado',
    date: '2025-11-05',
    time: '16:50',
    location: 'Salamanca, Guanajuato',
    coordinates: '37.3886, -5.9823'
  }
];

export default function AlertsScreen({ darkMode }: AlertsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'emergency' | 'manual'>('all');

  const filteredAlerts = filter === 'all' 
    ? alertsData 
    : alertsData.filter(alert => alert.type === filter);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'text-red-500 bg-red-50 dark:bg-red-950/30';
      case 'manual':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-950/30';
      case 'fall':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
      default:
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950/30';
    }
  };

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] pt-12 pb-6 px-6 rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white text-3xl mb-2">Alertas</h1>
          <p className="text-white/80">Historial de notificaciones y alertas</p>
        </motion.div>
      </div>

      <div className="px-6 mt-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={`rounded-full whitespace-nowrap ${
              filter === 'all' 
                ? 'bg-[#2563eb] text-white' 
                : darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Todas
          </Button>
          <Button
            onClick={() => setFilter('emergency')}
            variant={filter === 'emergency' ? 'default' : 'outline'}
            className={`rounded-full whitespace-nowrap ${
              filter === 'emergency' 
                ? 'bg-red-500 text-white' 
                : darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'
            }`}
          >
            Emergencias
          </Button>
          <Button
            onClick={() => setFilter('manual')}
            variant={filter === 'manual' ? 'default' : 'outline'}
            className={`rounded-full whitespace-nowrap ${
              filter === 'manual' 
                ? 'bg-orange-500 text-white' 
                : darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'
            }`}
          >
            Manuales
          </Button>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getAlertColor(alert.type)}`}>
                  {alert.type === 'battery' ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Shield className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {alert.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    {alert.message}
                  </p>
                  
                  <div className={`flex flex-col gap-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{alert.date} • {alert.time}</span>
                    </div>
                    {alert.location !== '-' && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="flex-1">{alert.location}</span>
                      </div>
                    )}
                  </div>

                  {alert.coordinates && (
                    <Button 
                      variant="outline" 
                      className={`mt-3 rounded-full text-sm ${
                        darkMode ? 'border-gray-700 text-blue-400' : 'border-gray-200 text-blue-600'
                      }`}
                    >
                      Ver en mapa
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
          >
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No hay alertas para mostrar</p>
          </motion.div>
        )}
      </div>

      {/* Emergency FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-2xl flex items-center justify-center z-20"
      >
        <Shield className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}