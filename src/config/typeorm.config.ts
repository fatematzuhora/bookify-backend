import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as config from 'config';
const dbConfig = config.get('db');

require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    entities: [
        __dirname + '/../**/*.entity.js'
    ],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    dropSchema: process.env.DATABASE_DROPSCHEMA || dbConfig.dropSchema,
    logging: process.env.DATABASE_LOGGING || dbConfig.logging,
}
