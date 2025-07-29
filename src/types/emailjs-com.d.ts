declare module 'emailjs-com' {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }
  
  export interface EmailJSSendParams {
    service_id: string;
    template_id: string;
    user_id: string;
    template_params?: Record<string, any>;
  }
  
  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, any>,
    userID: string
  ): Promise<EmailJSResponseStatus>;
  
  export function init(userID: string): void;
} 