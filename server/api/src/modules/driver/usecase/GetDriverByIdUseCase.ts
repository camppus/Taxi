import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetDriverByIdInput {
  id: string;
}

@Injectable()
export default class GetDriverByIdUseCase implements UseCase<
  GetDriverByIdInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: GetDriverByIdInput) {
    const driver = await this.prisma.driverProfile.findUnique({
      where: {
        id: data.id,
      },

      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            gender: true,
            birthDate: true,
            photoUrl: true,
            emergencyPhone: true,
            status: true,
          },
        },

        documents: {
          select: {
            id: true,
            type: true,
            fileUrl: true,
            verified: true,
            verifiedAt: true,
            expiresAt: true,
            createdAt: true,
          },
        },

        vehicles: true,

        trips: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!driver) {
      throw new Error("Motorista não encontrado");
    }

    return driver;
  }
}
