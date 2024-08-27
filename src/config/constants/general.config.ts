import { ConfigProps } from 'src/config/interfaces/config.interface';

export const config = (): ConfigProps => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    api: {
        apiUrl: '',
        httpTimeout: 1000,
        jwtSecret: process.env.JWT_SECRET,
        securityEnabled: process.env.SECURITY_ENABLED === 'true' ? true : false,
    },
    database: {
        main: {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: process.env.DB_SYNCRONIZE === 'true' ? true : false,
        },
    },
});
