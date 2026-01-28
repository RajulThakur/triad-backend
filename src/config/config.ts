import dotenv from 'dotenv';

dotenv.config();

const _config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    db_url: process.env.DATABASE_URL
}

export const config = Object.freeze(_config);