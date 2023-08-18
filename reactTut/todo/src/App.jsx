import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    setTodoList([...todoList, { todoName: todo }]);
    setTodo("");
  };

  const deleteTodo = (deleteValue) => {
    const restTodoList = [
      ...todoList.filter((val) => {
        return val.todoName !== deleteValue;
      }),
    ];
    setTodoList(restTodoList);
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex items-center">
      <div className="w-[500px] mx-auto text-center bg-white p-5">
        <h1 className="text-5xl text-blue-700 font-bold mb-8">Todo List</h1>
        <form >
          <input
            className="border-2 transition-all duration-800 border-blue-500 outline-2 outline-blue-600 hover:border-none placeholder:text-gray-500 rounded-lg hover:outline-offset-8  w-full p-5 mb-5 text-black"
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleForm}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg mb-8"
          >
            Add Todo
          </button>
        </form>
        <div className="todo-show-area">
          <ul>
            {todoList.map((singleTodo, index) => {
              return (
                <li
                  key={index}
                  className="bg-black mb-5 flex justify-between  text-white py-5 rounded-lg text-3xl px-5"
                >
                  {singleTodo.todoName}{" "}
                  <span
                    onClick={() => deleteTodo(singleTodo.todoName)}
                    className="text-red-600 cursor-pointer cursor-pointer"
                  >
                    x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;