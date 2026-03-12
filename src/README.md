# 🛡️ ÉGIDA - Sistema Personal de Seguridad

Aplicación móvil moderna para pulsera inteligente de alerta personal, desarrollada con React, TypeScript y Material Design 3.

## 📱 Características Principales

### ✅ Funcionalidades Implementadas

#### 🏠 Pantalla de Inicio
- ✨ Estado de conexión de pulsera en tiempo real
- 🔋 Monitoreo de batería del dispositivo
- 📍 Indicador de disponibilidad de ubicación
- 🚨 Alertas recientes con detalles
- 👥 Acceso rápido a contactos de emergencia
- 📲 Botón de emergencia FAB (Floating Action Button)

#### ⚙️ Configuración Completa y Funcional

##### **Dispositivo**
- 🔵 **Gestión de pulsera**
  - Sincronización manual de datos
  - Búsqueda de dispositivos Bluetooth
  - Calibración de sensores
  - Verificación de actualizaciones de firmware
  - Información detallada del dispositivo
  - Indicador de progreso de sincronización

- 📱 **Estado de conexión**
  - Visualización en tiempo real
  - Historial de conexiones
  - Notificaciones de desconexión

##### **Seguridad**
- 👥 **Contactos de emergencia (CRUD completo)**
  - Agregar hasta 5 contactos
  - Editar información de contactos
  - Eliminar contactos
  - Clasificación por relación (Familia, Amigo, Pareja, Médico, Otro)
  - Priorización de contactos
  - Validación de datos

- ⚠️ **Alertas automáticas**
  - **Detección de caídas** con ajustes personalizables
  - **Alerta por inactividad** (15-240 minutos)
  - **Zona segura geográfica** (100-5000 metros)
  - Configuración independiente de cada tipo de alerta

##### **Preferencias**
- 🔔 **Notificaciones configurables**
  - Alertas de emergencia
  - Batería baja
  - Actualizaciones de sistema
  - Recordatorios
  - Sonido activado/desactivado
  - Vibración activada/desactivada
  - Switches independientes para cada tipo

- 🌍 **Idiomas**
  - Español
  - English
  - Français
  - Deutsch

- 🌙 **Modo oscuro/claro**
  - Switch animado
  - Persistencia de preferencia
  - Transiciones suaves

##### **Información**
- 🔒 **Privacidad**
  - Política de privacidad detallada
  - Información sobre protección de datos
  - Última actualización visible

- 🛡️ **Seguridad de cuenta**
  - Cambiar contraseña (próximamente)
  - Autenticación de dos factores (próximamente)
  - Dispositivos vinculados
  - Cerrar otras sesiones

- ❓ **Ayuda y tutoriales**
  - Tutorial interactivo de 5 pasos
  - Guía de configuración inicial
  - Explicación de funciones principales
  - Animaciones y transiciones

- ℹ️ **Acerca de**
  - Información de la aplicación
  - Versión y compilación
  - Licencia

- 📊 **Estadísticas**
  - Días protegido
  - Alertas enviadas
  - Tiempo de respuesta promedio
  - Contactos notificados
  - Actividad semanal
  - Salud del dispositivo (Bluetooth, GPS, Sensores)
  - Estado de batería con duración estimada

#### 🚨 Sistema de Alertas
- Botón de emergencia flotante (FAB)
- Diálogo de confirmación
- Envío de alerta a contactos
- Compartir ubicación automática
- Notificaciones toast

#### 📍 Ubicación
- Mapa interactivo con Leaflet
- Ubicación en tiempo real
- Compartir ubicación manual
- Visualización de alertas en mapa

#### 📜 Historial de Alertas
- Listado completo de alertas
- Filtros por tipo
- Detalles de ubicación
- Navegación al mapa

#### 👤 Perfil de Usuario
- Información personal
- Datos médicos
- Configuración de cuenta

### 💾 Persistencia de Datos
- **LocalStorage** para todas las configuraciones
- Hook personalizado `useLocalStorage`
- Datos que se guardan:
  - Preferencias de notificaciones
  - Configuración de alertas automáticas
  - Información del dispositivo
  - Contactos de emergencia
  - Idioma seleccionado
  - Modo oscuro/claro

## 🎨 Diseño

### Material Design 3 (Material You)
- ✅ Paleta de colores personalizada (#1e3a5f, #2563eb)
- ✅ Bordes redondeados consistentes
- ✅ Sombras suaves y elevaciones
- ✅ Tipografía legible y jerárquica
- ✅ Animaciones sutiles con Framer Motion
- ✅ Responsive optimizado para móvil
- ✅ Transiciones fluidas entre estados

### Componentes UI
- Diálogos modales personalizados
- Switches animados
- Sliders para ajustes
- Botones con estados (hover, active, disabled)
- Cards con elevación
- Progress bars
- Badges de estado
- Toasts/Notificaciones

## 🏗️ Estructura del Proyecto

```
/
├── components/
│   ├── AlertsScreen.tsx              # Historial de alertas
│   ├── AlertSettingsDialog.tsx       # Configuración de alertas
│   ├── BottomNav.tsx                 # Navegación inferior
│   ├── DeviceManagementDialog.tsx    # Gestión de pulsera
│   ├── EmergencyContactsDialog.tsx   # Visualizar contactos
│   ├── EmergencyDialog.tsx           # Confirmar emergencia
│   ├── HomeScreen.tsx                # Pantalla principal
│   ├── LocationScreen.tsx            # Mapa y ubicación
│   ├── LoginScreen.tsx               # Inicio de sesión
│   ├── ManageContactsDialog.tsx      # CRUD de contactos
│   ├── MapComponent.tsx              # Componente de mapa
│   ├── NotificationSettingsDialog.tsx # Config. notificaciones
│   ├── ProfileScreen.tsx             # Perfil de usuario
│   ├── RegisterScreen.tsx            # Registro
│   ├── SettingsDialog.tsx            # Diálogo genérico
│   ├── SettingsScreen.tsx            # Pantalla de ajustes
│   ├── ShareLocationDialog.tsx       # Compartir ubicación
│   ├── SplashScreen.tsx              # Pantalla de carga
│   ├── StatsDialog.tsx               # Estadísticas de uso
│   ├── TutorialDialog.tsx            # Tutorial interactivo
│   └── ui/                           # Componentes UI base
├── hooks/
│   └── useLocalStorage.ts            # Hook para persistencia
├── types/
│   └── index.ts                      # Tipos TypeScript
├── App.tsx                           # Componente principal
├── MOBILE_DEPLOYMENT.md              # Guía de conversión a móvil
└── README.md                         # Este archivo
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

### Build para Producción
```bash
npm run build
```

## 📱 Conversión a App Móvil Nativa

Para convertir esta aplicación React en una app móvil para Android/iOS, consulta la guía completa en [MOBILE_DEPLOYMENT.md](./MOBILE_DEPLOYMENT.md).

### Opciones disponibles:
1. **Capacitor** ⭐ (Recomendado) - Usa el código React existente
2. **React Native** - Rendimiento nativo superior (requiere reescritura)
3. **Ionic** - Framework híbrido completo
4. **PWA** - Progressive Web App (sin compilación)

## 🔧 Tecnologías Utilizadas

### Core
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first

### UI/UX
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **Sonner** - Sistema de notificaciones toast
- **Shadcn/ui** - Componentes UI base

### Mapas
- **Leaflet** - Mapas interactivos
- **React Leaflet** - Integración con React

### Formularios y Estado
- **React Hook Form** - Gestión de formularios
- **LocalStorage** - Persistencia de datos

## 🎯 Próximas Mejoras Sugeridas

### Backend (Pendiente)
- [ ] Integración con Firebase/Supabase
- [ ] Autenticación real de usuarios
- [ ] Base de datos en la nube
- [ ] Notificaciones push reales
- [ ] API para comunicación con la pulsera

### Funcionalidades
- [ ] Integración Bluetooth real con pulsera
- [ ] Geolocalización en tiempo real continua
- [ ] Llamadas de emergencia VoIP
- [ ] Grabación de audio/video en emergencias
- [ ] Machine Learning para detección de caídas
- [ ] Mapas offline
- [ ] Exportar historial de alertas
- [ ] Compartir ubicación en tiempo real con contactos

### UI/UX
- [ ] Onboarding para nuevos usuarios
- [ ] Gestos táctiles (swipe, pinch)
- [ ] Accesos directos (widgets)
- [ ] Temas personalizados
- [ ] Accessibility (WCAG 2.1)

## 📋 Características de Seguridad

- ✅ Encriptación de datos en tránsito (HTTPS)
- ✅ Validación de formularios
- ✅ Sanitización de inputs
- ⏳ Autenticación JWT (pendiente backend)
- ⏳ Encriptación de datos sensibles (pendiente backend)
- ⏳ Biometría para desbloqueo (pendiente nativo)

## 🧪 Testing

```bash
# Unit tests (pendiente configuración)
npm run test

# E2E tests (pendiente configuración)
npm run test:e2e
```

## 📄 Licencia

© 2025 ÉGIDA. Todos los derechos reservados.

## 👥 Contribución

Este es un proyecto de demostración. Para contribuir:
1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para preguntas o soporte:
- Email: soporte@egida.app (ejemplo)
- Issues: [GitHub Issues](enlace)

---

**Desarrollado con ❤️ para tu seguridad personal**
