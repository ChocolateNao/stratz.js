export interface HttpExceptionBody {
  isError: boolean;
  status: number;
  message?: string;
  description?: string;
}

export class HttpException extends Error {
  public readonly status?: number;
  public readonly message: string = 'Unhandled exception';
  public readonly description?: string;

  constructor(statusCode: number, msg?: string, description?: string) {
    super();
    this.status = statusCode;
    if (msg) this.message = msg;
    this.description = description;

    this.initBody();
  }

  public initBody(): HttpExceptionBody {
    return {
      isError: true,
      status: this.status ?? 500,
      message: this.message,
      description: this?.description,
    };
  }
}
