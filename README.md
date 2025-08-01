# Proser Backend

## Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno para manejar diferentes configuraciones según el entorno (desarrollo, pruebas, producción).

### Configuración Inicial

1. **Crear archivo `.env`**: Copia el archivo `env.example` y renómbralo a `.env`
2. **Configurar variables**: Edita el archivo `.env` con tus valores específicos

### Variables de Entorno Disponibles

#### Entorno
- `NODE_ENV`: Define el entorno actual (`development`, `test`, `production`)

#### Base de Datos - Desarrollo
- `DB_HOST_DEV`: Host de la base de datos para desarrollo
- `DB_PORT_DEV`: Puerto de la base de datos para desarrollo
- `DB_NAME_DEV`: Nombre de la base de datos para desarrollo
- `DB_USER_DEV`: Usuario de la base de datos para desarrollo
- `DB_PASSWORD_DEV`: Contraseña de la base de datos para desarrollo

#### Base de Datos - Pruebas
- `DB_HOST_TEST`: Host de la base de datos para pruebas
- `DB_PORT_TEST`: Puerto de la base de datos para pruebas
- `DB_NAME_TEST`: Nombre de la base de datos para pruebas
- `DB_USER_TEST`: Usuario de la base de datos para pruebas
- `DB_PASSWORD_TEST`: Contraseña de la base de datos para pruebas

#### Base de Datos - Producción
- `DB_HOST_PROD`: Host de la base de datos para producción
- `DB_PORT_PROD`: Puerto de la base de datos para producción
- `DB_NAME_PROD`: Nombre de la base de datos para producción
- `DB_USER_PROD`: Usuario de la base de datos para producción
- `DB_PASSWORD_PROD`: Contraseña de la base de datos para producción

#### Servidor
- `PORT`: Puerto del servidor (por defecto: 3000)

### Scripts Disponibles

- `npm run dev`: Ejecuta en modo desarrollo con nodemon
- `npm run test`: Ejecuta en modo pruebas
- `npm run prod`: Ejecuta en modo producción
- `npm start`: Ejecuta con la configuración por defecto

> **Nota**: Los scripts usan `cross-env` para compatibilidad entre Windows, Linux y macOS.

### Ejemplo de uso

```bash
# Desarrollo
npm run dev

# Pruebas
npm run test

# Producción
npm run prod
```

### Seguridad

- **NUNCA** subas el archivo `.env` al repositorio
- El archivo `.env` ya está incluido en `.gitignore`
- Usa `env.example` como plantilla para crear tu archivo `.env`

### Estructura de Configuración

El archivo `database/config.js` automáticamente detecta el entorno y usa la configuración correspondiente:

- **Development**: Usa variables con sufijo `_DEV`
- **Test**: Usa variables con sufijo `_TEST`
- **Production**: Usa variables con sufijo `_PROD` 