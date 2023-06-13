export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  RESET_INPUT_FIELD = "RESET_INPUT_FIELD",
}

export type UserType = {
  displayName: string;
  email: string;
  createAt: Date;
};
