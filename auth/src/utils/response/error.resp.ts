import { ZodIssue } from "zod";

export type TErrorResponse = {
  errorType: TErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: TErrorValidation[] | null;
  stack?: string;
};

export type TErrorType = "General" | "Raw" | "Validation" | "Unauthorized";

export type TErrorValidation = ZodIssue;

export class HttpException extends Error {
  private httpStatusCode: number;
  private errorType: TErrorType;
  private errors: string[] | null;
  private errorRaw: any;
  private errorsValidation: TErrorValidation[] | null;

  constructor(
    httpStatusCode: number,
    errorType: TErrorType,
    message: string,
    errors: string[] | null = null,
    errorRaw: any = null,
    errorsValidation: TErrorValidation[] | null = null
  ) {
    super(message);

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
    this.errors = errors;
    this.errorRaw = errorRaw;
    this.errorsValidation = errorsValidation;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): TErrorResponse {
    return {
      errorType: this.errorType,
      errorMessage: this.message,
      errors: this.errors,
      errorRaw: this.errorRaw,
      errorsValidation: this.errorsValidation,
      stack: this.stack,
    };
  }
}
