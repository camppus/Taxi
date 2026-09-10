export interface UseCase<Input> {
  handle(data: Input): Promise<ServerMessage>;
}

export interface ServerMessage {
  status: number;
  message: string;
  data: any;
}
