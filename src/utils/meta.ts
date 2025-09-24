export const Meta = {
  initial: "initial",
  loading: "loading",
  error: "error",
  success: "success",
};

export type Meta = (typeof Meta)[keyof typeof Meta];
