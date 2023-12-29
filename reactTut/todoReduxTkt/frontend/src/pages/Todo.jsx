import { useSelector } from "react-redux";
import "../App.css";
import AddTodo from "../components/addTodo";
import Todos from "../components/Todos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const userReduxState = useSelector((state) => state.user.users);
  const userInfo = userReduxState
    ? userReduxState
    : JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // console.log(todos)
    if (!userInfo) {
      navigate("/login");
    }

   if(todos.length === 0) {
    axios
    .post("http://localhost:8000/api/todos", null, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    .then((response) => {
      // Handle the response
      console.log(response.data);
      setTodos(response.data);
    })
    .catch((error) => {
      // Handle the error
      throw new `Error: ${error}`();
    })
    .finally(() => {
      setLoading(false);
    });
  } else {
    setTodos(todos);
  }
  setLoading(false);
  }, [todos]);

  return (
    <>
      <AddTodo />
      <h2 className="text-white py-1 my-3 text-3xl">Todos</h2>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        todos.map((todo) => <Todos key={todo.id} todo={todo} />)
      )}
    </>
  );
}

export default Todo;
