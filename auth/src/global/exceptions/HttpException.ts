export class HttpException extends Error {
  status: string;
  isOperational: true;

  constructor(
    public statusCode: number = 500,
    public message: string = "Something went wrong"
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
