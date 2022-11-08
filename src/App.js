import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RehberTable from "./Components/RehberTable";

// resim ekleme
// const darkPicture = new URL("./Images/dark.jpg", import.meta.url);

// import {Container, Row} from "reactstrap";

function App() {
  const [people, setPeople] = useState([]);

  return (
    <div className="color">
      {/* <img className="picture" src={darkPicture} /> */}
      <h1 className="title">Kişi Ekleme</h1>
      <RehberTable people={people} setPeople={setPeople} />
    </div>
  );
}

export default App;
