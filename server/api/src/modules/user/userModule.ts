import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import UserController from "./userController";
import CreateUserUseCase from "./usecases/CreateUserUseCase";
import GetAllUserUseCase from "./usecases/GetAllUserUseCase";
import GetUserByIdUseCase from "./usecases/GetUserByIdUseCase";
import UpdateUserUseCase from "./usecases/UpdateUserUseCase";
import ToggleUserStatusUseCase from "./usecases/ToggleUserStatusUseCase";
import RemoveUserUseCase from "./usecases/RemoveUserUseCase";

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetAllUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    ToggleUserStatusUseCase,
    RemoveUserUseCase,
  ],
})
export default class UserModule {}
