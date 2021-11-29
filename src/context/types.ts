export enum ACTIONS {
    SET_PAST_SEARCH,
    SHOW_DRAWER,
    REMOVE_PAST_SEARCH,
    CLEAR,
  }

export type Action =
    | { type: ACTIONS.SET_PAST_SEARCH; payload: SavedItems[] }
    | {
        type: ACTIONS.REMOVE_PAST_SEARCH;
        payload: string
      }
    | { type: ACTIONS.SHOW_DRAWER; payload: boolean }
    | { type: ACTIONS.CLEAR };

export interface SavedItems {
        date: string;
        source: {
          code: string;
          text: string;
        };
        target: {
          code: string;
          text: string;
        };
      }

export interface AppState {
        searches: SavedItems[];
        showDrawer?: boolean;
      }
