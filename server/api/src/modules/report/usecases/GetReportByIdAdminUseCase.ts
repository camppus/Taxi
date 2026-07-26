import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";

@Injectable()
export default class GetReportByIdAdminUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },

      include: {
        reporter: true,

        targetUser: true,

        booking: {
          include: {
            trip: true,
          },
        },
      },
    });

    if (!report) {
      throw new Error("Report não encontrado");
    }

    return report;
  }
}
