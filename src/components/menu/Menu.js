import React, { useEffect, useRef, useState } from "react";
import "./DiseñoMenu.css";

const Menu = ({ nombre }) => {
  const videoRef = useRef(null);
  const [esVertical, setEsVertical] = useState(true);

  useEffect(() => {
    const manejarOrientacion = () => {
      const ancho = window.innerWidth;
      const alto = window.innerHeight;
      setEsVertical(alto > ancho);
    };

    manejarOrientacion(); // Inicial
    window.addEventListener("resize", manejarOrientacion);

    return () => {
      window.removeEventListener("resize", manejarOrientacion);
    };
  }, []);

	useEffect(() => {
	  const video = videoRef.current;

	  if (video) {
		video.currentTime = 0;

		const reproducir = () => {
		  video.play().catch((err) => {
			console.warn("Error al reproducir el video:", err.message);
		  });
		};

		video.addEventListener("loadeddata", reproducir);

		return () => {
		  video.removeEventListener("loadeddata", reproducir);
		};
	  }
	}, [esVertical]);


  const archivoVideo = esVertical
    ? `/videos/${nombre}v.mp4`
    : `/videos/${nombre}h.mp4`;

  return (
    <div className={`contenedor-video ${esVertical ? "vertical" : "horizontal"}`}>
      <video
        ref={videoRef}
        src={archivoVideo}
        className="video"
        muted
        playsInline
        onEnded={() => videoRef.current && videoRef.current.pause()}
      />
    </div>
  );
};

export default Menu;
