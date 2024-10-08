interface ApiConfigProps {
    apiUrl: string;
    httpTimeout: number;
    jwtSecret: string;
    securityEnabled: boolean;
}

interface Microservices {
    storageMicroserviceUrl: string;
    rabbitMqUrl: string;
}

interface DatabaseConfigProps {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
}

export interface ConfigProps {
    port: number;
    api: ApiConfigProps;
    database: {
        main: DatabaseConfigProps;
    };
    microservices: Microservices;
}
