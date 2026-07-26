import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetMyReportsInput {
  userId: string;

  page: number;

  limit: number;
}

@Injectable()
export default class GetMyReportsUseCase implements UseCase<
  GetMyReportsInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: GetMyReportsInput) {
    const skip = (data.page - 1) * data.limit;

    const [reports, total] = await Promise.all([
      this.prisma.report.findMany({
        where: {
          reporterId: data.userId,
        },

        include: {
          targetUser: {
            select: {
              id: true,
              fullName: true,
              photoUrl: true,
            },
          },

          booking: {
            include: {
              trip: true,
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
          reporterId: data.userId,
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
