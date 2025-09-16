import React, { createContext, useReducer, ReactNode } from "react";

type State = {
  favorites: string[];
};

type Action =
  | { type: "ADD_FAVORITE"; city: string }
  | { type: "REMOVE_FAVORITE"; city: string };

const initialState: State = { favorites: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.includes(action.city)) return state;
      return { ...state, favorites: [...state.favorites, action.city] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((c) => c !== action.city),
      };
    default:
      return state;
  }
}

export const WeatherContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
