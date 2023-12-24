import { useSelector } from "react-redux";
import "../App.css";
import AddTodo from "../components/addTodo";
import Todos from "../components/Todos";

function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log(todos)
  return (
    <>
      <AddTodo />
      <h2 className="text-white py-1 my-3 text-3xl">Todos</h2> 
      {todos.map((todo) => (
        <Todos key={todo.id} todo={todo} />
      ))}
    </>
  );
}

export default Todo;
