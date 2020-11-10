import React, { useReducer, createContext } from "react"
import { SET_CATEGORY } from "./action"

interface State {
  category: undefined | string
}

const initialState: State = {
  category: undefined,
}

function reducer(state: State, action: any) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.value,
      }
    default:
      throw new Error("Undefined action type.")
  }
}

const GlobalStateContext = createContext<any>(undefined)
const GlobalDispatchContext = createContext<any>(undefined)

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export { GlobalContextProvider, GlobalStateContext, GlobalDispatchContext }
