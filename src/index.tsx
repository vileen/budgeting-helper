import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import reportWebVitals from './reportWebVitals';
import { Application } from './commons/application';
import { initialiseParser } from './features/parser/initParser';
import { PrimeReactProvider } from 'primereact/api';
import { Parser } from './features/parser/components/parser';
import { AppProvider } from './commons/provider';
import { Page } from './commons/components/page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const application = new Application();
initialiseParser(application);

// this could be a switch if more features are there
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <AppProvider application={application}>
        <Page>
          <Parser />
        </Page>
      </AppProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
