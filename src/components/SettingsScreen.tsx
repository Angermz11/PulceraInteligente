import React from 'react';
import { motion } from 'motion/react';
import { 
  Bluetooth, 
  Bell, 
  Globe, 
  Shield, 
  Moon, 
  LogOut, 
  ChevronRight,
  Smartphone
} from 'lucide-react';

interface SettingsScreenProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function SettingsScreen({ darkMode, onToggleDarkMode, onLogout }: SettingsScreenProps) {
  const settingsGroups = [
    {
      title: 'Dispositivo',
      items: [
        { icon: Bluetooth, label: 'Vincular pulsera', value: 'ÉGIDA-2547', color: 'text-blue-500' },
        { icon: Smartphone, label: 'Estado de conexión', value: 'Conectado', color: 'text-green-500' }
      ]
    },
    {
      title: 'Preferencias',
      items: [
        { icon: Bell, label: 'Notificaciones', value: 'Activadas', color: 'text-orange-500' },
        { icon: Globe, label: 'Idioma', value: 'Español', color: 'text-purple-500' },
        { icon: Moon, label: 'Modo oscuro', value: darkMode ? 'Activado' : 'Desactivado', color: 'text-indigo-500', toggle: true }
      ]
    },
    {
      title: 'Seguridad y privacidad',
      items: [
        { icon: Shield, label: 'Privacidad', value: '', color: 'text-red-500' },
        { icon: Shield, label: 'Seguridad', value: '', color: 'text-yellow-500' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] pt-12 pb-6 px-6 rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white text-3xl mb-2">Ajustes</h1>
          <p className="text-white/80">Configura tu aplicación y dispositivo</p>
        </motion.div>
      </div>

      <div className="px-6 mt-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + groupIndex * 0.1 }}
            className="mb-6"
          >
            <h2 className={`text-sm uppercase tracking-wide mb-3 ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              {group.title}
            </h2>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-md`}>
              {group.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.toggle ? onToggleDarkMode : undefined}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    itemIndex !== group.items.length - 1 
                      ? 'border-b dark:border-gray-700' 
                      : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.label}
                    </p>
                    {item.value && (
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.value}
                      </p>
                    )}
                  </div>
                  
                  {item.toggle ? (
                    <div className={`relative w-14 h-8 rounded-full transition-colors ${
                      darkMode ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <motion.div
                        layout
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        animate={{ left: darkMode ? '28px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </div>
                  ) : (
                    <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onLogout}
          className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl shadow-md mt-6 ${
            darkMode 
              ? 'bg-red-900/30 hover:bg-red-900/40 text-red-400' 
              : 'bg-red-50 hover:bg-red-100 text-red-600'
          } transition-colors`}
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </motion.button>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-center mt-8 pb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
        >
          <p className="text-sm">ÉGIDA v1.0.0</p>
          <p className="text-xs mt-1">© 2025 Todos los derechos reservados</p>
        </motion.div>
      </div>
    </div>
  );
}
