// ========================================
// API REST SIMPLE PARA GESTIONAR PROYECTOS
// ========================================

// 1. IMPORTAR LAS LIBRERÍAS QUE NECESITAMOS
const express = require('express'); // Express: framework para crear APIs
const cors = require('cors');       // CORS: permite que otros sitios web usen nuestra API

// 2. CONFIGURAR NUESTRA APLICACIÓN
const app = express();              // Crear la aplicación Express
const PORT = process.env.PORT || 3001; // Puerto donde va a correr nuestro servidor

// 3. CONFIGURAR MIDDLEWARES (funciones que se ejecutan antes de las rutas)
app.use(cors());                    // Permitir peticiones desde cualquier origen
app.use(express.json());            // Convertir JSON del body de las peticiones a objetos JavaScript

// 4. CREAR NUESTRA "BASE DE DATOS" EN MEMORIA
// ⚠️ IMPORTANTE: Esta base de datos se borra cuando apagamos el servidor
let experience = [
  { id: 1, company: 'Artek', period: '2020-2023' },      // Proyecto 1
  { id: 2, company: 'Photoland GT', period: '2023-2024' }    // Proyecto 2
];

// ========================================
// DEFINIR LAS RUTAS DE NUESTRA API
// ========================================

// 5. RUTA GET /experience - OBTENER TODAS LAS EXPERIENCIAS
app.get('/experience', (req, res) => {
  // req = request (petición que llega)
  // res = response (respuesta que enviamos)
  res.json(experience); // Enviar todos los proyectos como JSON
});

// 6. RUTA GET /experience/:id - OBTENER UNA EXPERIENCIA ESPECÍFICA POR ID
app.get('/experience/:id', (req, res) => {
  const id = Number(req.params.id);           // Convertir el ID de string a número
  const proyecto = experience.find(p => p.id === id); // Buscar el proyecto con ese ID
  
  // Si no encuentra el proyecto, devolver error 404
  if (!proyecto) {
    return res.status(404).json({ error: 'Proyecto no encontrado' });
  }
  
  res.json(proyecto); // Enviar el proyecto encontrado
});

// 7. RUTA POST /experience - CREAR UNA NUEVA EXPERIENCIA
app.post('/experience', (req, res) => {
  const {company, period } = req.body; // Extraer company y period del body de la petición
  
  // Validar que company y period sean obligatorios y no vacíos
  if (typeof company !== 'string' || company.trim() === '') {
    return res.status(422).json({ error: 'El campo "company" es obligatorio y debe ser un string no vacío' });
  }
  if (typeof period !== 'string' || period.trim() === '') {
    return res.status(422).json({ error: 'El campo "period" es obligatorio y debe ser un string no vacío' });
  }
  
  // Generar un nuevo ID (el más alto + 1)
  const nuevoId = Math.max(0, ...experience.map(p => p.id)) + 1;
  
  // Crear el nuevo proyecto
  const nuevoProyecto = { 
    id: nuevoId, 
    company: company, 
    period: period
  };
  
  experience.push(nuevoProyecto); // Agregar el proyecto a nuestra "base de datos"
  res.status(201).json(nuevoProyecto); // Devolver el proyecto creado con código 201
});

// 8. RUTA PATCH /experience/:id - ACTUALIZAR PARCIALMENTE UNA EXPERIENCIA
app.patch('/experience/:id', (req, res) => {
  const id = Number(req.params.id);           // ID del proyecto a actualizar
  const proyecto = experience.find(p => p.id === id); // Buscar el proyecto
  
  // Si no encuentra el proyecto, devolver error 404
  if (!proyecto) {
    return res.status(404).json({ error: 'Proyecto no encontrado' });
  }

  const { company, period } = req.body; // Datos nuevos que queremos actualizar
  
  // Actualizar solo los campos que vienen en la petición
  if (company !== undefined) proyecto.company = company;   // Si viene company, actualizarlo
  if (period !== undefined) proyecto.period = period;      // Si viene period, actualizarlo

  res.json(proyecto); // Devolver el proyecto actualizado
});

// 9. RUTA DELETE /experience/:id - ELIMINAR UNA EXPERIENCIA
app.delete('/experience/:id', (req, res) => {
  const id = Number(req.params.id);                    // ID del proyecto a eliminar
  const indice = experience.findIndex(p => p.id === id); // Buscar el índice del proyecto
  
  // Si no encuentra el proyecto, devolver error 404
  if (indice === -1) {
    return res.status(404).json({ error: 'Proyecto no encontrado' });
  }
  
  // Eliminar el proyecto del array y guardarlo en una variable
  const proyectoEliminado = experience.splice(indice, 1)[0];
  res.json(proyectoEliminado); // Devolver el proyecto que se eliminó
});

// 10. MANEJAR RUTAS NO ENCONTRADAS (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 11. INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET    /experience     - Ver todos los proyectos`);
  console.log(`   GET    /experience/:id - Ver un proyecto específico`);
  console.log(`   POST   /experience     - Crear un nuevo proyecto`);
  console.log(`   PATCH  /experience/:id - Actualizar un proyecto`);
  console.log(`   DELETE /experience/:id - Eliminar un proyecto`);
});