const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://general-serve.vercel.app";

export interface ApiError extends Error {
  statusCode?: number;
  errors?: Record<string, string[]>;
}

function getClientAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

interface BaseApiClientOptions extends Omit<RequestInit, "body"> {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options?: BaseApiClientOptions & {
    body?: Record<string, unknown>;
    isFormData?: false;
  }
): Promise<T>;

export async function apiClient<T>(
  endpoint: string,
  options: BaseApiClientOptions & {
    body: FormData;
    isFormData: true;
  }
): Promise<T>;

export async function apiClient<T>(
  endpoint: string,
  {
    token,
    isFormData = false,
    headers,
    body,
    ...customConfig
  }: BaseApiClientOptions & {
    body?: Record<string, unknown> | FormData;
    isFormData?: boolean;
  } = {}
): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const authToken = token || getClientAuthToken();

  const config: RequestInit = {
    method: customConfig.method || "GET",
    ...customConfig,
    headers: {
      ...headers,
    },
  };

  if (authToken) {
    (
      config.headers as Record<string, string>
    ).Authorization = `Bearer ${authToken}`;
  }

  if (body) {
    if (isFormData) {
      config.body = body as FormData;
    } else {
      (config.headers as Record<string, string>)["Content-Type"] =
        "application/json";
      config.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: response.statusText || "Terjadi kesalahan tak terduga.",
      };
    }

    const error = new Error(
      (errorData as ApiError).message || "Terjadi kesalahan"
    ) as ApiError;
    error.statusCode = response.status;
    error.errors = (errorData as ApiError).errors;
    throw error;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}
