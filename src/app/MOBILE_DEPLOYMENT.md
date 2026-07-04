# 📱 Guía de Conversión a Aplicación Móvil

Esta guía te ayudará a convertir tu aplicación web ÉGIDA en una aplicación móvil nativa para Android e iOS.

## 🚀 Opciones de Conversión

### Opción 1: Capacitor (Recomendada) ⭐

**Ventajas:**
- Usa tu código React existente sin cambios
- Acceso completo a APIs nativas (Bluetooth, Geolocalización, Notificaciones)
- Fácil de configurar y mantener
- Compatible con plugins nativos

**Pasos de instalación:**

```bash
# 1. Instalar Capacitor
npm install @capacitor/core @capacitor/cli

# 2. Inicializar Capacitor
npx cap init

# Nombre de la app: ÉGIDA
# Package ID: com.egida.app

# 3. Agregar plataformas
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

# 4. Instalar plugins necesarios
npm install @capacitor/geolocation
npm install @capacitor/local-notifications
npm install @capacitor/push-notifications
npm install @capacitor/haptics
npm install @capacitor/bluetooth-le
npm install @capacitor/network
npm install @capacitor/app

# 5. Construir la app
npm run build
npx cap copy
npx cap sync

# 6. Abrir en Android Studio o Xcode
npx cap open android
npx cap open ios
```

### Opción 2: React Native (Reescritura)

**Ventajas:**
- Mejor rendimiento nativo
- Más control sobre la UI

**Desventajas:**
- Requiere reescribir el código
- Curva de aprendizaje más alta

### Opción 3: Ionic (Framework híbrido)

**Ventajas:**
- Componentes UI optimizados para móvil
- Tooling completo

## 🔧 Configuración de Capacitor (Detallada)

### 1. Configurar capacitor.config.ts

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.egida.app',
  appName: 'ÉGIDA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      backgroundColor: "#1e3a5f",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
```

### 2. Integrar Bluetooth para la pulsera

```typescript
// src/services/BraceletService.ts
import { BleClient } from '@capacitor-community/bluetooth-le';

export class BraceletService {
  private deviceId: string | null = null;
  
  async scanForBracelet() {
    try {
      await BleClient.initialize();
      
      await BleClient.requestLEScan(
        { services: ['YOUR_SERVICE_UUID'] },
        (result) => {
          if (result.device.name?.includes('ÉGIDA')) {
            this.connectToBracelet(result.device.deviceId);
          }
        }
      );
      
      setTimeout(async () => {
        await BleClient.stopLEScan();
      }, 5000);
    } catch (error) {
      console.error('Error scanning:', error);
    }
  }
  
  async connectToBracelet(deviceId: string) {
    try {
      await BleClient.connect(deviceId);
      this.deviceId = deviceId;
      console.log('Connected to bracelet');
    } catch (error) {
      console.error('Connection error:', error);
    }
  }
  
  async getBatteryLevel(): Promise<number> {
    if (!this.deviceId) return 0;
    
    try {
      const result = await BleClient.read(
        this.deviceId,
        'BATTERY_SERVICE_UUID',
        'BATTERY_CHARACTERISTIC_UUID'
      );
      return result.getUint8(0);
    } catch (error) {
      console.error('Error reading battery:', error);
      return 0;
    }
  }
  
  async sendEmergencyAlert() {
    if (!this.deviceId) return;
    
    try {
      const data = new Uint8Array([0x01]); // Emergency command
      await BleClient.write(
        this.deviceId,
        'ALERT_SERVICE_UUID',
        'ALERT_CHARACTERISTIC_UUID',
        data
      );
    } catch (error) {
      console.error('Error sending alert:', error);
    }
  }
}
```

### 3. Geolocalización en tiempo real

```typescript
// src/services/LocationService.ts
import { Geolocation } from '@capacitor/geolocation';

export class LocationService {
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000
    });
    
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      accuracy: coordinates.coords.accuracy
    };
  }
  
  async watchPosition(callback: (position: any) => void) {
    const id = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 5000
      },
      callback
    );
    
    return id;
  }
  
  async clearWatch(id: string) {
    await Geolocation.clearWatch({ id });
  }
}
```

### 4. Notificaciones Push

```typescript
// src/services/NotificationService.ts
import { 
  PushNotifications, 
  ActionPerformed 
} from '@capacitor/push-notifications';

export class NotificationService {
  async initialize() {
    // Request permission
    let permStatus = await PushNotifications.checkPermissions();
    
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    
    if (permStatus.receive === 'granted') {
      await PushNotifications.register();
    }
    
    // Listeners
    await PushNotifications.addListener(
      'registration',
      (token) => {
        console.log('Push token:', token.value);
        // Send token to your backend
      }
    );
    
    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push received:', notification);
      }
    );
    
    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed:', notification);
      }
    );
  }
  
  async scheduleLocalNotification(title: string, body: string) {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000) }
        }
      ]
    });
  }
}
```

### 5. Haptic Feedback (Vibración)

```typescript
// src/services/HapticService.ts
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export class HapticService {
  async impact(style: 'light' | 'medium' | 'heavy' = 'medium') {
    const styleMap = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy
    };
    
    await Haptics.impact({ style: styleMap[style] });
  }
  
  async notification(type: 'success' | 'warning' | 'error' = 'success') {
    await Haptics.notification({ 
      type: type === 'success' ? 'SUCCESS' : 
            type === 'warning' ? 'WARNING' : 'ERROR' 
    });
  }
  
  async vibrate(duration: number = 300) {
    await Haptics.vibrate({ duration });
  }
}
```

## 📱 Configuración de Permisos

### Android (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

### iOS (ios/App/App/Info.plist)

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>ÉGIDA necesita acceso a tu ubicación para enviar alertas de emergencia con tu posición.</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>ÉGIDA necesita acceso continuo a tu ubicación para la función de zona segura.</string>

<key>NSBluetoothAlwaysUsageDescription</key>
<string>ÉGIDA necesita Bluetooth para conectarse a tu pulsera de seguridad.</string>

<key>NSBluetoothPeripheralUsageDescription</key>
<string>ÉGIDA necesita Bluetooth para comunicarse con tu pulsera.</string>
```

## 🏗️ Build y Distribución

### Android

```bash
# Generar APK de desarrollo
cd android
./gradlew assembleDebug

# Generar APK firmado para producción
./gradlew assembleRelease

# Generar App Bundle (recomendado para Google Play)
./gradlew bundleRelease
```

**Configurar firma (android/app/build.gradle):**

```gradle
android {
    signingConfigs {
        release {
            storeFile file("your-keystore.jks")
            storePassword "your-store-password"
            keyAlias "your-key-alias"
            keyPassword "your-key-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### iOS

```bash
# Abrir en Xcode
npx cap open ios

# 1. Configurar Team y Bundle Identifier en Xcode
# 2. Seleccionar "Product" > "Archive"
# 3. Distribuir a App Store o TestFlight
```

## 🔐 Consideraciones de Seguridad

1. **Encriptación de datos sensibles**
```typescript
import { SecureStorage } from '@capacitor-community/secure-storage';

await SecureStorage.set({
  key: 'emergencyContacts',
  value: JSON.stringify(contacts)
});
```

2. **Comunicación segura con el backend**
- Usar HTTPS exclusivamente
- Implementar autenticación JWT
- Validar certificados SSL

3. **Ofuscación de código**
```bash
npm install --save-dev javascript-obfuscator
```

## 📊 Analytics y Monitoreo

```typescript
// Integrar Firebase Analytics
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

await FirebaseAnalytics.logEvent({
  name: 'emergency_alert_sent',
  params: {
    location: 'home',
    timestamp: Date.now()
  }
});
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests con Appium
npm install --save-dev appium
```

## 📦 Alternativa: Progressive Web App (PWA)

Si prefieres una solución más simple sin compilar apps nativas:

1. **Service Worker para offline**
2. **Web Push Notifications**
3. **Geolocation API**
4. **Web Bluetooth API** (limitado)

## 🤝 Backend Recomendado

Para una app de producción, considera:

1. **Firebase** - Notificaciones push, autenticación, base de datos
2. **AWS Amplify** - Backend completo
3. **Supabase** - Open source alternativa a Firebase
4. **Custom API** - Node.js/Express + PostgreSQL

## 📝 Checklist de Producción

- [ ] Configurar splash screen
- [ ] Configurar iconos de app
- [ ] Implementar manejo de errores
- [ ] Configurar analytics
- [ ] Implementar crash reporting
- [ ] Optimizar rendimiento
- [ ] Testar en dispositivos reales
- [ ] Configurar deep linking
- [ ] Implementar actualizaciones OTA
- [ ] Configurar CI/CD
- [ ] Preparar políticas de privacidad
- [ ] Crear screenshots para las tiendas

## 🆘 Recursos Adicionales

- [Documentación Capacitor](https://capacitorjs.com/docs)
- [Ionic Framework](https://ionicframework.com/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

## 💡 Próximos Pasos Recomendados

1. **Backend real** con autenticación y base de datos
2. **Integración con servicios de emergencia** (APIs de policía, ambulancia)
3. **Sistema de notificaciones push** para contactos de emergencia
4. **Integración con wearables** (Bluetooth Low Energy)
5. **Machine Learning** para detección de caídas mejorada
6. **Mapas offline** para emergencias sin conexión
7. **Llamadas VoIP** de emergencia integradas
8. **Grabación de audio/video** automática en emergencias

---

**¿Necesitas ayuda?** Esta es una guía inicial. Cada opción requiere configuración adicional según tus necesidades específicas.
