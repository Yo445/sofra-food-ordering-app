export class ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;

  constructor(data?: T, message?: string) {
    this.success = true;
    if (data) this.data = data;
    if (message) this.message = message;
  }

  static success<T>(data?: T, message?: string) {
    return new ApiResponse(data, message);
  }
}
