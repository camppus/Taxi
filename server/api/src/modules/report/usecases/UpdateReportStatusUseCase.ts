import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { ReportStatus } from "@prisma/client";

interface Input {
  id: string;

  status: ReportStatus;
}

@Injectable()
export default class UpdateReportStatusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: Input) {
    const report = await this.prisma.report.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!report) {
      throw new Error("Report não encontrado");
    }

    return this.prisma.report.update({
      where: {
        id: data.id,
      },

      data: {
        status: data.status,
      },
    });
  }
}
