import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Phone, UserPlus, Trash2, Edit2, X, Check } from 'lucide-react';
import { EmergencyContact } from '../types';
import { toast } from 'sonner@2.0.3';

interface ManageContactsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  contacts: EmergencyContact[];
  onContactsChange: (contacts: EmergencyContact[]) => void;
}

export default function ManageContactsDialog({
  isOpen,
  onClose,
  darkMode,
  contacts,
  onContactsChange
}: ManageContactsDialogProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'family'
  });

  const handleAdd = () => {
    if (!formData.name || !formData.phone) {
      toast.error('Campos requeridos', {
        description: 'Por favor completa nombre y teléfono'
      });
      return;
    }

    if (contacts.length >= 5) {
      toast.error('Límite alcanzado', {
        description: 'Máximo 5 contactos de emergencia'
      });
      return;
    }

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      ...formData,
      priority: contacts.length + 1
    };

    onContactsChange([...contacts, newContact]);
    setFormData({ name: '', phone: '', relationship: 'family' });
    setShowAddForm(false);
    toast.success('Contacto agregado', {
      description: `${newContact.name} ha sido añadido a tus contactos de emergencia`
    });
  };

  const handleDelete = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    onContactsChange(contacts.filter(c => c.id !== id));
    toast.success('Contacto eliminado', {
      description: `${contact?.name} ha sido eliminado`
    });
  };

  const handleEdit = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        relationship: contact.relationship
      });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.phone) {
      toast.error('Campos requeridos', {
        description: 'Por favor completa nombre y teléfono'
      });
      return;
    }

    onContactsChange(
      contacts.map(c =>
        c.id === editingId
          ? { ...c, ...formData }
          : c
      )
    );
    setEditingId(null);
    setFormData({ name: '', phone: '', relationship: 'family' });
    toast.success('Contacto actualizado');
  };

  const relationshipLabels: Record<string, string> = {
    family: 'Familia',
    friend: 'Amigo/a',
    partner: 'Pareja',
    doctor: 'Médico',
    other: 'Otro'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-md max-h-[80vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            Contactos de emergencia
          </DialogTitle>
          <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Gestiona tus contactos de emergencia (máximo 5)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Contact List */}
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                } ${editingId === contact.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                {editingId === contact.id ? (
                  // Edit Form
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="edit-name" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Nombre
                      </Label>
                      <Input
                        id="edit-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-phone" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Teléfono
                      </Label>
                      <Input
                        id="edit-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-relationship" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Relación
                      </Label>
                      <Select value={formData.relationship} onValueChange={(value) => setFormData({ ...formData, relationship: value })}>
                        <SelectTrigger className={darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(relationshipLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdate}
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Guardar
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ name: '', phone: '', relationship: 'family' });
                        }}
                        size="sm"
                        variant="outline"
                        className={darkMode ? 'border-gray-600 text-white hover:bg-gray-600' : ''}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Contact Display
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                    }`}>
                      <Phone className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {contact.name}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {contact.phone} • {relationshipLabels[contact.relationship]}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleEdit(contact.id)}
                        size="sm"
                        variant="ghost"
                        className={darkMode ? 'hover:bg-gray-600' : ''}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(contact.id)}
                        size="sm"
                        variant="ghost"
                        className={darkMode ? 'hover:bg-red-900/30 text-red-400' : 'text-red-600 hover:bg-red-50'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Contact Form */}
          {showAddForm ? (
            <div className={`p-4 rounded-xl border-2 border-dashed ${
              darkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="new-name" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre
                  </Label>
                  <Input
                    id="new-name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="new-phone" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Teléfono
                  </Label>
                  <Input
                    id="new-phone"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="new-relationship" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Relación
                  </Label>
                  <Select value={formData.relationship} onValueChange={(value) => setFormData({ ...formData, relationship: value })}>
                    <SelectTrigger className={darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(relationshipLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAdd}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({ name: '', phone: '', relationship: 'family' });
                    }}
                    variant="outline"
                    className={darkMode ? 'border-gray-600 text-white hover:bg-gray-600' : ''}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowAddForm(true)}
              disabled={contacts.length >= 5}
              variant="outline"
              className={`w-full ${
                darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''
              }`}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar contacto ({contacts.length}/5)
            </Button>
          )}

          {/* Info */}
          {contacts.length === 0 && !showAddForm && (
            <div className={`p-4 rounded-xl text-center ${
              darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-700'
            }`}>
              <p className="text-sm">
                No tienes contactos de emergencia. Añade al menos uno para poder usar el sistema de alertas.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
