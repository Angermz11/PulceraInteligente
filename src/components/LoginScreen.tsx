import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from 'figma:asset/977e04baf59f7c254a03bc9ec11e992678d604c5.png';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

export default function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mt-12"
      >
        <img src={logoImage} alt="ÉGIDA" className="w-24 h-24 object-contain" />
        <h1 className="mt-6 text-[#1e3a5f] text-4xl tracking-wide">ÉGIDA</h1>
        <p className="mt-2 text-gray-600">Bienvenido de nuevo</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="mt-12 space-y-5"
      >
        <div className="space-y-2">
          <label className="text-gray-700 text-sm">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="button"
          className="text-[#2563eb] text-sm hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <Button
          type="submit"
          className="w-full h-14 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300"
        >
          Iniciar sesión
        </Button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <button
            onClick={onNavigateToRegister}
            className="text-[#2563eb] hover:underline"
          >
            Crear cuenta
          </button>
        </p>
      </motion.div>
    </div>
  );
}