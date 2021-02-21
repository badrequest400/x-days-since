import React, { useState } from 'react';
import moment from 'moment';
import Head from 'next/head';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URI}/api`

const formatDate = (date) => {
  const duration = moment.duration(moment().diff(moment(parseInt(date, 10))));
  const days = Math.floor(duration.asDays());
  const hrs = Math.floor(duration.asHours());
  const hours = days > 0 ? hrs - (days * 24) : hrs;
  return { days, hours };
}

const handleClick = (tech, setter) => async () => {
  const res = await fetch(`${baseUrl}/tech/${tech}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
 
  const { date } = await res.json();
  setter(date);
}

export default function Index(props) {
  const [ prettier, setPrettier ] = useState(props.prettier);
  const [ ts, setTs ] = useState(props.ts);
  const [ webstorm, setWebstorm ] = useState(props.webstorm);
  const [ oni, setOni ] = useState(props.oni);
  const [ firefox, setFirefox ] = useState(props.firefox);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=JetBrains+Mono"></link>
      </Head>
      <h1>{formatDate(prettier).days} days and {formatDate(prettier).hours} hours since slagging off Prettier</h1>
      <button onClick={handleClick('prettier', setPrettier)}>Reset Prettier</button>

      <h1>{formatDate(ts).days} days and {formatDate(ts).hours} hours since bitching about TypeScript</h1>
      <button onClick={handleClick('ts', setTs)}>Reset TS</button>

      <h1>{formatDate(webstorm).days} days and {formatDate(webstorm).hours} hours since taking the piss out of Plebstorm</h1>
      <button onClick={handleClick('webstorm', setWebstorm)}>Reset Plebstorm</button>

      <h1>{formatDate(oni).days} days and {formatDate(oni).hours} hours since creating a new file in Oni</h1>
      <button onClick={handleClick('oni', setOni)}>Reset OniVim2</button>

      <h1>{formatDate(firefox).days} days and {formatDate(firefox).hours} hours since DireFox was blamed for a bug</h1>
      <button onClick={handleClick('firefox', setFirefox)}>Reset DireFox</button>

      <style jsx>{`
        div {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        } 
        h1 {
          margin-bottom: 30px;
          color: white;
        }
        button {
          border: solid 2px #b030b0;
          background-color: #202060;
          border-radius: 24px;
          padding: 12px;
          color: #b030b0;
          max-width: 20%;
          font-weight: 800;
          font-size: 20px;
          cursor: pointer;
        }
        button:hover {
          background-color: #b030b0;
          color: white;
        }
      `}</style>

      <style jsx global>{`
        body {
          height: 100%;
          margin: 0;
          background-attachment: fixed;
          background-image: linear-gradient(#202060 50%, #602080);
          background-repeat: no-repeat;
          font-family: "JetBrains Mono";
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = async () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URI}/api`

  const prettier = await (await fetch(`${baseUrl}?tech=prettier`)).json();
  const ts = await (await fetch(`${baseUrl}?tech=ts`)).json();
  const webstorm = await (await fetch(`${baseUrl}?tech=webstorm`)).json();
  const oni = await (await fetch(`${baseUrl}?tech=oni`)).json();
  const firefox = await (await fetch(`${baseUrl}?tech=firefox`)).json()

  return {
    props: {
      prettier: prettier.date,
      ts: ts.date,
      webstorm: webstorm.date,
      oni: oni.date,
      firefox: firefox.date,
    }
  }
}
