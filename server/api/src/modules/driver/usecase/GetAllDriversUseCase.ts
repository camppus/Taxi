import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { OffsetPaginationOutPut } from "src/shared/interfaces/OffsetPagination";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetAllDriversInput {
  page?: number;
  limit?: number;
}

@Injectable()
export default class GetAllDriversUseCase implements UseCase<
  GetAllDriversInput,
  OffsetPaginationOutPut<any>
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    params: GetAllDriversInput,
  ): Promise<OffsetPaginationOutPut<any>> {
    const page = params.page && params.page > 0 ? params.page : 1;

    const limit =
      params.limit && params.limit > 0 ? Math.min(params.limit, 100) : 10;

    const skip = (page - 1) * limit;

    const [drivers, total] = await Promise.all([
      this.prisma.driverProfile.findMany({
        skip,

        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              gender: true,
              photoUrl: true,
              status: true,
            },
          },

          documents: {
            select: {
              id: true,
              type: true,
              fileUrl: true,
              verified: true,
              expiresAt: true,
            },
          },

          vehicles: true,
        },
      }),

      this.prisma.driverProfile.count(),
    ]);

    return {
      page,
      limit,
      total,
      lastPage: Math.ceil(total / limit),
      items: drivers,
    };
  }
}
