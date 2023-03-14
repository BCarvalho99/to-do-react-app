import React, { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import Todo from "./components/Todo";
import { database } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen  p-4 bg-gradient-to-r from-[#004f10] to-[#1b7c1e]`,
  container: `bg-slate-100 max-w-[800px] w-full m-auto  rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 sm:mt-0 bg-[#00ba5d] text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [ínput, setInput] = useState("");
  // Create To-Do
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (ínput === "") {
      alert("Enter a valid to-do (:");
      return;
    }
    await addDoc(collection(database, "toDos"), {
      text: ínput,
      completed: false,
    });
    setInput("");
  };
  // Read To-Dofrom firebase
  useEffect(() => {
    const q = query(collection(database, "toDos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  // Update To-do from firebase
  const toggleCompleted = async (todo) => {
    await updateDoc(doc(database, "toDos", todo.id), {
      completed: !todo.completed,
    });
  };
  // Delete to-do
  const deleteTodo = async (id) => {
    await deleteDoc(doc(database, "toDos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            type="text"
            placeholder="Add Todo"
            className={style.input}
            value={ínput}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={style.button}>
            <HiOutlinePlusSm size={30} />
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => {
            return (
              <Todo
                key={index}
                todo={todo}
                toggleCompleted={toggleCompleted}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>

        {todos.length < 1 ? null : (
          <p className="style.count">{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
