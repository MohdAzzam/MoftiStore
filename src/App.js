import React from "react";
import Footer from "./screens/footer/footer";
import Header from './screens/header/header';
import Main from "./main";
import { BrowserRouter } from "react-router-dom";
import GlobalState from './context/GlobalContext';

function App() {
  return (

    <BrowserRouter>
      <GlobalState.Provider>
        <Header />
          <Main />
        <Footer />
      </GlobalState.Provider>
    </BrowserRouter>
  );
}

export default App;
