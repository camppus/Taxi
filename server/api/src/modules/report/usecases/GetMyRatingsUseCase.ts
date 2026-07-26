import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface GetMyRatingsInput {
  userId: string;

  page: number;

  limit: number;
}

@Injectable()
export default class GetMyRatingsUseCase implements UseCase<
  GetMyRatingsInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: GetMyRatingsInput) {
    const skip = (data.page - 1) * data.limit;

    const [ratings, total] = await Promise.all([
      this.prisma.rating.findMany({
        where: {
          toUserId: data.userId,
        },

        include: {
          fromUser: {
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

      this.prisma.rating.count({
        where: {
          toUserId: data.userId,
        },
      }),
    ]);

    const average = await this.prisma.rating.aggregate({
      where: {
        toUserId: data.userId,
      },

      _avg: {
        stars: true,
      },
    });

    return {
      data: ratings,

      average: average._avg.stars ?? 0,

      page: data.page,

      limit: data.limit,

      total,

      totalPages: Math.ceil(total / data.limit),
    };
  }
}
