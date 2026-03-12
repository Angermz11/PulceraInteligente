import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { AlertTriangle, UserX, MapPin } from 'lucide-react';
import { AlertSettings } from '../types';

interface AlertSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  settings: AlertSettings;
  onSettingsChange: (settings: AlertSettings) => void;
}

export default function AlertSettingsDialog({
  isOpen,
  onClose,
  darkMode,
  settings,
  onSettingsChange
}: AlertSettingsDialogProps) {
  const handleToggle = (key: keyof AlertSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleSliderChange = (key: 'inactivityMinutes' | 'safeZoneRadius', value: number[]) => {
    onSettingsChange({
      ...settings,
      [key]: value[0]
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-md`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            Alertas automáticas
          </DialogTitle>
          <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Configura las alertas inteligentes de tu pulsera
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Fall Detection */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Label
                  htmlFor="fallDetection"
                  className={`text-sm font-medium cursor-pointer ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Detección de caídas
                </Label>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Envía alerta automática si se detecta una caída fuerte
                </p>
              </div>
              <Switch
                id="fallDetection"
                checked={settings.fallDetection}
                onCheckedChange={() => handleToggle('fallDetection')}
              />
            </div>
            {settings.fallDetection && (
              <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-gray-600/50' : 'bg-white'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  La pulsera detectará movimientos bruscos y enviará una alerta automática después de 30 segundos si no cancelas la detección.
                </p>
              </div>
            )}
          </div>

          {/* Inactivity Alert */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`mt-0.5 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`}>
                <UserX className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Label
                  htmlFor="inactivityAlert"
                  className={`text-sm font-medium cursor-pointer ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Alerta por inactividad
                </Label>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Notifica si no hay movimiento durante un período prolongado
                </p>
              </div>
              <Switch
                id="inactivityAlert"
                checked={settings.inactivityAlert}
                onCheckedChange={() => handleToggle('inactivityAlert')}
              />
            </div>
            {settings.inactivityAlert && (
              <div className="mt-3 space-y-3">
                <div>
                  <Label className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tiempo de inactividad: {settings.inactivityMinutes} minutos
                  </Label>
                  <Slider
                    value={[settings.inactivityMinutes]}
                    onValueChange={(value) => handleSliderChange('inactivityMinutes', value)}
                    min={15}
                    max={240}
                    step={15}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Safe Zone */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`mt-0.5 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Label
                  htmlFor="safeZoneEnabled"
                  className={`text-sm font-medium cursor-pointer ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Zona segura
                </Label>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Alerta si sales de una zona geográfica definida
                </p>
              </div>
              <Switch
                id="safeZoneEnabled"
                checked={settings.safeZoneEnabled}
                onCheckedChange={() => handleToggle('safeZoneEnabled')}
              />
            </div>
            {settings.safeZoneEnabled && (
              <div className="mt-3 space-y-3">
                <div>
                  <Label className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Radio de zona segura: {settings.safeZoneRadius} metros
                  </Label>
                  <Slider
                    value={[settings.safeZoneRadius]}
                    onValueChange={(value) => handleSliderChange('safeZoneRadius', value)}
                    min={100}
                    max={5000}
                    step={100}
                    className="mt-2"
                  />
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600/50' : 'bg-white'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    La zona segura se establece desde tu ubicación actual. Recibirás una notificación si te alejas más de {settings.safeZoneRadius} metros.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
