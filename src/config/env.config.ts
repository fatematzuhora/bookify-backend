require('dotenv').config();

export const NODE_ENV: string = process.env.NODE_ENV;
export const NODE_PORT: number = parseInt(process.env.NODE_PORT);
export const ORIGINS: any = process.env.ORIGINS;

export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRES_IN: number = parseInt(process.env.JWT_EXPIRES_IN);
