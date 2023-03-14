import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liCompleted: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textCompleted: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

function Todo({ todo, toggleCompleted, deleteTodo }) {
  return (
    <li className={todo.completed ? style.liCompleted : style.li}>
      <div className={style.row}>
        <input
          onChange={() => {
            toggleCompleted(todo);
          }}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => {
            toggleCompleted(todo);
          }}
          className={todo.completed ? style.textCompleted : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaTrashAlt />}</button>
    </li>
  );
}

export default Todo;