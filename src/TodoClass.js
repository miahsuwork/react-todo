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
        className={`todo__item ${todo.isDone ? "finish" : ""}`}
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

  componentDidUpdate() {
    localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
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
    this.setState({
      todoList: this.state.todoList.filter((todo) => todo.id !== id),
    });

    this.setTodoListToLocal();
  };

  handleToggleIsDoneTodo = (id) => {
    this.setState({
      todoList: this.state.todoList.map((todo) => {
        return {
          ...todo,
          isDone: todo.id === id ? !todo.isDone : todo.isDone,
        };
      }),
    });

    this.setTodoListToLocal();
  };

  render() {
    return (
      <div className="todo">
        <div className="title">
          <h1>Todo List</h1>
          {this.state.todoList.length > 0 ? (
            <button className="btn-clear" onClick={this.handleClearTodoList}>
              Clear List
            </button>
          ) : null}
        </div>
        <div className="todo__body">
          <div className="input-group">
            <input
              className={`input-group__input add-todo 
                ${this.state.errorMsg ? "error" : ""}`}
              type="text"
              placeholder="What do you need to do?"
              value={this.state.value}
              onChange={this.handleInputChange}
            />
            <button className="btn-add" onClick={this.handleAddTodo}>
              Add
            </button>
            <div className="error__label">{this.state.errorMsg}</div>
          </div>
          <div className="todo__list">
            {this.state.todoList.map((todo) => (
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
