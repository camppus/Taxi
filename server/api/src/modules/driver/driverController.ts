import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";

import { ApiTags, ApiOperation } from "@nestjs/swagger";

import GetAllDriversUseCase from "./usecase/GetAllDriversUseCase";
import GetDriverByIdUseCase from "./usecase/GetDriverByIdUseCase";
import UpdateDriverProfileUseCase from "./usecase/UpdateDriverProfileUseCase";
import ToggleDriverStatusUseCase from "./usecase/ToggleDriverStatusUseCase";
import ApproveDriverUseCase from "./usecase/ApproveDriverUseCase";
import RejectDriverUseCase from "./usecase/RejectDriverUseCase";
import CreateDriverDocumentUseCase from "./usecase/CreateDriverDocumentUseCase";
import VerifyDriverDocumentUseCase from "./usecase/VerifyDriverDocumentUseCase";
import DeleteDriverDocumentUseCase from "./usecase/DeleteDriverDocumentUseCase";

import { UpdateDriverProfileDto } from "./dto/UpdateDriverProfileDto";
import { ToggleDriverStatusDto } from "./dto/ToggleDriverStatusDto";
import { ApproveDriverDto } from "./dto/ApproveDriverDto";
import { RejectDriverDto } from "./dto/RejectDriverDto";
import { CreateDriverDocumentDto } from "./dto/CreateDriverDocumentDto";
import { QueryDto } from "src/shared/interfaces/GetDriversQueryDto";

@ApiTags("Drivers")
@Controller("drivers")
export class DriverController {
  constructor(
    private readonly getAllDrivers: GetAllDriversUseCase,
    private readonly getDriverById: GetDriverByIdUseCase,
    private readonly updateDriver: UpdateDriverProfileUseCase,
    private readonly toggleDriverStatus: ToggleDriverStatusUseCase,
    private readonly approveDriver: ApproveDriverUseCase,
    private readonly rejectDriver: RejectDriverUseCase,
    private readonly createDriverDocument: CreateDriverDocumentUseCase,
    private readonly verifyDriverDocument: VerifyDriverDocumentUseCase,
    private readonly deleteDriverDocument: DeleteDriverDocumentUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Listar motoristas",
  })
  getAll(@Query() query: QueryDto) {
    return this.getAllDrivers.execute(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Buscar motorista por ID",
  })
  getById(@Param("id") id: string) {
    return this.getDriverById.execute({
      id,
    });
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Atualizar dados do motorista",
  })
  update(@Param("id") id: string, @Body() dto: UpdateDriverProfileDto) {
    return this.updateDriver.execute({
      id,
      ...dto,
    });
  }

  @Patch(":id/status")
  @ApiOperation({
    summary: "Alterar status operacional",
  })
  toggleStatus(@Param("id") id: string, @Body() dto: ToggleDriverStatusDto) {
    return this.toggleDriverStatus.execute({
      id,

      status: dto.status,
    });
  }

  @Patch(":id/approve")
  @ApiOperation({
    summary: "Aprovar motorista",
  })
  approve(@Param("id") id: string, @Body() dto: ApproveDriverDto) {
    return this.approveDriver.execute({
      driverId: id,

      adminId: dto.adminId,
    });
  }

  @Patch(":id/reject")
  @ApiOperation({
    summary: "Rejeitar motorista",
  })
  reject(@Param("id") id: string, @Body() dto: RejectDriverDto) {
    return this.rejectDriver.execute({
      driverId: id,

      reason: dto.reason,
    });
  }

  @Post(":id/documents")
  @ApiOperation({
    summary: "Adicionar documento do motorista",
  })
  createDocument(
    @Param("id") id: string,
    @Body() dto: CreateDriverDocumentDto,
  ) {
    return this.createDriverDocument.execute({
      driverId: id,

      ...dto,
    });
  }

  @Patch("documents/:id/verify")
  @ApiOperation({
    summary: "Verificar documento",
  })
  verifyDocument(@Param("id") id: string) {
    return this.verifyDriverDocument.execute(id);
  }

  @Delete("documents/:id")
  @ApiOperation({
    summary: "Remover documento",
  })
  deleteDocument(@Param("id") id: string) {
    return this.deleteDriverDocument.execute(id);
  }
}
