import React, { useState } from 'react';
import moment from 'moment';

const baseUrl = `${process.env.BASE_URI}/api`

const formatDate = (date) => {
  const duration = moment.duration(moment().diff(moment(date)));
  return duration.asDays();
}

const handleClick = (tech, setter) => async () => {
  const res = await fetch(`${baseUrl}/api/${tech}`, {
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
  const [ vscode, setVscode ] = useState(props.vscode);
  const [ firefox, setFirefox ] = useState(props.firefox);

  return (
    <div>
      <h1>{formatDate(prettier)} days since slagging off Prettier</h1>
      <button onClick={handleClick('prettier', setPrettier)} >Reset Prettier</button>

      <h1>{formatDate(ts)} days since bitching aboout TypeScript</h1>
      <button onClick={handleClick('ts', setTs)} >Reset TS</button>

      <h1>{formatDate(webstorm)} days since taking the piss out of Plebstorm</h1>
      <button onClick={handleClick('webstorm', setWebstorm)} >Reset Plebstorm</button>

      <h1>{formatDate(vscode)} days since taking the mickey out of VSCode</h1>
      <button onClick={handleClick('vscode', setVscode)} >Reset VSCode</button>

      <h1>{formatDate(firefox)} days since FireFox was blamed for a genuine bug</h1>
      <button onClick={handleClick('firefox', setFirefox)} >Reset FireFox</button>

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
  const baseUrl = `${process.env.BASE_URI}/api`

  const prettier = await fetch(`${baseUrl}?tech=prettier`);
  const ts = await fetch(`${baseUrl}?tech=ts`);
  const webstorm = await fetch(`${baseUrl}?tech=webstorm`);
  const vscode = await fetch(`${baseUrl}?tech=vscode`);
  const firefox = await fetch(`${baseUrl}?tech=firefox`);

  return {
    prettier,
    ts,
    webstorm,
    vscode,
    firefox,
  }
}
