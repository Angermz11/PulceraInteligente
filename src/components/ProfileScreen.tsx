import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Mail, Phone, User, MapPin, Calendar, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface ProfileScreenProps {
  darkMode: boolean;
}

export default function ProfileScreen({ darkMode }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Angel García Ramírez',
    email: 'angel.garcia@email.com',
    phone: '+34 600 123 456',
    location: 'Salamanca, Guanajuato',
    memberSince: 'Enero 2025'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Perfil actualizado', {
      description: 'Tus cambios han sido guardados correctamente'
    });
  };

  const handlePhotoChange = () => {
    toast.info('Función de cámara', {
      description: 'Selecciona una foto de tu galería o toma una nueva'
    });
  };

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] pt-12 pb-20 px-6 rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-white text-3xl">Mi Perfil</h1>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-0"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditing ? 'Guardar' : 'Editar'}
          </Button>
        </motion.div>
      </div>

      <div className="px-6 -mt-12">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl shadow-2xl border-4 border-white dark:border-gray-800">
              AR
            </div>
            {isEditing && (
              <button 
                onClick={handlePhotoChange}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1d4ed8]"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Profile Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl mb-6`}
        >
          <h2 className={`text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Información personal
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Nombre completo
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className={`mt-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  />
                ) : (
                  <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {profileData.name}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-gray-700' : 'bg-purple-50'
              }`}>
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Correo electrónico
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={`mt-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  />
                ) : (
                  <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {profileData.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-gray-700' : 'bg-green-50'
              }`}>
                <Phone className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Teléfono
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className={`mt-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  />
                ) : (
                  <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {profileData.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-gray-700' : 'bg-orange-50'
              }`}>
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Ubicación
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className={`mt-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  />
                ) : (
                  <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {profileData.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl mb-6`}
        >
          <h2 className={`text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Información de la cuenta
          </h2>

          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-indigo-50'
            }`}>
              <Calendar className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex-1">
              <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Miembro desde
              </label>
              <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {profileData.memberSince}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 text-center shadow-md`}>
            <p className="text-3xl text-[#2563eb] mb-1">12</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Alertas</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 text-center shadow-md`}>
            <p className="text-3xl text-green-500 mb-1">98%</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Activo</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 text-center shadow-md`}>
            <p className="text-3xl text-orange-500 mb-1">3</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contactos</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}