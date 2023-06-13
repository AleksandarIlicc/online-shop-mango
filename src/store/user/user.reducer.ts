import { AnyAction } from "redux";
import { UserType } from "./user.types";
import { setCurrentUser } from "./user.action";

export type UserInitialStateType = {
  readonly currentUser: UserType | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE: UserInitialStateType = {
  currentUser: null,
  isLoading: true,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: AnyAction
): UserInitialStateType => {
  if (setCurrentUser.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  return state;
};
