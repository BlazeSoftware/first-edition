export interface AlertMessage {
  type?: string;
  message?: any;
  action?: {
    url: string;
    text: string;
  };
}
