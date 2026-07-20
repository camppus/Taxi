import { UseCase } from "src/shared/interfaces/UseCases";
import type UserRepository from "src/modules/user/repositories/UserRepo";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/User";

@Injectable()
export default class FindUserByIdUseCase implements UseCase<string, User> {
  constructor(
    @Inject("UserRepository")
    private readonly repo: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
