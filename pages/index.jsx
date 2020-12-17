import React from 'react';
import moment from 'moment';

const formatDate = (date) => {
  const duration = moment.duration(moment().diff(moment(date)));
  return duration.asDays();
}

export default function Index(props) {
  return (
    <div>
      <h1>{prettier} days since slagging off Prettier</h1>
      <button>Reset Prettier</button>

      <h1>{ts} days since bitching aboout TypeScript</h1>
      <button>Reset TS</button>

      <h1>{webstorm} days since taking the piss out of Plebstorm</h1>
      <button>Reset Plebstorm</button>

      <h1>{vscode} days since taking the mickey out of VSCode</h1>
      <button>Reset VSCode</button>

      <h1>{firefox} days since FireFox was blamed for a genuine bug</h1>
      <button>Reset FireFox</button>

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
  const url = `${process.env.BASE_URI}/api`
  const prettier = await fetch(`${url}?tech=prettier`);
  const ts = await fetch(`${url}?tech=ts`);
  const webstorm = await fetch(`${url}?tech=webstorm`);
  const vscode = await fetch(`${url}?tech=vscode`);
  const firefox = await fetch(`${url}?tech=firefox`);

  return {
    prettier,
    ts,
    webstorm,
    vscode,
    firefox,
  }
}
