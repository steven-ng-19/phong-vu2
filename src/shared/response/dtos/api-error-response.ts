export type ApiErrorResponse = {
  message: string;
  messageCode: string;
  error?: string;
  errors?: Record<string, unknown>;
  path?: string;
};
