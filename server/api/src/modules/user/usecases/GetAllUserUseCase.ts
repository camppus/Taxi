import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

interface PaginationDto {
  page?: number;
  limit?: number;
}

@Injectable()
export default class GetAllUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ page = 1, limit = 10 }: PaginationDto) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
