import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "src/utils/reducer.utils";
import { USER_ACTION_TYPES, UserType } from "./user.types";

export type LogUserWithGoogleType = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserType
>;

export type UserActions = LogUserWithGoogleType;

export const setCurrentUser = withMatcher(
  (currentUser: UserType): LogUserWithGoogleType =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, currentUser)
);
