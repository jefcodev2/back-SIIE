const pgPromise = require("pg-promise");
require('dotenv').config();

// Función para obtener la configuración según el entorno
const getConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    
    switch (env) {
        case 'development':
            return {
                host: process.env.DB_HOST_DEV || "localhost",
                port: process.env.DB_PORT_DEV || "5432",
                database: process.env.DB_NAME_DEV || "proser_staging",
                user: process.env.DB_USER_DEV || "postgres",
                password: process.env.DB_PASSWORD_DEV || "root"
            };
        
        case 'test':
            return {
                host: process.env.DB_HOST_TEST || "localhost",
                port: process.env.DB_PORT_TEST || "5432",
                database: process.env.DB_NAME_TEST || "inveservicefgl_test",
                user: process.env.DB_USER_TEST || "postgres",
                password: process.env.DB_PASSWORD_TEST || "2024"
            };
        
        case 'production':
            return {
                host: process.env.DB_HOST_PROD || "systemcode.ec",
                port: process.env.DB_PORT_PROD || "5432",
                database: process.env.DB_NAME_PROD || "inveservicefgl",
                user: process.env.DB_USER_PROD || "user_inveservice",
                password: process.env.DB_PASSWORD_PROD || "v@3Whv858"
            };
        
        default:
            console.warn(`Entorno no reconocido: ${env}. Usando configuración de desarrollo.`);
            return {
                host: process.env.DB_HOST_DEV || "localhost",
                port: process.env.DB_PORT_DEV || "5432",
                database: process.env.DB_NAME_DEV || "inveservicefgl",
                user: process.env.DB_USER_DEV || "postgres",
                password: process.env.DB_PASSWORD_DEV || "2024"
            };
    }
};

const config = getConfig();

// Log de información del entorno (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
    console.log(`Conectando a la base de datos en entorno: ${process.env.NODE_ENV}`);
    console.log(`Host: ${config.host}, Puerto: ${config.port}, Base de datos: ${config.database}`);
}

const pgp = pgPromise({});
const db_postgres = pgp(config);

db_postgres
    .connect()
    .then(() => console.log("DB Conectado!"))
    .catch((err) => console.error("Error al conectar con la base de datos", err));

exports.db_postgres = db_postgres;
