import { Component } from "react";

class TodoItem extends Component {
  handleToggleClick = () => {
    const { todo, handleToggleIsDoneTodo } = this.props;
    handleToggleIsDoneTodo(todo.id);
  };

  handleDeleteClick = () => {
    const { todo, handleDeleteTodo } = this.props;
    handleDeleteTodo(todo.id);
  };

  render() {
    const { todo } = this.props;
    return (
      <div
        className={`todo__item ${todo.isDone && "finish"}`}
        data-todo-id={todo.id}
      >
        <div className="control">
          <input
            type="checkbox"
            name="finish"
            className="control__checkbox"
            checked={todo.isDone}
            onChange={this.handleToggleClick}
          />
          <div className="control__indicator"></div>
        </div>
        <div className="todo__content">
          <div className="todo__text">{todo.content}</div>
          <div className="todo__time">{todo.createTime}</div>
        </div>
        <button
          className="btn-delete"
          onClick={this.handleDeleteClick}
        ></button>
      </div>
    );
  }
}

export default class TodoClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: localStorage.getItem("todoList")
        ? JSON.parse(localStorage.getItem("todoList"))
        : [],
      value: "",
      errorMsg: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.todoList !== prevState.todoList) {
      localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
    }
  }

  handleClearTodoList = () => {
    localStorage.removeItem("todoList");
    this.setState({ todoList: [] });
  };

  handleAddTodo = () => {
    const { value, todoList } = this.state;
    if (value === "") {
      this.setState({ errorMsg: "請輸入 Todo" });
      return;
    }

    const id = todoList.length > 0 ? todoList[0].id + 1 : 1;
    this.setState({
      errorMsg: "",
      todoList: [
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
      ],
      value: "",
    });
  };

  handleInputChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleDeleteTodo = (id) => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter((todo) => todo.id !== id),
    });
  };

  handleToggleIsDoneTodo = (id) => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.map((todo) => {
        return {
          ...todo,
          isDone: todo.id === id ? !todo.isDone : todo.isDone,
        };
      }),
    });
  };

  render() {
    const { todoList, errorMsg, value } = this.state;
    return (
      <div className="todo">
        <div className="title">
          <h1>Todo List</h1>
          {todoList.length > 0 && (
            <button className="btn-clear" onClick={this.handleClearTodoList}>
              Clear List
            </button>
          )}
        </div>
        <div className="todo__body">
          <div className="input-group">
            <input
              className={`input-group__input add-todo 
                ${errorMsg && "error"}`}
              type="text"
              placeholder="What do you need to do?"
              value={value}
              onChange={this.handleInputChange}
            />
            <button className="btn-add" onClick={this.handleAddTodo}>
              Add
            </button>
            <div className="error__label">{errorMsg}</div>
          </div>
          <div className="todo__list">
            {todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleDeleteTodo={this.handleDeleteTodo}
                handleToggleIsDoneTodo={this.handleToggleIsDoneTodo}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
