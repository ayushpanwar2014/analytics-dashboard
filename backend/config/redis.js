import { createClient } from "redis";

let client;

export const initRedisClient = async () => {
    if (client?.isOpen) return client; // Already connected

    client = createClient({
        username: 'default',
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            reconnectStrategy: (retries) => {
                if (retries > 5) return new Error("Redis connection failed");
                return Math.min(retries * 50, 500);
            },
            keepAlive: 1, // Keep TCP alive
        }
    });

    client.on("error", (err) => {
        console.error("Redis Client Error:", err);
    });

    //Connect immediately
    if (!client.isOpen) {
        await client.connect();
        console.log("Redis connected");
    }

    return client;
};

// Graceful shutdown
process.on("SIGINT", async () => {
    if (client?.isOpen) {
        await client.quit();
        console.log("Redis connection closed");
    }
    process.exit(0);
});

// Store as plain string expiry in one call
export const setValue = async (key, value, TTL) => {
    try {
        const redisKey = `users:${key}`;
        await client.set(redisKey, JSON.stringify(value), { EX: TTL });
        return true;
    } catch (error) {
        console.error('Error setting value for key', key, error);
        throw error;
    }
};

// Get and parse back to object
export const getValue = async (key) => {
    try {
        const redisKey = `users:${key}`;
        const data = await client.get(redisKey);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting value for key', key, error);
        throw error;
    }
};

// Delete key
export const delValue = async (key) => {
    try {
        const redisKey = `users:${key}`;
        await client.del(redisKey);
        return true;
    } catch (error) {
        console.error('Error deleting key', key, error);
        throw error;
    }
};

export default initRedisClient;  