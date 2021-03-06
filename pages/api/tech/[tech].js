import redis from 'redis';
import { promisify } from 'util';
import  Cors from 'cors';

const client = redis.createClient(process.env.REDIS_URL)
const getAsync = promisify(client.get).bind(client);

const runMiddleware = mw => (req, res) =>
  new Promise((resolve, reject) => {
    mw(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

const cors = Cors({
  methods: [ 'HEAD', 'OPTIONS', 'GET', 'PUT' ],
});

const runCors = runMiddleware(cors);

export default async function handler(req, res) {
  const {
    query: { tech },
    method,
  } = req;

  await runCors(req, res);

  switch (method) {
    case 'GET': {
      const result = await getAsync(tech);
      res.status(200).json({ date: result });
      break;
    }
    case 'PUT': {
      const date = Date.now();
      client.set(tech, date, (err) => {
        if (err) {
          res.status(500).json({ error: 'Could not fetch tech record' });
        }
        res.status(200).json({ date });
      });
      break;
    }
    default: {
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
    }
  }

}
