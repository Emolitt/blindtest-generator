import './App.css';
import React from "react";
import RoutingConfig from "./RoutingConfig";

function App() {
  //Setting up default Values
  window.localStorage.setItem('theme', 'games')
  window.localStorage.setItem('playlist_size', '100')
  window.localStorage.setItem('guess_time', '13')
  window.localStorage.setItem('wait_time', '5')
  window.localStorage.setItem('allow_same_licence', 'false')

  return (<RoutingConfig />);
}

export default App;
