import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { TrendingUp, Activity, Shield, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function StatsDialog({ isOpen, onClose, darkMode }: StatsDialogProps) {
  const stats = [
    {
      icon: Shield,
      label: 'Días protegido',
      value: '127',
      change: '+30 días',
      color: 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-500/10' : 'bg-blue-50'
    },
    {
      icon: Activity,
      label: 'Alertas enviadas',
      value: '3',
      change: '0 este mes',
      color: 'text-green-500',
      bgColor: darkMode ? 'bg-green-500/10' : 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Tiempo de respuesta promedio',
      value: '45s',
      change: '-12s vs mes anterior',
      color: 'text-purple-500',
      bgColor: darkMode ? 'bg-purple-500/10' : 'bg-purple-50'
    },
    {
      icon: TrendingUp,
      label: 'Contactos notificados',
      value: '6',
      change: '2 contactos activos',
      color: 'text-orange-500',
      bgColor: darkMode ? 'bg-orange-500/10' : 'bg-orange-50'
    }
  ];

  const weeklyActivity = [
    { day: 'L', active: true, alerts: 0 },
    { day: 'M', active: true, alerts: 0 },
    { day: 'X', active: true, alerts: 1 },
    { day: 'J', active: true, alerts: 0 },
    { day: 'V', active: false, alerts: 0 },
    { day: 'S', active: false, alerts: 0 },
    { day: 'D', active: true, alerts: 0 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-md max-h-[80vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            Estadísticas de uso
          </DialogTitle>
          <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Resumen de tu actividad y seguridad
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${stat.bgColor}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Weekly Activity */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Actividad semanal
            </h3>
            <div className="flex justify-between gap-2">
              {weeklyActivity.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      item.active
                        ? darkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-700'
                        : darkMode
                        ? 'bg-gray-600 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {item.alerts > 0 ? (
                      <span className="font-bold">{item.alerts}</span>
                    ) : (
                      <span>✓</span>
                    )}
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Battery Stats */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Batería de la pulsera
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Nivel actual
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  85%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                  Duración estimada: 3.5 días
                </span>
              </div>
            </div>
          </div>

          {/* Device Health */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Salud del dispositivo
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Conexión Bluetooth', status: 'Excelente', value: 95 },
                { label: 'Señal GPS', status: 'Buena', value: 80 },
                { label: 'Sensores', status: 'Óptimo', value: 100 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
