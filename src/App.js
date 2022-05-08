import "./App.css";
import "./style.scss";
import TodoClass from "./TodoClass";
import TodoHook from "./TodoHook";
import { useState } from "react";

const Todo = ({ isActiveHook }) => {
  if (isActiveHook) {
    return (
      <div className="style-1">
        <TodoHook />
      </div>
    );
  }
  return (
    <div className="style-2">
      <TodoClass></TodoClass>
    </div>
  );
};

function App() {
  const [isActiveHook, setActiveHook] = useState("false");

  return (
    <div>
      <div>
        <div className="cus-switch">
          <button
            className={`switch-section ${isActiveHook ? "active" : null}`}
            onClick={() => setActiveHook(true)}
          >
            Hook
          </button>
          <button
            className={`switch-section ${isActiveHook ? null : "active"}`}
            onClick={() => setActiveHook(false)}
          >
            Class
          </button>
          <div
            className={`switch-active ${isActiveHook ? null : "style-2"}`}
            style={
              isActiveHook
                ? { transform: "translateX(0%)" }
                : { transform: "translateX(100%)" }
            }
          ></div>
        </div>
      </div>
      <Todo isActiveHook={isActiveHook}></Todo>
    </div>
  );
}

export default App;
