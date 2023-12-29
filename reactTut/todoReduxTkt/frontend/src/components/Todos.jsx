import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../feature/todo/todoSlice";
import { useState } from "react";
import axios from "axios";

function Todos( {todo} ) {
  
  // The useSelector hook returns the selected data, and automatically re-renders the component when the selected data changes.
  
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState("");
  const dispatch = useDispatch();
  const userReduxState = useSelector((state) => state.user.users);
  const userInfo = userReduxState
    ? userReduxState
    : JSON.parse(localStorage.getItem("userInfo"));

  const update = async () => {
    if (isTodoEditable && todo) {
      
        await axios.put(
          `http://localhost:8000/api/todos/${todo.id}`,
          {
            title: todoMsg,
            completed: todo.completed,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        ).then(res => {
          console.log(res.data);
          dispatch(updateTodo(res.data));
          setTodoMsg("");
          setIsTodoEditable((prev) => !prev);
        })
        .catch(err => {
          throw new `Update error: ${err}`;
        })
        .finally(
          () => {
            setTodoMsg("");
            setIsTodoEditable((prev) => !prev);
          }
        )
      }
      else {setIsTodoEditable((prev) => !prev);}
    }
    const remove = async () => {
      if (todo) {
        await axios.delete(
          `http://localhost:8000/api/todos/${todo.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        ).then(res => {
          console.log(res.data);
          dispatch(removeTodo(res.data));
        })
        .catch(err => {
          throw new `Delete error: ${err}`;
        })
        .finally(
          () => {
            setTodoMsg("");
            setIsTodoEditable((prev) => !prev);
          }
        )
      }
    }
  return (
    <>
        <div
          className={`text-white flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 mt-3  mb-3
          }`}
        >
          <input
            type="text"
            className={`border text-white outline-none w-full bg-transparent rounded-lg ${
              isTodoEditable ? "border-gray-500/10 px-2" : "border-transparent"
            }`}
            value={(isTodoEditable ? todoMsg : todo.title)}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={update}
          >
            {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={remove}
          >
            ❌
          </button>
        </div>
    </>
  );
}

export default Todos;
