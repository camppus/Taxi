import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from "@nestjs/common";

import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReportStatus } from "@prisma/client";

import CreateReportUseCase from "./usecases/CreateReportUseCase";
import CreateRatingUseCase from "./usecases/CreateRatingUseCase";

import GetMyReportsUseCase from "./usecases/GetMyReportsUseCase";
import GetMyRatingsUseCase from "./usecases/GetMyRatingsUseCase";

import GetReportsAdminUseCase from "./usecases/GetReportsAdminUseCase";
import GetReportByIdAdminUseCase from "./usecases/GetReportByIdAdminUseCase";
import UpdateReportStatusUseCase from "./usecases/UpdateReportStatusUseCase";
import GetRatingsAdminUseCase from "./usecases/GetRatingsAdminUseCase";

import DeleteReportUseCase from "./usecases/DeleteReportUseCase";

import CreateReportDto from "./dto/CreateReportDto";
import CreateRatingDto from "./dto/CreateRatingDto";

@ApiTags("Feedback")
@Controller("feedback")
export class ReportController {
  constructor(
    private readonly createReportUseCase: CreateReportUseCase,

    private readonly createRatingUseCase: CreateRatingUseCase,

    private readonly getMyReportsUseCase: GetMyReportsUseCase,

    private readonly getMyRatingsUseCase: GetMyRatingsUseCase,

    private readonly getReportsAdminUseCase: GetReportsAdminUseCase,

    private readonly getReportByIdAdminUseCase: GetReportByIdAdminUseCase,

    private readonly updateReportStatusUseCase: UpdateReportStatusUseCase,

    private readonly getRatingsAdminUseCase: GetRatingsAdminUseCase,

    private readonly deleteReportUseCase: DeleteReportUseCase,
  ) {}

  @Post("reports")
  @ApiOperation({
    summary: "Criar report por user",
  })
  async createReport(@Req() req: any, @Body() data: CreateReportDto) {
    return this.createReportUseCase.execute({
      ...data,
      reporterId: req.user.id,
    });
  }

  @Post("ratings")
  @ApiOperation({
    summary: "Criar rating por user",
  })
  async createRating(@Req() req: any, @Body() data: CreateRatingDto) {
    return this.createRatingUseCase.execute({
      ...data,
      fromUserId: req.user.id,
    });
  }

  @Get("reports")
  @ApiOperation({
    summary: "List my report",
  })
  async myReports(
    @Req() req: any,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    return this.getMyReportsUseCase.execute({
      userId: req.user.id,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get("ratings")
  @ApiOperation({
    summary: "List my rating",
  })
  async myRatings(
    @Req() req: any,
    @Query("page") page = 1,
    @Query("limit") limit = 20,
  ) {
    return this.getMyRatingsUseCase.execute({
      userId: req.user.id,
      page: Number(page),
      limit: Number(limit),
    });
  }

  // ADMIN

  @Get("admin/reports")
  @ApiOperation({
    summary: "List my report ADMIN",
  })
  async reports(
    @Query("page") page = 1,
    @Query("limit") limit = 20,
    @Query("status") status?: ReportStatus,
  ) {
    return this.getReportsAdminUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      status,
    });
  }

  @Get("admin/reports/:id")
  @ApiOperation({
    summary: "List my report ADMIN DETAILS",
  })
  async reportById(@Param("id") id: string) {
    return this.getReportByIdAdminUseCase.execute(id);
  }

  @Patch("admin/reports/:id/status")
  @ApiOperation({
    summary: "Toggle Report",
  })
  async updateStatus(
    @Param("id") id: string,
    @Body()
    body: {
      status: ReportStatus;
    },
  ) {
    return this.updateReportStatusUseCase.execute({
      id,
      status: body.status,
    });
  }
  @ApiOperation({
    summary: "Detelete Report",
  })
  @Delete("reports/:id")
  async deleteReport(@Req() req: any, @Param("id") id: string) {
    return this.deleteReportUseCase.execute({
      id,
      userId: req.user.id,
    });
  }
  @ApiOperation({
    summary: "Get ratesADMin",
  })
  @Get("admin/ratings")
  async ratings(@Query("page") page = 1, @Query("limit") limit = 20) {
    return this.getRatingsAdminUseCase.execute(Number(page), Number(limit));
  }
}
