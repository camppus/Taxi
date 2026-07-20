import { UseCase } from "src/shared/interfaces/UseCases";
import ServerMessageResponse from "src/shared/interfaces/ServerMessage";
import type UserRepository from "src/modules/user/repositories/UserRepo";
import { Inject, Injectable } from "@nestjs/common";
import CreateUserDto from "../dto/CreateUserDto";

@Injectable()
export default class UpdateUserUseCase implements UseCase<
  CreateUserDto & { id: string },
  ServerMessageResponse
> {
  constructor(
    @Inject("UserRepository")
    private readonly repo: UserRepository,
  ) {}

  async execute(
    data: CreateUserDto & { id: string },
  ): Promise<ServerMessageResponse> {
    const user = await this.repo.findById(data.id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (data.email && data.email !== user.email) {
      const hasAnUserWithEmail = await this.repo.findByEmail(data.email);

      if (hasAnUserWithEmail) {
        throw new Error("Email já foi registrado");
      }
    }

    if (data.phone && data.phone !== user.phone) {
      const hasAnUserWithPhone = await this.repo.findByPhone(data.phone);

      if (hasAnUserWithPhone) {
        throw new Error("Telefone já foi registrado");
      }
    }
    const { id, name, email, phone } = data;
    await this.repo.save({
      name,
      password: user.password,
      phone,
      role: user.role,
      email: email,
      createdAt: new Date(),
      id,
      status: user.status,
      updatedAt: new Date(),
    });

    return {
      message: "Usuário atualizado com sucesso",
      error: false,
    };
  }
}
