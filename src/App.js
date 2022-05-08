import "./App.css";
import "./style.scss";
import TodoClass from "./TodoClass";
import TodoFunctional from "./TodoFunctional";
import { useState } from "react";

function App() {
  const [isActiveFunctional, setActiveFunctional] = useState("false");

  return (
    <div>
      <div>
        <div className="cus-switch">
          <button
            className={`switch-section 
            ${isActiveFunctional && "active"}`}
            onClick={() => setActiveFunctional(true)}
          >
            Functional
          </button>
          <button
            className={`switch-section 
            ${!isActiveFunctional && "active"}`}
            onClick={() => setActiveFunctional(false)}
          >
            Class
          </button>
          <div
            className={`switch-active 
            ${!isActiveFunctional && "style-2"}`}
            style={
              isActiveFunctional
                ? { transform: "translateX(0%)" }
                : { transform: "translateX(100%)" }
            }
          ></div>
        </div>
      </div>
      {isActiveFunctional ? (
        <div className="style-1">
          <TodoFunctional></TodoFunctional>
        </div>
      ) : (
        <div className="style-2">
          <TodoClass></TodoClass>
        </div>
      )}
    </div>
  );
}

export default App;
