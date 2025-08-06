import React, { useEffect, useState } from 'react';
import './App.css';
import Anuncio from './components/Anuncio';
import Botones from './components/Botones';
import Home from './components/Home';
import Visor from './components/Visor';
import Comida from './components/menu/Comida';
import Bebidas from './components/menu/Bebidas';
import Postres from './components/menu/Postres';



function App() {
  const [componenteActivo, setComponenteActivo] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  const renderComponente = () => {
    switch (componenteActivo) {
      case 'home':
        return <Home />;
      case 'visor':
        return <Visor />;
      case 'anuncio':
        return <Anuncio />;
	  case 'comida':
        return <Comida />;
	  case 'bebidas':
        return <Bebidas />;
	  case 'postres':
        return <Postres />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <div className="contenido-principal">
        {renderComponente()}
      </div>
      <Botones cambiarComponente={setComponenteActivo} />
    </div>
  );
}


export default App;
