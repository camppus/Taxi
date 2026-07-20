import { UseCase } from "src/shared/interfaces/UseCases";
import ServerMessageResponse from "src/shared/interfaces/ServerMessage";
import type UserRepository from "src/modules/user/repositories/UserRepo";
import { Inject, Injectable } from "@nestjs/common";
import { UserStatus } from "src/modules/user/entities/User";

@Injectable()
export default class ToggleUserStatusUseCase implements UseCase<
  string,
  ServerMessageResponse
> {
  constructor(
    @Inject("UserRepository")
    private readonly repo: UserRepository,
  ) {}

  async execute(id: string): Promise<ServerMessageResponse> {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.repo.save({
      ...user,
      status:
        user.status === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : user.status === UserStatus.INACTIVE
            ? UserStatus.ACTIVE
            : user.status,
    });

    return {
      message: "Status do usuário alterado com sucesso",
      error: false,
    };
  }
}
