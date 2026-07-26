import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from "@nestjs/common";

import CreateTripUseCase from "./usecases/CreateTripUseCase";
import GetAllTripsUseCase from "./usecases/GetAllTripsUseCase";
import GetMyTripsUseCase from "./usecases/GetMyTripsUseCase";
import SearchTripUseCase from "./usecases/SearchTripUseCase";
import CreateTripDto from "./dto/createTripDto";
import { TripStatus } from "@prisma/client";
import { Role } from "src/modules/user/entities/User";
import { ApiOperation } from "@nestjs/swagger";

@Controller("trips")
export class TripController {
  constructor(
    private readonly createTripUseCase: CreateTripUseCase,
    private readonly getAllTripsUseCase: GetAllTripsUseCase,
    private readonly getMyTripsUseCase: GetMyTripsUseCase,
    private readonly searchTripUseCase: SearchTripUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Criar uma nova viagem",
    description: "Permite que um motorista aprovado publique uma nova viagem.",
  })
  async create(@Req() req: any, @Body() data: CreateTripDto) {
    return this.createTripUseCase.execute({
      userId: req.user.id,
      data,
    });
  }

  @Get()
  @ApiOperation({
    summary: "Listar viagens disponíveis",
    description: "Retorna todas as viagens publicadas com paginação.",
  })
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.getAllTripsUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      status: [TripStatus.PUBLISHED],
    });
  }

  @Get("my")
  @ApiOperation({
    summary: "Listar minhas viagens",
    description:
      "Retorna as viagens associadas ao usuário autenticado como motorista ou passageiro.",
  })
  async myTrips(
    @Req() req: any,
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ) {
    return this.getMyTripsUseCase.execute({
      userId: req.user.id,
      role: req.user.role as Role,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get("search")
  @ApiOperation({
    summary: "Pesquisar viagens próximas",
    description:
      "Pesquisa viagens publicadas através de localização por texto ou coordenadas GPS.",
  })
  async search(
    @Query("query") query?: string,
    @Query("latitude") latitude?: string,
    @Query("longitude") longitude?: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ) {
    return this.searchTripUseCase.execute({
      query,

      latitude: latitude ? Number(latitude) : undefined,

      longitude: longitude ? Number(longitude) : undefined,

      page: Number(page),

      limit: Number(limit),
    });
  }

  @Get(":id/details")
  @ApiOperation({
    summary: "Listar detalhes da viagem",
  })
  async getDetails(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.getAllTripsUseCase.getById(id);
  }
}
