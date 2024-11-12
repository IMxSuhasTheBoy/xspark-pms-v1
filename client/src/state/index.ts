import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: true,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// action creators used to create actions that can be dispatched to the Redux store to update the state.
export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;

/*
In Redux Toolkit, reducer methods are functions that define how the state of your application changes in response to actions. Here's a brief overview of how they work:

1. State Management: Reducers take the current state and an action as arguments and return a new state. They are pure functions, meaning they do not mutate the existing state but instead create a new state object.

2. Action Payload: Actions are dispatched to the store, and they can carry a payload (data) that the reducer can use to update the state. In your example, `setIsSidebarCollapsed` and `setIsDarkMode` reducers use the `action.payload` to update the respective state properties.

3. Immer Library: Redux Toolkit uses the Immer library under the hood, which allows you to write "mutative" code (like `state.isSidebarCollapsed = action.payload`) while actually keeping the state immutable. Immer tracks changes and produces a new state based on the modifications.

4. Slice Creation: The `createSlice` function combines the action creators and reducers into a single slice of the state, making it easier to manage related state and actions together.

Reducer methods in Redux Toolkit simplify state management by allowing you to define how state changes in response to actions while ensuring immutability through Immer.
*/

/* 
  import { setIsSidebarCollapsed, setIsDarkMode } from 'client/src/state/index';
  import globalReducer from 'client/src/state/index';
*/

/* 
  Action Creators: You can dispatch the actions using dispatch(setIsSidebarCollapsed(true));
  or dispatch(setIsDarkMode(false));.
*/
