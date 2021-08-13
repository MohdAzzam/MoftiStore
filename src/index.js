import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/main.scss'
import { IntlProvider } from "react-intl";
import storage from './util/storage';
import {GLOABL_CONSTANS} from './Constant';
import en from './translation/en.json';
import ar from './translation/ar.json';


let lang = GLOABL_CONSTANS.EN_LANG;
let messages = en;

if (storage.get(GLOABL_CONSTANS.USER_LANG) === GLOABL_CONSTANS.AR_LANG) {
  lang = GLOABL_CONSTANS.AR_LANG
  messages = ar;
}

document.body.setAttribute('dir', lang === GLOABL_CONSTANS.AR_LANG ? 'rtl' : 'ltr');

ReactDOM.render(
  // <React.StrictMode>
    <IntlProvider messages={messages} locale={lang} defaultLocale="en">
      <App />
    </IntlProvider>
  // </React.StrictMode>,
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
