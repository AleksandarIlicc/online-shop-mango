import { createSelector } from "reselect";
import { UserInitialStateType } from "./user.reducer";
import { RootState } from "../store";

export const userReducerSelector = (state: RootState): UserInitialStateType =>
  state.user;

export const currentUserSelect = createSelector(
  [userReducerSelector],
  (userSlice) => userSlice.currentUser
);
