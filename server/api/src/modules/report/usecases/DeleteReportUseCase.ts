import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import { UseCase } from "src/shared/interfaces/UseCases";

interface DeleteReportInput {
  id: string;
  userId: string;
}

@Injectable()
export default class DeleteReportUseCase implements UseCase<
  DeleteReportInput,
  any
> {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ id, userId }: DeleteReportInput) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new Error("Report não encontrado");
    }

    if (report.reporterId !== userId) {
      throw new Error("Não possui permissão para apagar este report");
    }

    if (report.status !== "PENDING") {
      throw new Error("Não é possível apagar um report já processado");
    }

    await this.prisma.report.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Report removido com sucesso",
    };
  }
}
