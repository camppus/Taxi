export default interface EncriptProvider {
  encript(data: string): Promise<string>;
  decript(data: string): Promise<string>;
}
