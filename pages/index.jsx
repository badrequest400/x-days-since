import React from 'react';
import moment from 'moment';
import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient(process.env.REDIS_URL)
const getAsync = promisify(client.get).bind(client);

const formatDate = (date) => {
  moment(date);
}

export default function Index(props) {
  return (
    <div>
      <h1>{prettier} days since slagging off Prettier</h1>
      <button>Reset Prettier</button>

      <h1>{tsDate} days since bitching aboout TypeScript</h1>
      <button>Reset TS</button>

      <h1>{webstormDate} days since taking the piss out of Plebstorm</h1>
      <button>Reset Plebstorm</button>

      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;
          padding: 1rem;
        } 
      `}</style>
    </div>
  );
}

Index.getInitialProps = async () => {
  const prettier = await getAsync('prettier');
  const ts = await getAsync('ts');
  const webstorm = await getAsync('webstorm');

  return {
    prettier,
    ts,
    webstorm,
  }
}
