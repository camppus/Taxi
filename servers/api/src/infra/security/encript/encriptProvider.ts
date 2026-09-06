export interface EncriptProvider {
  hash(plainText: string): string;
  macth(data: { hash: string; plainText: string }): boolean;
}
