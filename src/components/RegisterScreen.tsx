import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from 'figma:asset/3521519f8aeac2ff98e73980f3c55c821b88931f.png';

interface RegisterScreenProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      onRegister();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mt-8"
      >
        <img src={logoImage} alt="ÉGIDA" className="w-20 h-20 object-contain" />
        <h1 className="mt-4 text-[#1e3a5f] text-3xl tracking-wide">Crear cuenta</h1>
        <p className="mt-2 text-gray-600 text-center">Únete a ÉGIDA para proteger tu seguridad</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 pb-24"
      >
        <div className="space-y-2">
          <label className="text-gray-700 text-sm">Nombre completo</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Juan Pérez"
              className="pl-12 h-14 rounded-2xl border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="tu@email.com"
              className="pl-12 h-14 rounded-2xl border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm">Número telefónico</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+34 600 000 000"
              className="pl-12 h-14 rounded-2xl border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
              className="pl-12 pr-12 h-14 rounded-2xl border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm">Confirmar contraseña</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="••••••••"
              className="pl-12 pr-12 h-14 rounded-2xl border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300 mt-6"
        >
          Registrarse
        </Button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#2563eb] hover:underline"
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
