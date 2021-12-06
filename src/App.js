import './App.css';
import React from "react";
import RoutingConfig from "./RoutingConfig";
import {StoreProvider} from "./store/store";

function App() {
  return <StoreProvider>
    <RoutingConfig />
  </StoreProvider>
}

export default App;
