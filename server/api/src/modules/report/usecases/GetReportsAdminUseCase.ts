import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface Input {
  page: number;
  limit: number;
  status?: string;
}

@Injectable()
export default class GetReportsAdminUseCase implements UseCase<Input, any> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const skip = (data.page - 1) * data.limit;

    const [reports, total] = await Promise.all([
      this.prisma.report.findMany({
        where: {
          ...(data.status && {
            status: data.status as any,
          }),
        },

        include: {
          reporter: {
            select: {
              id: true,
              fullName: true,
              photoUrl: true,
            },
          },

          targetUser: {
            select: {
              id: true,
              fullName: true,
              photoUrl: true,
            },
          },

          booking: {
            include: {
              trip: {
                include: {
                  vehicle: true,
                },
              },
            },
          },
        },

        skip,

        take: data.limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      this.prisma.report.count({
        where: {
          ...(data.status && {
            status: data.status as any,
          }),
        },
      }),
    ]);

    return {
      data: reports,

      page: data.page,

      limit: data.limit,

      total,

      totalPages: Math.ceil(total / data.limit),
    };
  }
}
