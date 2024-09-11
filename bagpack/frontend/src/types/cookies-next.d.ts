declare module "cookies-next" {
  export function setCookie(key: string, value: string, options?: any): void;
  export function getCookie(key: string): string | null;
  export function deleteCookie(key: string): void;
}
