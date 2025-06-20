const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Asignatura = require('../models/subject');
const Aula = require('../models/classroom');
const Docente = require('../models/teacher');
const Ubicacion = require('../models/location');
const apiKey = process.env.GEMINI_API_KEY;

const consultarUbicacionGemini = async (pregunta) => {
  try {
    const asignaturas = await Asignatura.findAll({
      include: [
        {
          model: Aula,
          as: 'aulas',
          include: [{ model: Ubicacion, as: 'ubicacion' }]
        },
        { model: Docente, as: 'docente' }
      ]
    });

    if (!asignaturas || asignaturas.length === 0) {
      console.log("ℹ️ No hay asignaturas registradas.");
      return 'No hay asignaturas registradas en el sistema.';
    }

    const contexto = asignaturas.map(asig => {
      const aula = asig.aulas?.[0]?.nombre || 'Desconocida';
      const ubicacionObj = asig.aulas?.[0]?.ubicacion;
      const ubicacion = ubicacionObj?.descripcion || 'Sin ubicación';
      const lat = ubicacionObj?.latitud;
      const lon = ubicacionObj?.longitud;
      const docente = `${asig.docente?.nombre || ''} ${asig.docente?.apellido || ''}`;

      const coords = (lat && lon)
        ? `Coordenadas: { "lat": ${lat}, "lon": ${lon} }`
        : 'Coordenadas no disponibles';

      return `La asignatura ${asig.nombre} se dicta en el aula ${aula}, ubicada en ${ubicacion}, ${coords}, con el docente ${docente}.`;
    }).join('\n');

    const mensaje = `
Eres un asistente que responde preguntas sobre ubicación de aulas en la Universidad de Caldas.
Tienes esta información de referencia sobre asignaturas, aulas y ubicaciones (incluyendo coordenadas GPS):

${contexto}

Responde brevemente (máximo 2 líneas) y entrega las coordenadas exactas en formato JSON si están disponibles.
Pregunta del estudiante: ${pregunta}
    `;

    

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: mensaje }]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("🌐 DATA COMPLETA:", JSON.stringify(data, null, 2));

    const respuesta = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta';
    console.log("✅ Respuesta de Gemini:", respuesta);

    return respuesta;

  } catch (error) {
    console.error("❌ Error en Gemini o BD:", error);
    return 'No se pudo obtener respuesta';
  }
};

module.exports = { consultarUbicacionGemini };
