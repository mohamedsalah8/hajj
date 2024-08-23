// import * as React from "react";

import { createContext, useContext, useReducer } from "react";
const SBSContext = createContext(undefined);
const SBSDispatchContext = createContext(undefined);
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
  isAuth: localStorage.getItem("isAuth") ?? false,
  token: localStorage.getItem("token") ?? null,
  userInfo: userInfo ?? null,
};


export default function sbsReducer(state, action) {

  switch (action.type) {

    case "setLoading":
      return { ...state, loading: action.payload };

    case "setError":
      return {
        ...state,
        isError: action.payload,
        ErrorMassage: { ...action.message },
      };

    case "login":
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", action.token);
      localStorage.setItem("userInfo", JSON.stringify(action.userInfo));

      return {
        ...state,
        isAuth: action.isAuth,
        token: action.token,
        userInfo: action.userInfo,
      };

    case "logout":
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");

      return {
        ...state,
        isAuth: false,
        token: null,
        userInfo: null,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useSBSState() {
  const context = useContext(SBSContext);
  if (context === undefined) {
    throw new Error("useSBSState must be used within a SBSProvider");
  }
  return context;
}

function useSBSDispatch() {
  const context = useContext(SBSDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSBSState must be used within a SBSProvider"
    );
  }
  return context;
}

function SBSProvider({ children }) {
  const [state, dispatch] = useReducer(sbsReducer, initialState);
  return (
    <SBSContext.Provider value={state}>
      <SBSDispatchContext.Provider value={dispatch}>
        {children}
      </SBSDispatchContext.Provider>
    </SBSContext.Provider>
  );
}

export { SBSProvider, useSBSState, useSBSDispatch };
