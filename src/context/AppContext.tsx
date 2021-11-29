import React, {
  FC, useContext, createContext, useReducer, useEffect,
} from 'react';

import {
  Action, ACTIONS, AppState, SavedItems,
} from './types';

const initialValues = {
  searches: [],
  showDrawer: false,
};

type AppDispatch = (action: Action) => void;

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ACTIONS.SET_PAST_SEARCH:
      return { ...state, searches: action.payload };
    case ACTIONS.SHOW_DRAWER:
      return { ...state, showDrawer: action.payload };
    case ACTIONS.CLEAR:
      return initialValues;
    default:
      return state;
  }
};

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialValues);

  useEffect(() => {
    if (state.searches.length) {
      localStorage.setItem('pastSearches', JSON.stringify(state.searches));
    }
  }, [state.searches]);

  useEffect(() => {
    const pastSearches = localStorage.getItem('pastSearches');
    if (pastSearches?.length) {
      dispatch({ type: ACTIONS.SET_PAST_SEARCH, payload: JSON.parse(pastSearches) });
    }
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
};

export const useSetPastSearch = (): ((payload: SavedItems[]) => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useSetPastSearch must be used within a AppProvider');
  }
  return (payload: SavedItems[]) => dispatch({ type: ACTIONS.SET_PAST_SEARCH, payload });
};

export const useRemovePastSearch = (): ((payload: number) => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useRemovePastSearch must be used within a AppProvider');
  }
  return (payload: number) => dispatch({ type: ACTIONS.REMOVE_PAST_SEARCH, payload });
};

export const useSetShowDrawer = (): ((payload: boolean) => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useSetShowDrawer must be used within a AppProvider');
  }
  return (payload: boolean) => dispatch({ type: ACTIONS.SHOW_DRAWER, payload });
};

export const useClearDispatch = (): (() => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useClearDispatch must be used within a AppProvider');
  }
  return () => dispatch({ type: ACTIONS.CLEAR });
};

export default AppProvider;
