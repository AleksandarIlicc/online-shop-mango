import { AnyAction } from "redux";

type Matchable<CA extends () => AnyAction> = CA & {
  type: ReturnType<CA>["type"];
  match(action: AnyAction): action is ReturnType<CA>;
};

export function withMatcher<CA extends () => AnyAction & { type: string }>(
  createAction: CA
): Matchable<CA>;

export function withMatcher<
  CA extends (...arg: any[]) => AnyAction & { type: string }
>(createAction: CA): Matchable<CA>;

export function withMatcher(createAction: Function) {
  const type = createAction().type;
  return Object.assign(createAction, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
