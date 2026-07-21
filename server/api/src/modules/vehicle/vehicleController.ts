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

import CreateVehicleUseCase from "./usecases/CreateVehicleUseCase";
import GetMyVehiclesUseCase from "./usecases/GetMyVehiclesUseCase";
import GetAllVehiclesUseCase from "./usecases/GetAllVehiclesUseCase";
import GetVehicleByIdUseCase from "./usecases/GetVehicleByIdUseCase";
import UpdateVehicleUseCase from "./usecases/UpdateVehicleUseCase";
import ToggleVehicleStatusUseCase from "./usecases/ToggleVehicleStatusUseCase";
import CreateVehicleDocumentUseCase from "./usecases/CreateVehicleDocumentUseCase";
import VerifyVehicleDocumentUseCase from "./usecases/VerifyVehicleDocumentUseCase";
import DeleteVehicleDocumentUseCase from "./usecases/DeleteVehicleDocumentUseCase";
import { CreateVehicleDto } from "./dto/CreateVehicleDto";
import { ToggleVehicleStatusDto } from "./dto/ToggleVehicleStatusDto";
import { CreateVehicleDocumentDto } from "./dto/CreateVehicleDocumentDto";
import { VerifyVehicleDocumentDto } from "./dto/VerifyVehicleDocumentDto";
import { QueryDto } from "src/shared/interfaces/GetDriversQueryDto";
import CurrentUserId from "src/infra/http/CurrentUserIdDecorator";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehicleController {
  constructor(
    private readonly createVehicle: CreateVehicleUseCase,

    private readonly getMyVehicles: GetMyVehiclesUseCase,

    private readonly getAllVehicles: GetAllVehiclesUseCase,

    private readonly getVehicleById: GetVehicleByIdUseCase,

    private readonly updateVehicle: UpdateVehicleUseCase,

    private readonly toggleVehicleStatus: ToggleVehicleStatusUseCase,

    private readonly createVehicleDocument: CreateVehicleDocumentUseCase,

    private readonly verifyVehicleDocument: VerifyVehicleDocumentUseCase,

    private readonly deleteVehicleDocument: DeleteVehicleDocumentUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Cadastrar veículo",
  })
  create(@CurrentUserId() userId: string, @Body() dto: CreateVehicleDto) {
    return this.createVehicle.execute({
      driverId: userId,
      name: dto.name,
      description: dto.description,
      vehicleTypeId: dto.vehicleTypeId,
      brand: dto.brand,
      model: dto.model,
      year: dto.year,
      color: dto.color,
      plateNumber: dto.plateNumber,
      totalSeats: dto.totalSeats,
      passengerSeats: dto.passengerSeats,
      capacity: dto.passengerSeats,
      id: "",
    });
  }

  @Get("my")
  @ApiOperation({
    summary: "Listar meus veículos",
  })
  myVehicles(
    @CurrentUserId() userId: string,

    @Query() query: QueryDto,
  ) {
    return this.getMyVehicles.execute(userId, query.page, query.limit);
  }

  @Get()
  @ApiOperation({
    summary: "Listar todos veículos",
  })
  all(@Query() query: QueryDto) {
    return this.getAllVehicles.execute(query.page, query.limit);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Detalhes do veículo",
  })
  details(@Param("id") id: string) {
    return this.getVehicleById.execute(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Atualizar veículo",
  })
  update(
    @CurrentUserId() userId: string,
    @Param("id") id: string,

    @Body() dto: CreateVehicleDto,
  ) {
    return this.updateVehicle.execute(userId, {
      id: id,
      name: dto.name,
      description: dto.description,
      brand: dto.brand,
      model: dto.model,
      year: dto.year,
      color: dto.color,
      totalSeats: dto.totalSeats,
      passengerSeats: dto.passengerSeats,
      capacity: dto.totalSeats,
      driverId: userId,
      plateNumber: dto.plateNumber,
      vehicleTypeId: dto.vehicleTypeId,
    });
  }

  @Patch(":id/status")
  @ApiOperation({
    summary: "Alterar status do veículo",
  })
  toggleStatus(@Param("id") id: string, @Body() dto: ToggleVehicleStatusDto) {
    return this.toggleVehicleStatus.execute({
      vehicleId: id,
      status: dto.status as any,
      reason: dto.reason,
    });
  }

  @Post(":id/documents")
  @ApiOperation({
    summary: "Adicionar documento",
  })
  createDocument(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Body() dto: CreateVehicleDocumentDto,
  ) {
    return this.createVehicleDocument.execute({
      ...dto,
      userId: userId,
      vehicleId: id,
    });
  }

  @Patch("documents/:id/verify")
  @ApiOperation({
    summary: "Validar documento",
  })
  verifyDocument(@Param("id") id: string) {
    return this.verifyVehicleDocument.execute(id);
  }

  @Delete("documents/:id")
  @ApiOperation({
    summary: "Remover documento",
  })
  deleteDocument(
    @CurrentUserId() userId: string,

    @Param("id") id: string,
  ) {
    return this.deleteVehicleDocument.execute(id, userId);
  }
}
