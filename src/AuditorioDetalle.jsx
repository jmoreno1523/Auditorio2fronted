// src/AuditorioDetalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const AuditorioDetalle = () => {
  const { edificio, id } = useParams();
  const navigate = useNavigate();
  const [auditorio, setAuditorio] = useState(null);

  useEffect(() => {
    // Decodificar el nombre por si viene con %20 u otros caracteres especiales
    const nombreDecodificado = decodeURIComponent(edificio);

    axios.get(`http://localhost:5000/api/edificios/${nombreDecodificado}`)
      .then(res => {
        const encontrado = res.data.find(a => a._id === id);
        setAuditorio(encontrado);
      })
      .catch(err => console.error("Error al cargar el auditorio", err));
  }, [edificio, id]);

  if (!auditorio) return <p className="container">Cargando auditorio...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-btn">← Volver</button>
      <h2 className="title">{auditorio.nombre}</h2>

      <div className="grid">
        <div className="image-box">
          <img
            src={auditorio.imagenUrl || "https://via.placeholder.com/600x400?text=Sin+Imagen"}
            alt={`Imagen de ${auditorio.nombre}`}
          />
        </div>

        <div className="details">
          {Object.entries(auditorio).map(([key, value]) => {
            if (['_id', '__v', 'imagenUrl', 'nombre'].includes(key)) return null;
            return (
              <div className="detail-item" key={key}>
                <strong>{key.replace(/_/g, ' ')}</strong>
                {value || <em>No especificado</em>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuditorioDetalle;
