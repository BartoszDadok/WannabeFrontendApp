export interface ApiErrorResponse {
  data: {
    message: string;
    errors: string[];
  };
  status: number;
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    "data" in error &&
    typeof (error as any).status === "number"
  );
}
