import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../feature/todo/todoSlice";
import { useState } from "react";

function Todos( todo ) {
  
  // The useSelector hook returns the selected data, and automatically re-renders the component when the selected data changes.
  
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState("");
  const dispatch = useDispatch();
  return (
    <>
        <div
          className={`text-white flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300   mb-3
          }`}
        >
          <input
            type="text"
            className={`border text-white outline-none w-full bg-transparent rounded-lg ${
              isTodoEditable ? "border-gray-500/10 px-2" : "border-transparent"
            }`}
            value={(isTodoEditable ? todoMsg : todo.text)}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
              if (isTodoEditable) {
                dispatch(updateTodo({ id: todo.id, text: todoMsg }));
                setTodoMsg("");
                setIsTodoEditable((prev) => !prev);
              } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.isCompleted}
          >
            {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => dispatch(removeTodo(todo.id))}
          >
            ❌
          </button>
        </div>
    </>
  );
}

export default Todos;
