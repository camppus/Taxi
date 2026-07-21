import { UseCase } from "src/shared/interfaces/UseCases";
import ServerMessageResponse from "src/shared/interfaces/ServerMessage";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/CreateUserDto";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { Role } from "../entities/User";

@Injectable()
export default class CreateUserUseCase implements UseCase<
  CreateUserDto & { role: Role },
  { id: string }
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateUserDto & { role: Role }): Promise<{ id: string }> {
    const {
      birthDate,
      fullName,
      gender,
      phone,
      emergencyPhone,
      photoUrl,
      selfieUrl,
      role,
    } = data;

    if (role === Role.ADMIN) {
      throw new Error("Nao pode se criar admin");
    }
    const hasAnUserWithPhone = await this.prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (hasAnUserWithPhone) {
      throw new Error("Telefone já foi registrado");
    }

    const id = crypto.randomUUID();
    await this.prisma.user.create({
      data: {
        id,
        birthDate,
        fullName,
        gender,
        phone,
        emergencyPhone,
        photoUrl,
        selfieUrl,
        status: role === Role.DRIVER ? "PENDING" : "ACTIVE",
        role: role,
      },
    });
    return {
      id,
    };
  }
}
