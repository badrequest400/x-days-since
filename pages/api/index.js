import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient(process.env.REDIS_URL)
const getAsync = promisify(client.get).bind(client);

export default async function handler(req, res) {
  const { query: { tech } } = req;

  const result = await getAsync(tech);
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ date: result });
}
