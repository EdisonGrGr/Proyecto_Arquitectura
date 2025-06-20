
const request = require('supertest');
const app = require('../backend/src/app');
const db = require('../backend/src/models');

describe('Pruebas funcionales completas', () => {
  afterAll(async () => {
    await db.usuario.destroy({ where: { id_gmail: 'nuevo@test.com' } });
    await db.aula.destroy({ where: { nombre: 'Aula de Prueba' } });
    await db.sequelize.close();
  });

  describe('POST /api/users/register', () => {
    it('debe registrar un nuevo usuario correctamente', async () => {
      const res = await request(app).post('/api/users/register').send({
        id_gmail: 'nuevo@test.com',
        nombre: 'Nuevo',
        apellido: 'Usuario',
        id_rol: 3,
        password: '123456'
      });

      expect([200, 201]).toContain(res.statusCode);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
    });

    it('debe fallar si la contraseña está vacía', async () => {
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

  describe('POST /api/login', () => {
    it('debe autenticar correctamente con credenciales válidas', async () => {
      const res = await request(app).post('/api/login').send({
        id_gmail: 'prueba@ucaldas.edu.co',
        password: '123456'
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('debe fallar con credenciales inválidas', async () => {
      const res = await request(app).post('/api/login').send({
        id_gmail: 'usuario@invalido.com',
        password: 'incorrecta'
      });

      expect([400, 401]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('CRUD /api/aulas', () => {
    let aulaId = null;

    it('debe crear un aula correctamente', async () => {
      const res = await request(app).post('/api/aulas').send({
        nombre: 'Aula de Prueba',
        id_asignatura: 1,
        id_ubicacion: 1
      });

      expect([200, 201]).toContain(res.statusCode);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id_aula');
      aulaId = res.body.data.id_aula;
    });

    it('debe listar las aulas incluyendo la recién creada', async () => {
      const res = await request(app).get('/api/aulas');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);

      const encontrada = res.body.data.find(a => a.id_aula === aulaId);
      expect(encontrada).toBeDefined();
      expect(encontrada.nombre).toBe('Aula de Prueba');
    });

    it('debe eliminar el aula correctamente', async () => {
      const res = await request(app).delete(`/api/aulas/${aulaId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
