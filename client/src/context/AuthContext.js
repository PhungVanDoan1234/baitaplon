import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
const INITTIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITTIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITTIAL_STATE);
  const [currentUserChart, setcurrentUserChart] = useState([]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        currentUserChart,
        setcurrentUserChart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
