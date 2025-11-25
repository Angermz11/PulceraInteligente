import React from 'react';
import { Home, Bell, MapPin, Settings, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: 'home' | 'alerts' | 'location' | 'settings' | 'profile';
  onNavigate: (screen: 'home' | 'alerts' | 'location' | 'settings' | 'profile') => void;
  darkMode: boolean;
}

export default function BottomNav({ currentScreen, onNavigate, darkMode }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Inicio' },
    { id: 'alerts' as const, icon: Bell, label: 'Alertas' },
    { id: 'location' as const, icon: MapPin, label: 'Ubicación' },
    { id: 'settings' as const, icon: Settings, label: 'Ajustes' },
    { id: 'profile' as const, icon: User, label: 'Perfil' }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-t shadow-2xl`}>
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive 
                  ? 'text-[#2563eb]' 
                  : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`relative ${isActive ? 'transform -translate-y-1' : ''} transition-transform`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2563eb] rounded-full" />
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? '' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
