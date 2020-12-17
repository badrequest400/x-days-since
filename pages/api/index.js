import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient(process.env.REDIS_URL)
const getAsync = promisify(client.get).bind(client);

export default function handler(req, res) {
  const tech = req.query.tech;
  const result = await getAsync(tech);

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ date: result }));
}
