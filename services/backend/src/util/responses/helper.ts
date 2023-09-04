import { Response } from 'express';
import { SafeParseReturnType } from 'zod';

export const errorResponse = (res: Response, errors: string[], code = 500) => {
  res
    .status(code)
    .json({ errors: errors.map((e) => ({ message: e })) });
}

export const conversionResponse = <ExpectedResponse>({
  data,
  res,
  successCode = 200,
  errorCode = 500,
}: {
  data: ExpectedResponse | (ExpectedResponse | null)[] | null;
  res: Response;
  successCode?: number;
  errorCode?: number;
}) => {
  if (data === null) {
    return errorResponse(res, ['Encountered an error while generating response'], errorCode);
  }

  if (Array.isArray(data) && data.some((d) => d === null)) {
    return errorResponse(res, ['Encountered an error while generating response'], errorCode);
  }

  return res.status(successCode).json(successCode);
};

export const sendResponse = <Input, Output>(
  {
    res,
    data,
    errorCode = 500,
    successCode = 200,
  }: {
    res: Response,
    data: SafeParseReturnType<Input, Output>,
    errorCode?: number
    successCode?: number
}) => {
  if (!data.success) {
    return res.status(errorCode).json(data.error);
  }

  return res.status(successCode).json(data.data);
};
