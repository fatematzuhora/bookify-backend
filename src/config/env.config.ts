require('dotenv').config();

export const NODE_ENV: string = process.env.NODE_ENV;
export const NODE_PORT: number = parseInt(process.env.NODE_PORT);
export const ORIGINS: any = process.env.ORIGINS;
