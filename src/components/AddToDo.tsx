import { useContext, useState } from "react";
import { addToDo } from "../lib/api";
import { TodoContext } from "../lib/context";
import { ActionTypes } from "../lib/types";

export const AddToDo: React.FC = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Out of Provider...");
  }
  const { dispatch } = context;
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) {
      return setError("Please fill the field");
    }
    setError("");

    const data = await addToDo({ text, completed: false });
    setText("");

    dispatch({ type: ActionTypes.add, payload: data });
  };
  return (
    <div>
      <form onSubmit={handleSumbit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Save</button>
      </form>
    </div>
  );
};
