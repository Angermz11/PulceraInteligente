import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { motion } from 'motion/react';

interface MapComponentProps {
  darkMode: boolean;
  latitude?: number;
  longitude?: number;
  showControls?: boolean;
}

export default function MapComponent({ 
  darkMode, 
  latitude = 20.5738, 
  longitude = -101.1826,
  showControls = true 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [zoom, setZoom] = useState(15);
  const [L, setLeaflet] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Leaflet
    import('leaflet').then((leaflet) => {
      setLeaflet(leaflet.default);
    });
  }, []);

  useEffect(() => {
    if (!L || !mapRef.current || map) return;

    // Initialize map
    const mapInstance = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      zoomControl: false,
      attributionControl: false
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstance);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="position: relative;">
          <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C8.95 0 0 8.95 0 20C0 35 20 50 20 50C20 50 40 35 40 20C40 8.95 31.05 0 20 0Z" fill="#EF4444"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
          </svg>
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 10px; display: flex; align-items: center; justify-content: center;">
            <div style="width: 16px; height: 16px; background: #EF4444; border-radius: 50%; border: 3px solid white; animation: pulse 2s infinite;"></div>
          </div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 50]
    });

    // Add marker
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapInstance);

    // Add popup
    marker.bindPopup(`
      <div style="font-family: system-ui; padding: 4px;">
        <strong style="color: #1e3a5f;">Ubicación actual</strong><br/>
        <span style="color: #64748b; font-size: 12px;">Salamanca, Guanajuato</span>
      </div>
    `).openPopup();

    // Add pulsing circle
    const circle = L.circle([latitude, longitude], {
      color: '#EF4444',
      fillColor: '#EF4444',
      fillOpacity: 0.1,
      radius: 100
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup
    return () => {
      mapInstance.remove();
    };
  }, [L, latitude, longitude]);

  const handleZoomIn = () => {
    if (map) {
      const newZoom = zoom + 1;
      map.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const newZoom = zoom - 1;
      map.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  const handleRecenter = () => {
    if (map) {
      map.setView([latitude, longitude], 15);
      setZoom(15);
    }
  };

  return (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-xl">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Add pulse animation to head */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>

      {/* Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleZoomIn}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow`}
          >
            <ZoomIn className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleZoomOut}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow`}
          >
            <ZoomOut className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRecenter}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow`}
          >
            <Maximize className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </motion.button>
        </div>
      )}

      {/* Loading indicator */}
      {!map && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <MapPin className="w-8 h-8 text-blue-500" />
            </motion.div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Cargando mapa...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
