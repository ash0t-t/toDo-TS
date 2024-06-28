import { useEffect, useReducer } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";
import { reducer } from "./lib/reducer";
import { initialState } from "./lib/initialState";
import { TodoContext } from "./lib/context";
import { getAllTodos } from "./lib/api";
import { ActionTypes } from "./lib/types";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getAllTodos().then((response) => {
      dispatch({ type: ActionTypes.put, payload: response });
    });
  }, []);

  return (
    <>
      <TodoContext.Provider value={{ state, dispatch }}>
        <ToDoList />
      </TodoContext.Provider>
    </>
  );
}

export default App;
