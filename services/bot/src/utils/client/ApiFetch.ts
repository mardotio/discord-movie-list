import fetch, { RequestInit, Response } from 'node-fetch';
import { ApiConfig } from './ApiConfig';

export interface ApiError {
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

export class ApiFetch {
  static async generateError(
    response: Response,
    asText = false,
  ): Promise<ApiError> {
    return {
      status: response.status,
      statusText: response.statusText,
      body: asText ? await response.text() : await response.json(),
    };
  }

  static getEndpoint(route: string) {
    if (ApiConfig.baseEndpoint) {
      return `${ApiConfig.baseEndpoint}${route}`;
    }
    return route;
  }

  static async fetch<Res, Body extends {} | undefined = undefined>(
    route: string,
    method: RequestInit['method'],
    body?: Body,
  ) {
    const response = await fetch(this.getEndpoint(route), {
      method,
      headers: {
        ...(ApiConfig.headers || {}),
        'content-type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorResponse = await this.generateError(
        response,
        !response.headers.get('content-type')?.includes('application/json'),
      );
      return errorResponse;
    }

    if (response.status === 204) {
      return undefined as unknown as Res;
    }

    const bodyResponse: Res = await response.json();
    return bodyResponse;
  }
}
