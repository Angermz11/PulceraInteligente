import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Bell, Volume2, Vibrate, MessageSquare } from 'lucide-react';
import { NotificationSettings } from '../types';

interface NotificationSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
}

export default function NotificationSettingsDialog({
  isOpen,
  onClose,
  darkMode,
  settings,
  onSettingsChange
}: NotificationSettingsDialogProps) {
  const handleToggle = (key: keyof NotificationSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key]
    });
  };

  const notificationTypes = [
    { key: 'emergencyAlerts' as keyof NotificationSettings, label: 'Alertas de emergencia', icon: Bell, description: 'Notificaciones críticas de seguridad' },
    { key: 'lowBattery' as keyof NotificationSettings, label: 'Batería baja', icon: Bell, description: 'Avisos cuando la batería está baja' },
    { key: 'updates' as keyof NotificationSettings, label: 'Actualizaciones', icon: MessageSquare, description: 'Notificaciones de nuevas versiones' },
    { key: 'reminders' as keyof NotificationSettings, label: 'Recordatorios', icon: Bell, description: 'Recordatorios de chequeos de seguridad' },
  ];

  const soundSettings = [
    { key: 'sound' as keyof NotificationSettings, label: 'Sonido', icon: Volume2, description: 'Reproducir sonidos en notificaciones' },
    { key: 'vibration' as keyof NotificationSettings, label: 'Vibración', icon: Vibrate, description: 'Vibrar al recibir notificaciones' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-md`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            Notificaciones
          </DialogTitle>
          <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Configura tus preferencias de notificación
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Notification Types */}
          <div>
            <h3 className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Tipos de notificaciones
            </h3>
            <div className="space-y-4">
              {notificationTypes.map((item) => (
                <div
                  key={item.key}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Label
                      htmlFor={item.key}
                      className={`text-sm font-medium cursor-pointer ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                    </Label>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    id={item.key}
                    checked={settings[item.key]}
                    onCheckedChange={() => handleToggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sound Settings */}
          <div>
            <h3 className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Configuración de sonido
            </h3>
            <div className="space-y-4">
              {soundSettings.map((item) => (
                <div
                  key={item.key}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Label
                      htmlFor={item.key}
                      className={`text-sm font-medium cursor-pointer ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                    </Label>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    id={item.key}
                    checked={settings[item.key]}
                    onCheckedChange={() => handleToggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
