import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";
import ServerMessageResponse from "src/shared/interfaces/ServerMessage";
import { CreateDriverDto } from "../dto/CreateDriverDto";
import { Role } from "src/modules/user/entities/User";
import CreateUserUseCase from "src/modules/user/usecases/CreateUserUseCase";
import { RequestOtpUseCase } from "src/modules/auth/usecases/RequestOtpUseCase";

@Injectable()
export default class CreateDriverUseCase implements UseCase<
  CreateDriverDto,
  ServerMessageResponse
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly requestOtpUseCase: RequestOtpUseCase,
  ) {}

  async execute(data: CreateDriverDto): Promise<ServerMessageResponse> {
    const { user, driver } = data;
    if (driver.identityNumber) {
      const existsIdentity = await this.prisma.driverProfile.findFirst({
        where: {
          identityNumber: driver.identityNumber,
        },
      });

      if (existsIdentity) {
        throw new Error("Documento de identificação já registrado");
      }
    }

    if (driver.licenseNumber) {
      const existsLicense = await this.prisma.driverProfile.findFirst({
        where: {
          licenseNumber: driver.licenseNumber,
        },
      });

      if (existsLicense) {
        throw new Error("Carta de condução já registrada");
      }
    }

    const userResponse = await this.createUserUseCase.execute({
      ...user,
      role: Role.DRIVER,
    });
    if (!userResponse.id) {
      throw new Error("Erro ao criar motorista");
    }

    await this.prisma.driverProfile.create({
      data: {
        userId: userResponse.id,
        identityNumber: driver.identityNumber,
        licenseNumber: driver.licenseNumber,
        licenseCategory: driver.licenseCategory,
        licenseExpiry: driver.licenseExpiry
          ? new Date(driver.licenseExpiry)
          : null,
        requestStatus: "PENDING",
      },
    });

    await this.requestOtpUseCase.execute({
      phone: user.phone,
    });
    return {
      message: "Cadastro de motorista realizado. Código OTP enviado.",
      error: false,
    };
  }
}
