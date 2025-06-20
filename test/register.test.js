const request = require('supertest');
const app = require('../backend/src/app'); 
const db = require('../backend/src/models');

describe('POST /api/users/register', () => {
  
  afterAll(async () => {
    
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

    expect(res.statusCode).toBe(200); 
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('user');
  });

  it('debe fallar si las contraseñas no coinciden (validación simulada)', async () => {
    const res = await request(app).post('/api/users/register').send({
      id_gmail: 'nuevo@test.com',
      nombre: 'Nuevo',
      apellido: 'Usuario',
      id_rol: 3,
      password: '' 
    });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
});
