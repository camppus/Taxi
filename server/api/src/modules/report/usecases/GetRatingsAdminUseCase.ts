import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class GetRatingsAdminUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [ratings, total] = await Promise.all([
      this.prisma.rating.findMany({
        include: {
          fromUser: true,

          toUser: true,

          booking: true,
        },

        skip,

        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      this.prisma.rating.count(),
    ]);

    return {
      data: ratings,

      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),
    };
  }
}
