export type EntityWithoutFields<T, K extends keyof T> = Omit<T, K>;

export type EntityNotInFilter<T> = {
  [key in keyof T]?: T[key][];
};

export type OptionalNullAbleFields<T> = {
  [key in keyof T]?: T[key] | null;
};
