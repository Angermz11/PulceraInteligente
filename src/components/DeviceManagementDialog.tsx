import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Bluetooth, RefreshCw, Smartphone, Cpu, Battery, Wifi, Check } from 'lucide-react';
import { DeviceInfo } from '../types';
import { toast } from 'sonner@2.0.3';

interface DeviceManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  deviceInfo: DeviceInfo;
  onDeviceUpdate: (info: Partial<DeviceInfo>) => void;
}

export default function DeviceManagementDialog({
  isOpen,
  onClose,
  darkMode,
  deviceInfo,
  onDeviceUpdate
}: DeviceManagementDialogProps) {
  const [syncing, setSyncing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const handleSync = async () => {
    setSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setSyncing(false);
      onDeviceUpdate({ lastSync: new Date() });
      toast.success('Sincronización completa', {
        description: 'Los datos de tu pulsera están actualizados'
      });
    }, 2200);
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      toast.success('Pulsera encontrada', {
        description: `${deviceInfo.name} está disponible`
      });
    }, 2000);
  };

  const handleCalibrate = () => {
    toast.info('Calibración iniciada', {
      description: 'Mantén la pulsera en posición horizontal durante 10 segundos'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-md`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            Gestión del dispositivo
          </DialogTitle>
          <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Administra y sincroniza tu pulsera ÉGIDA
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Device Info */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
              }`}>
                <Bluetooth className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {deviceInfo.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    deviceInfo.connected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`} />
                  <span className={`text-xs ${
                    deviceInfo.connected 
                      ? darkMode ? 'text-green-400' : 'text-green-600'
                      : darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {deviceInfo.connected ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Batería
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {deviceInfo.batteryLevel}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Firmware
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {deviceInfo.firmwareVersion}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Última sincronización
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {deviceInfo.lastSync 
                    ? new Date(deviceInfo.lastSync).toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit'
                      })
                    : 'Nunca'}
                </span>
              </div>
            </div>
          </div>

          {/* Sync Progress */}
          {syncing && (
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className={`w-5 h-5 animate-spin ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sincronizando datos...
                </span>
              </div>
              <Progress value={syncProgress} className="h-2" />
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {syncProgress}% completado
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleSync}
              disabled={syncing || !deviceInfo.connected}
              className={`${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              Sincronizar
            </Button>
            
            <Button
              onClick={handleScan}
              disabled={scanning}
              variant="outline"
              className={darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
            >
              <Wifi className={`w-4 h-4 mr-2 ${scanning ? 'animate-pulse' : ''}`} />
              {scanning ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="space-y-2">
            <Button
              onClick={handleCalibrate}
              variant="outline"
              className={`w-full justify-start ${
                darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''
              }`}
            >
              <Cpu className="w-4 h-4 mr-2" />
              Calibrar sensores
            </Button>
            
            <Button
              onClick={() => {
                toast.info('Verificando actualizaciones...', {
                  description: 'Tu firmware está actualizado'
                });
              }}
              variant="outline"
              className={`w-full justify-start ${
                darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''
              }`}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Buscar actualizaciones
            </Button>
          </div>

          {/* Tips */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h4 className={`text-sm font-medium mb-2 flex items-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Check className="w-4 h-4" />
              Consejos
            </h4>
            <ul className={`text-xs space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• Sincroniza tu pulsera al menos una vez al día</li>
              <li>• Carga la pulsera cuando la batería esté por debajo del 20%</li>
              <li>• Mantén el firmware actualizado para nuevas funciones</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
