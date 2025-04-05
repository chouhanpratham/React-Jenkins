import { useContext, useState } from "react";
import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { UserContext } from "./Components/UserContext";

function App() {
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <h2>Welcome, {user.name}!</h2>
        <h1>Welcome to IKEA</h1>
        <img
          src="https://www.ikea.com/images/ikea-logo-3313e386d5420bc0e8e92cbac2dc7a43.jpg?f=s"
          alt="Ikea Display"
          width="1100px"
          height="700px"
        />
      </div>
    </React.Fragment>
  );
}

export default App;
