import { Module } from "@nestjs/common";

import { ReportController } from "./ReportController";

import { PrismaService } from "src/infra/Prisma/prisma.module";

import CreateReportUseCase from "./usecases/CreateReportUseCase";
import CreateRatingUseCase from "./usecases/CreateRatingUseCase";

import DeleteReportUseCase from "./usecases/DeleteReportUseCase";

import GetMyReportsUseCase from "./usecases/GetMyReportsUseCase";
import GetMyRatingsUseCase from "./usecases/GetMyRatingsUseCase";

import GetReportsAdminUseCase from "./usecases/GetReportsAdminUseCase";
import GetReportByIdAdminUseCase from "./usecases/GetReportByIdAdminUseCase";
import UpdateReportStatusUseCase from "./usecases/UpdateReportStatusUseCase";
import GetRatingsAdminUseCase from "./usecases/GetRatingsAdminUseCase";

@Module({
  controllers: [ReportController],

  providers: [
    PrismaService,

    CreateReportUseCase,

    CreateRatingUseCase,

    DeleteReportUseCase,

    GetMyReportsUseCase,

    GetMyRatingsUseCase,

    GetReportsAdminUseCase,

    GetReportByIdAdminUseCase,

    UpdateReportStatusUseCase,

    GetRatingsAdminUseCase,
  ],

  exports: [CreateReportUseCase, CreateRatingUseCase],
})
export class ReportModule {}
