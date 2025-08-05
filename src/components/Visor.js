import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import visorData from '../data/visorData.json';
import './Visor.css'; // Ahorita te doy el CSS

let iconAdelante, iconAtras;
try { iconAdelante = require('../assets/visor/adelante.png'); } catch {}
try { iconAtras = require('../assets/visor/atras.png'); } catch {}



function Visor() {
  const [indice, setIndice] = useState(0);
  const item = visorData[indice];

  const cambiarImagen = (direccion) => {
    setIndice((prev) => {
      const total = visorData.length;
      if (direccion === 'adelante') return (prev + 1) % total;
      if (direccion === 'atras') return (prev - 1 + total) % total;
      return prev;
    });
  };

  const animaciones = {
    inicial: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    salida: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const urlWhatsApp = `https://wa.me/524772547348?text=Me%20interesa%20este%20producto:%20${encodeURIComponent(item.modelo)}`;

  return (
    <div className="visor-contenedor">
      <div className="visor-imagen">
        <AnimatePresence mode="wait">
          <motion.img
            key={item.imagen}
            src={item.imagen}
            alt={item.modelo}
            initial="inicial"
            animate="visible"
            exit="salida"
            variants={animaciones}
          />
        </AnimatePresence>
      </div>

      <div className="visor-controles">
        <motion.div
          className="descripcion"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p><strong>Modelo:</strong> {item.modelo}</p>
          <p><strong>Descripción:</strong> {item.descripcion}</p>
          <p><strong>Costo:</strong> {item.costo}</p>
        </motion.div>

		<a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-whatsapp"
        >
          Me interesa este
        </a>
		
        <div className="botones-navegacion">
          <button onClick={() => cambiarImagen('atras')}>  <img src={iconAtras} alt="Atrás" /> </button>
          <button onClick={() => cambiarImagen('adelante')}>  <img src={iconAdelante} alt="Adelante" /> </button>
        </div>


      </div>
    </div>
  );
}

export default Visor;
