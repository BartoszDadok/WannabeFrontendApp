export interface CustomError {
  data: {
    message: string;
    errors: string[];
  };
  status: number;
}

export interface CreateUserResponse {
  verificationToken: string;
  message: string;
}

export interface CreateUserQuery {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResendTokenResponse {
  message: string;
}
export type ResendTokenQuery = string;

export interface LoginResponse {
  id: string;
  email: string;
  token: string;
  languages: string[];
}

export interface LoginQuery {
  email: string;
  password: string;
}

export interface ContactResponse {
  message: string;
}

export interface ContactQuery {
  name: string;
  email: string;
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ResetPasswordQuery {
  email: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

export type DeleteAccountQuery = string;
