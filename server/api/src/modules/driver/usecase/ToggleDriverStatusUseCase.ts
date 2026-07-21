import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface Input {
  id: string;
  status: "ONLINE" | "OFFLINE" | "SUSPENDED" | "INACTIVE";
}

@Injectable()
export default class ToggleDriverStatusUseCase implements UseCase<Input, any> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!driver) throw new Error("Motorista não encontrado");

    if (data.status === "ONLINE" && driver.requestStatus !== "APPROVED") {
      throw new Error("Motorista ainda não foi aprovado");
    }

    return this.prisma.driverProfile.update({
      where: {
        id: data.id,
      },

      data: {
        status: data.status,
      },
    });
  }
}
