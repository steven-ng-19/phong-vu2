export class ApiErrorResponse {
  error?: string;
  errors?: Record<string, unknown>;
  path?: string;
  message: string;
  messageCode: string;
}
