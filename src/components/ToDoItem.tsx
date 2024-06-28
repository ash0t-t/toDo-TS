import { ITodo, ActionTypes } from "../lib/types";
import { useContext } from "react";
import { TodoContext } from "../lib/context";
import { deleteToDo, updateToDo } from "../lib/api";

interface IProps {
  todo: ITodo;
}

export const ToDoItem: React.FC<IProps> = ({ todo }) => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Out of Provider...");
  }
  const { dispatch } = context;

  const handleDone = async () => {
    const updatedToDo = { ...todo, completed: !todo.completed };
    await updateToDo(todo.id, updatedToDo);
    dispatch({ type: ActionTypes.update, payload: updatedToDo });
  };
  const handleDelete = async () => {
    await deleteToDo(todo.id);
    dispatch({ type: ActionTypes.remove, payload: todo.id });
  };

  return (
    <div className={`item ${todo.completed ? "completed" : ""}`}>
      <p>{todo.text}</p>
      <div>
        <button onClick={handleDone}>Done</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
