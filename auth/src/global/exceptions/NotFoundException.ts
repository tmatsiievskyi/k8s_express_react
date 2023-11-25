import { HttpException } from "../../utils/response/error.resp";

export class NotFoundException extends HttpException {
  constructor(message = "Not found", errors: string[] | null = null) {
    super(404, "General", message, errors);
  }
}
