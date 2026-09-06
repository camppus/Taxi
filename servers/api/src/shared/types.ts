export interface UseCase<Input, Output> {
  handle(data: Input): Promise<Output>;
}

export interface ServerMessage {
  status: number;
  message: string;
  data: any;
}
