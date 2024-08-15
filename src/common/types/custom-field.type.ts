export type EntityNotInFilter<T> = {
  [K in keyof T]?: T[K][];
};

// // Make nullable or undefined object properties to optional
type PickNullable<T> = {
  [K in keyof T as null extends T[K] ? K : never]: T[K];
};
type PickUndefined<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};

export type OptionalNullableFields<T> = {
  [K in keyof PickNullable<T> | keyof PickUndefined<T>]?: T[K];
} & {
  [K in Exclude<keyof T, keyof (PickNullable<T> & PickUndefined<T>)>]: T[K];
};
