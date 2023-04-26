export interface ApiSuccessResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

export interface IConfirmation<T> {
  title: string;
  content: string;
  icon: JSX.Element;
  data: T;
  onOk?: () => void;
  onCancel?: () => void;
}

export interface ApiFailedResponse {
  statusCode: number;
  error: string;
  message: string | string[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface User {
  uid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  hasAgreedWithTermsAndConditions?: boolean;
}
