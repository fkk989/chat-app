import { Redis } from "ioredis";

const host = process.env.REDIS_HOST || "localhost";
const port = parseInt(process.env.REDIS_PORT) || 6379;
const username = process.env.REDIS_USERNAME || "default";
const password = process.env.REDIS_PASSWORD;
export function createRedisClient() {
  const client = new Redis({
    host,
    port,
    username,
    // password only required when you use a hosted redis
    // password,
  });

  return client;
}