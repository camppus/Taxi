import { Module } from "@nestjs/common";

import { DriverController } from "./driverController";

import { PrismaService } from "src/infra/Prisma/prisma.module";

import GetAllDriversUseCase from "./usecase/GetAllDriversUseCase";
import GetDriverByIdUseCase from "./usecase/GetDriverByIdUseCase";
import UpdateDriverProfileUseCase from "./usecase/UpdateDriverProfileUseCase";
import ToggleDriverStatusUseCase from "./usecase/ToggleDriverStatusUseCase";
import ApproveDriverUseCase from "./usecase/ApproveDriverUseCase";
import RejectDriverUseCase from "./usecase/RejectDriverUseCase";
import CreateDriverDocumentUseCase from "./usecase/CreateDriverDocumentUseCase";
import VerifyDriverDocumentUseCase from "./usecase/VerifyDriverDocumentUseCase";
import DeleteDriverDocumentUseCase from "./usecase/DeleteDriverDocumentUseCase";

@Module({
  controllers: [DriverController],

  providers: [
    PrismaService,

    GetAllDriversUseCase,

    GetDriverByIdUseCase,

    UpdateDriverProfileUseCase,

    ToggleDriverStatusUseCase,

    ApproveDriverUseCase,

    RejectDriverUseCase,

    CreateDriverDocumentUseCase,

    VerifyDriverDocumentUseCase,

    DeleteDriverDocumentUseCase,
  ],

  exports: [GetAllDriversUseCase, GetDriverByIdUseCase],
})
export class DriverModule {}
