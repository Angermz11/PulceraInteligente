export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number;
}

export interface NotificationSettings {
  emergencyAlerts: boolean;
  lowBattery: boolean;
  updates: boolean;
  reminders: boolean;
  sound: boolean;
  vibration: boolean;
}

export interface AlertSettings {
  fallDetection: boolean;
  inactivityAlert: boolean;
  inactivityMinutes: number;
  safeZoneEnabled: boolean;
  safeZoneRadius: number;
}

export interface DeviceInfo {
  name: string;
  batteryLevel: number;
  firmwareVersion: string;
  lastSync: Date | null;
  connected: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  allergies: string;
  medicalNotes: string;
  emergencyMessage: string;
}

export interface Alert {
  id: string;
  type: 'emergency' | 'fall' | 'inactivity' | 'battery' | 'manual' | 'zone';
  message: string;
  time: Date;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  resolved: boolean;
}
