import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Auditorios = () => {
  const [edificios, setEdificios] = useState([]);
  const [edificioSeleccionado, setEdificioSeleccionado] = useState('');
  const [auditorios, setAuditorios] = useState([]);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errorCarga, setErrorCarga] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setEdificios([
      'Almendros',
      'Cedro Rosado',
      'Educación Continua',
      'Guaduales',
      'Guayacanes',
      'Lago',
      'Palmas',
      'Samán'
    ]);
  }, []);

  useEffect(() => {
    if (edificioSeleccionado) {
      setCargando(true);
      axios.get(`https://auditorio2backend.vercel.app/api/edificios/${edificioSeleccionado}`)
        .then(res => {
          setAuditorios(res.data);
          setErrorCarga('');
        })
        .catch(err => {
          const msg = err.response?.data?.error || err.message;
          console.error("❌ Error cargando auditorios:", msg);
          setErrorCarga(`Error al cargar auditorios: ${msg}`);
          setAuditorios([]);
        })
        .finally(() => setCargando(false));
    } else {
      setAuditorios([]);
      setErrorCarga('');
    }
  }, [edificioSeleccionado]);

  const handleSeleccionAuditorio = (e) => {
    const id = e.target.value;
    if (id) {
      navigate(`/auditorio/${encodeURIComponent(edificioSeleccionado)}/${id}`);
    }
  };

  const consultarChatGPT = async () => {
    if (!pregunta.trim()) {
      setRespuesta("Por favor escribe una pregunta.");
      return;
    }

    try {
      const res = await axios.post('https://auditorio2backend.vercel.app/api/chatgpt', {
        pregunta,
        edificio: edificioSeleccionado
      });
      setRespuesta(res.data.respuesta);
    } catch (err) {
      console.error("❌ Error al consultar ChatGPT:", err);
      setRespuesta("Error al obtener respuesta de la IA.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Consulta de Auditorios por Edificio</h2>

      <select
        onChange={e => setEdificioSeleccionado(e.target.value)}
        value={edificioSeleccionado}
        className="select"
      >
        <option value="">Selecciona un edificio</option>
        {edificios.map(ed => (
          <option key={ed} value={ed}>{ed}</option>
        ))}
      </select>

      {errorCarga && <div className="error-message">{errorCarga}</div>}
      {cargando && <div className="loading">Cargando auditorios...</div>}

      {auditorios.length > 0 && (
        <select onChange={handleSeleccionAuditorio} defaultValue="" className="select">
          <option value="" disabled>Selecciona un auditorio</option>
          {auditorios.map(a => (
            <option key={a._id} value={a._id}>{a.nombre}</option>
          ))}
        </select>
      )}

      {!cargando && edificioSeleccionado && auditorios.length === 0 && !errorCarga && (
        <div>No hay auditorios registrados para este edificio.</div>
      )}

      <div className="chat-box">
        <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>¿Tienes dudas? Pregúntale a la IA:</h4>

        <textarea
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Ejemplo: ¿Cuáles auditorios hay en este edificio?"
          rows={4}
          className="textarea"
        />

        <button onClick={consultarChatGPT}>Consultar</button>

        {respuesta && (
          <div className="response-box">
            <strong>Respuesta:</strong>
            <p>{respuesta}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auditorios;




