import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bluetooth, 
  Bell, 
  Globe, 
  Shield, 
  Moon, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Users,
  AlertTriangle,
  HelpCircle,
  Info,
  Lock,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import SettingsDialog from './SettingsDialog';
import NotificationSettingsDialog from './NotificationSettingsDialog';
import AlertSettingsDialog from './AlertSettingsDialog';
import DeviceManagementDialog from './DeviceManagementDialog';
import TutorialDialog from './TutorialDialog';
import ManageContactsDialog from './ManageContactsDialog';
import StatsDialog from './StatsDialog';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { NotificationSettings, AlertSettings, DeviceInfo, EmergencyContact } from '../types';

interface SettingsScreenProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function SettingsScreen({ darkMode, onToggleDarkMode, onLogout }: SettingsScreenProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    description: string;
    content: React.ReactNode;
  } | null>(null);

  // Dialogs state
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAlertSettings, setShowAlertSettings] = useState(false);
  const [showDeviceManagement, setShowDeviceManagement] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showManageContacts, setShowManageContacts] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Settings state with localStorage
  const [notificationSettings, setNotificationSettings] = useLocalStorage<NotificationSettings>('notificationSettings', {
    emergencyAlerts: true,
    lowBattery: true,
    updates: true,
    reminders: false,
    sound: true,
    vibration: true
  });

  const [alertSettings, setAlertSettings] = useLocalStorage<AlertSettings>('alertSettings', {
    fallDetection: true,
    inactivityAlert: false,
    inactivityMinutes: 60,
    safeZoneEnabled: false,
    safeZoneRadius: 500
  });

  const [deviceInfo, setDeviceInfo] = useLocalStorage<DeviceInfo>('deviceInfo', {
    name: 'ÉGIDA-2547',
    batteryLevel: 85,
    firmwareVersion: 'v2.1.3',
    lastSync: null,
    connected: true
  });

  const [emergencyContacts, setEmergencyContacts] = useLocalStorage<EmergencyContact[]>('emergencyContacts', [
    {
      id: '1',
      name: 'María García',
      phone: '+34 612 345 678',
      relationship: 'family',
      priority: 1
    },
    {
      id: '2',
      name: 'Carlos López',
      phone: '+34 623 456 789',
      relationship: 'friend',
      priority: 2
    }
  ]);

  const [selectedLanguage, setSelectedLanguage] = useLocalStorage('language', 'es');

  const handleSettingClick = (setting: string) => {
    switch (setting) {
      case 'bluetooth':
        setShowDeviceManagement(true);
        break;
      case 'connection':
        toast.info('Estado de conexión', { 
          description: deviceInfo.connected ? 'Pulsera conectada correctamente' : 'Pulsera desconectada' 
        });
        break;
      case 'notifications':
        setShowNotificationSettings(true);
        break;
      case 'language':
        setDialogContent({
          title: 'Idioma',
          description: 'Selecciona tu idioma preferido',
          content: (
            <div className="space-y-2">
              {['Español', 'English', 'Français', 'Deutsch'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang === 'Español' ? 'es' : lang === 'English' ? 'en' : lang === 'Français' ? 'fr' : 'de');
                    toast.success('Idioma cambiado', { description: `Idioma configurado a ${lang}` });
                    setDialogOpen(false);
                  }}
                  className={`w-full text-left p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition-colors`}
                >
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{lang}</span>
                </button>
              ))}
            </div>
          )
        });
        setDialogOpen(true);
        break;
      case 'privacy':
        setDialogContent({
          title: 'Privacidad',
          description: 'Controla tu información personal',
          content: (
            <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="text-sm">ÉGIDA respeta tu privacidad y protege tus datos personales.</p>
              <ul className="space-y-2 text-sm">
                <li>• Tus datos de ubicación solo se comparten cuando activas una alerta</li>
                <li>• Los contactos de emergencia solo reciben notificaciones en caso de emergencia</li>
                <li>• Toda la información está cifrada de extremo a extremo</li>
                <li>• Puedes eliminar tus datos en cualquier momento</li>
              </ul>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-50'} mt-4`}>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-blue-900'}`}>
                  Última actualización de la política de privacidad: Enero 2025
                </p>
              </div>
            </div>
          )
        });
        setDialogOpen(true);
        break;
      case 'security':
        setDialogContent({
          title: 'Seguridad',
          description: 'Configuración de seguridad de la cuenta',
          content: (
            <div className="space-y-3">
              {[
                { label: 'Cambiar contraseña', action: () => toast.info('Cambiar contraseña', { description: 'Función próximamente' }) },
                { label: 'Autenticación de dos factores', action: () => toast.info('2FA', { description: 'Próximamente disponible' }) },
                { label: 'Dispositivos vinculados', action: () => toast.info('Dispositivos', { description: '1 dispositivo activo' }) },
                { label: 'Cerrar otras sesiones', action: () => toast.success('Sesiones cerradas', { description: 'Otras sesiones han sido cerradas' }) }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setDialogOpen(false);
                  }}
                  className={`w-full text-left p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition-colors`}
                >
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item.label}</span>
                </button>
              ))}
            </div>
          )
        });
        setDialogOpen(true);
        break;
      case 'contacts':
        setShowManageContacts(true);
        break;
      case 'alerts':
        setShowAlertSettings(true);
        break;
      case 'help':
        setShowTutorial(true);
        break;
      case 'about':
        setDialogContent({
          title: 'Acerca de ÉGIDA',
          description: 'Información de la aplicación',
          content: (
            <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                }`}>
                  <Shield className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ÉGIDA
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sistema personal de seguridad
                </p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Versión:</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compilación:</span>
                    <span className="font-medium">2025.03.12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Licencia:</span>
                    <span className="font-medium">Propietaria</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center">
                © 2025 ÉGIDA. Todos los derechos reservados.
              </p>
            </div>
          )
        });
        setDialogOpen(true);
        break;
      case 'stats':
        setShowStats(true);
        break;
    }
  };

  const settingsGroups = [
    {
      title: 'Dispositivo',
      items: [
        { 
          id: 'bluetooth',
          icon: Bluetooth, 
          label: 'Gestionar pulsera', 
          value: deviceInfo.name, 
          color: 'text-blue-500' 
        },
        { 
          id: 'connection',
          icon: Smartphone, 
          label: 'Estado de conexión', 
          value: deviceInfo.connected ? 'Conectado' : 'Desconectado', 
          color: deviceInfo.connected ? 'text-green-500' : 'text-red-500'
        }
      ]
    },
    {
      title: 'Seguridad',
      items: [
        { 
          id: 'contacts',
          icon: Users, 
          label: 'Contactos de emergencia', 
          value: `${emergencyContacts.length} configurados`, 
          color: 'text-purple-500' 
        },
        { 
          id: 'alerts',
          icon: AlertTriangle, 
          label: 'Alertas automáticas', 
          value: alertSettings.fallDetection ? 'Activas' : 'Inactivas', 
          color: 'text-orange-500' 
        }
      ]
    },
    {
      title: 'Preferencias',
      items: [
        { 
          id: 'notifications',
          icon: Bell, 
          label: 'Notificaciones', 
          value: notificationSettings.emergencyAlerts ? 'Activadas' : 'Desactivadas', 
          color: 'text-orange-500' 
        },
        { 
          id: 'language',
          icon: Globe, 
          label: 'Idioma', 
          value: selectedLanguage === 'es' ? 'Español' : selectedLanguage === 'en' ? 'English' : selectedLanguage === 'fr' ? 'Français' : 'Deutsch', 
          color: 'text-purple-500' 
        },
        { 
          id: 'darkmode',
          icon: Moon, 
          label: 'Modo oscuro', 
          value: darkMode ? 'Activado' : 'Desactivado', 
          color: 'text-indigo-500', 
          toggle: true 
        }
      ]
    },
    {
      title: 'Información',
      items: [
        { 
          id: 'privacy',
          icon: Shield, 
          label: 'Privacidad', 
          value: '', 
          color: 'text-green-500' 
        },
        { 
          id: 'security',
          icon: Lock, 
          label: 'Seguridad de la cuenta', 
          value: '', 
          color: 'text-yellow-500' 
        },
        { 
          id: 'help',
          icon: HelpCircle, 
          label: 'Ayuda y tutoriales', 
          value: '', 
          color: 'text-blue-500' 
        },
        { 
          id: 'about',
          icon: Info, 
          label: 'Acerca de', 
          value: 'v1.0.0', 
          color: 'text-gray-500' 
        },
        { 
          id: 'stats',
          icon: BarChart3, 
          label: 'Estadísticas', 
          value: '', 
          color: 'text-gray-500' 
        }
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
                  onClick={item.toggle ? onToggleDarkMode : () => handleSettingClick(item.id)}
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

      {/* Settings Dialog */}
      {dialogContent && (
        <SettingsDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          darkMode={darkMode}
          title={dialogContent.title}
          description={dialogContent.description}
          content={dialogContent.content}
        />
      )}

      {/* Notification Settings Dialog */}
      {showNotificationSettings && (
        <NotificationSettingsDialog
          isOpen={showNotificationSettings}
          onClose={() => setShowNotificationSettings(false)}
          darkMode={darkMode}
          settings={notificationSettings}
          onSettingsChange={setNotificationSettings}
        />
      )}

      {/* Alert Settings Dialog */}
      {showAlertSettings && (
        <AlertSettingsDialog
          isOpen={showAlertSettings}
          onClose={() => setShowAlertSettings(false)}
          darkMode={darkMode}
          settings={alertSettings}
          onSettingsChange={setAlertSettings}
        />
      )}

      {/* Device Management Dialog */}
      {showDeviceManagement && (
        <DeviceManagementDialog
          isOpen={showDeviceManagement}
          onClose={() => setShowDeviceManagement(false)}
          darkMode={darkMode}
          deviceInfo={deviceInfo}
          onDeviceUpdate={setDeviceInfo}
        />
      )}

      {/* Tutorial Dialog */}
      {showTutorial && (
        <TutorialDialog
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          darkMode={darkMode}
        />
      )}

      {/* Manage Contacts Dialog */}
      {showManageContacts && (
        <ManageContactsDialog
          isOpen={showManageContacts}
          onClose={() => setShowManageContacts(false)}
          darkMode={darkMode}
          contacts={emergencyContacts}
          onContactsChange={setEmergencyContacts}
        />
      )}

      {/* Stats Dialog */}
      {showStats && (
        <StatsDialog
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}