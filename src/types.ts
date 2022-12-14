export interface Response {
  success?: boolean;
  message?: string;
  hostname?: string;
  time?: number;
}

export interface Error {
  success?: boolean;
  message?: string;
}
