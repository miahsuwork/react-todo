import { useState, useEffect } from "react";

const TodoItem = ({ todo, handleDeleteTodo, handleToggleIsDoneTodo }) => {
  const handleToggleClick = () => {
    handleToggleIsDoneTodo(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <div
      className={`todo__item ${todo.isDone ? "finish" : ""}`}
      data-todo-id={todo.id}
    >
      <div className="control">
        <input
          type="checkbox"
          name="finish"
          className="control__checkbox"
          checked={todo.isDone}
          onChange={handleToggleClick}
        />
        <div className="control__indicator"></div>
      </div>
      <div className="todo__content">
        <div className="todo__text">{todo.content}</div>
        <div className="todo__time">{todo.createTime}</div>
      </div>
      <button className="btn-delete" onClick={handleDeleteClick}></button>
    </div>
  );
};

const oldTodo = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

export default function TodoHook() {
  const [todoList, setTodo] = useState(oldTodo);
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

  const handleClearTodoList = () => {
    localStorage.removeItem("todoList");
    setTodo([]);
  };

  const handleAddTodo = () => {
    if (value === "") {
      setErrorMsg("請輸入 Todo");
      return;
    }

    setErrorMsg("");
    const id = todoList.length > 0 ? todoList[0].id + 1 : 1;
    setTodo([
      {
        id,
        content: value,
        createTime:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        isDone: false,
      },
      ...todoList,
    ]);
    setValue("");
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    setTodo(todoList.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDoneTodo = (id) => {
    setTodo(
      todoList.map((todo) => {
        return {
          ...todo,
          isDone: todo.id === id ? !todo.isDone : todo.isDone,
        };
      })
    );
  };

  return (
    <div className="todo">
      <div className="title">
        <h1>Todo List</h1>
        {todoList.length > 0 ? (
          <button className="btn-clear" onClick={handleClearTodoList}>
            Clear List
          </button>
        ) : null}
      </div>
      <div className="todo__body">
        <div className="input-group">
          <input
            className={`input-group__input add-todo 
                ${errorMsg ? "error" : ""}`}
            type="text"
            placeholder="What do you need to do?"
            value={value}
            onChange={handleInputChange}
          />
          <button className="btn-add" onClick={handleAddTodo}>
            Add
          </button>
          <div className="error__label">{errorMsg}</div>
        </div>
        <div className="todo__list">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleIsDoneTodo={handleToggleIsDoneTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
