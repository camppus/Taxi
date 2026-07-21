import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";

import CreateUserUseCase from "./usecases/CreateUserUseCase";
import GetAllUserUseCase from "./usecases/GetAllUserUseCase";
import GetUserByIdUseCase from "./usecases/GetUserByIdUseCase";
import UpdateUserUseCase from "./usecases/UpdateUserUseCase";
import ToggleUserStatusUseCase from "./usecases/ToggleUserStatusUseCase";
import RemoveUserUseCase from "./usecases/RemoveUserUseCase";

import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { Role } from "./entities/User";

@ApiTags("Users")
@Controller("users")
export default class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly toggleUserStatusUseCase: ToggleUserStatusUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso" })
  create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute({
      ...dto,
      role: Role.PASSENGER,
    });
  }

  @Get()
  @ApiOperation({ summary: "Listar usuários com paginação" })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  getAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.getAllUserUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar usuário por ID" })
  @ApiResponse({ status: 200, description: "Usuário encontrado" })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  getById(@Param("id") id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar usuário" })
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Patch(":id/toggle-status")
  @ApiOperation({ summary: "Alternar status do usuário" })
  toggleStatus(@Param("id") id: string) {
    return this.toggleUserStatusUseCase.execute(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover usuário" })
  remove(@Param("id") id: string) {
    return this.removeUserUseCase.execute(id);
  }
}
