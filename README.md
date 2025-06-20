# 🗺️ U Maps - Proyecto de Arquitectura de Software

**U Maps** es una aplicación web diseñada para la gestión y consulta de ubicaciones de aulas en la Universidad de Caldas. Ofrece autenticación tradicional (correo y contraseña) y autenticación con Google. Está construida utilizando **Node.js**, **Express**, **Sequelize** y **PostgreSQL**.

---

## 📦 Tecnologías utilizadas

- Node.js  
- Express.js  
- PostgreSQL  
- Sequelize (ORM)  
- Autenticación con JWT y Google OAuth2  
- API Gemini (IA)  
- HTML/CSS/Bootstrap (Frontend)

---

## 🚀 Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)  
- [PostgreSQL](https://www.postgresql.org/) (versión 16)  
- Git  

---

## ⚙️ Instalación

### 1. Clona el repositorio

```bash
git clone <https://github.com/EdisonGrGr/Proyecto_Arquitectura.git>
cd Proyecto_Arquitectura


### 2. Instalar dependencias
Desde la raíz del proyecto, ejecuta:
npm install

### 3. Configurar variables de entorno
Crea el archivo .env con la siguiente estructura

PORT=3000

DB_NAME=Proy_ArquiSoftware
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
NODE_ENV=development

GOOGLE_CLIENT_ID=483409486795-q67g8i72v01r46m3f38hiqlrhdmcpt23.apps.googleusercontent.com
JWT_SECRET=una_clave_super_segura

GEMINI_API_KEY=AIzaSyBZTTIMpvSQ0ZJo-h6mbIfQOpNc2yUhR1s


Asegúrate de actualizar los valores de usuario y contaseña segun tu entorno

### 4. Crear la base de datos y tablas
Ejecuta los siguientes comandos para crear la base de datos, aplicar migraciones y sembrar datos iniciales:

npm run db:create      # Crea la base de datos
npm run db:migrate     # Aplica las migraciones (crea tablas y relaciones)
npm run db:seed:all    # Inserta datos iniciales (roles, etc.)

### 5. Iniciar el servidor
npm run start
El servidor estará disponible en http://localhost:3000.
