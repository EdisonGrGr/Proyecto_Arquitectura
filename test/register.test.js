const request = require('supertest');
const app = require('../backend/src/app'); // exporta `app` sin iniciar el servidor en server.js
const db = require('../backend/src/models');

describe('POST /api/users/register', () => {
  // Limpia después de cada prueba
  afterAll(async () => {
    // Borra el usuario de prueba si fue creado
    await db.usuario.destroy({ where: { id_gmail: 'nuevo@test.com' } });
    await db.sequelize.close();
  });

  it('debe registrar un nuevo usuario correctamente', async () => {
    const res = await request(app).post('/api/users/register').send({
      id_gmail: 'nuevo@test.com',
      nombre: 'Nuevo',
      apellido: 'Usuario',
      id_rol: 3,
      password: '123456'
    });

    expect(res.statusCode).toBe(200); // o 201 según tu implementación
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('user');
  });

  it('debe fallar si las contraseñas no coinciden (validación simulada)', async () => {
    const res = await request(app).post('/api/users/register').send({
      id_gmail: 'nuevo@test.com',
      nombre: 'Nuevo',
      apellido: 'Usuario',
      id_rol: 3,
      password: '' // vacío simula error de frontend
    });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
});
