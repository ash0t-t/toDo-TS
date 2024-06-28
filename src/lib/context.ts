import React from "react";
import type { IContextType } from "./types";

export const TodoContext = React.createContext<IContextType | undefined>(
  undefined
);
