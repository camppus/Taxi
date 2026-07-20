import { UseCase } from "src/shared/interfaces/UseCases";
import ServerMessageResponse from "src/shared/interfaces/ServerMessage";
import type UserRepository from "src/modules/user/repositories/UserRepo";
import { Inject, Injectable } from "@nestjs/common";
import CreateUserDto from "../dto/CreateUserDto";
import { Role, UserStatus } from "src/modules/user/entities/User";

@Injectable()
export default class CreateUserUseCase implements UseCase<
  CreateUserDto,
  ServerMessageResponse
> {
  constructor(
    @Inject("UserRepository")
    private readonly repo: UserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<ServerMessageResponse> {
    const { name, password, phone, role, email } = data;

    if (email) {
      const hasAnUserWithEmail = await this.repo.findByEmail(email);

      if (hasAnUserWithEmail) {
        throw new Error("Email já foi registrado");
      }
    }

    const hasAnUserWithPhone = await this.repo.findByPhone(phone);

    if (hasAnUserWithPhone) {
      throw new Error("Telefone já foi registrado");
    }

    const id = crypto.randomUUID();

    await this.repo.save({
      name,
      password,
      phone,
      role: role === "CLIENT" ? Role.PASSENGER : Role.DRIVER,
      email: email,
      createdAt: new Date(),
      id,
      status: UserStatus.ACTIVE,
      updatedAt: new Date(),
    });

    return {
      message: "Usuário criado com sucesso",
      error: false,
    };
  }
}
