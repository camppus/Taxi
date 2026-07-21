import { Module } from "@nestjs/common";

import { VehicleController } from "./vehicleController";

import CreateVehicleUseCase from "./usecases/CreateVehicleUseCase";
import GetMyVehiclesUseCase from "./usecases/GetMyVehiclesUseCase";
import GetAllVehiclesUseCase from "./usecases/GetAllVehiclesUseCase";
import GetVehicleByIdUseCase from "./usecases/GetVehicleByIdUseCase";
import UpdateVehicleUseCase from "./usecases/UpdateVehicleUseCase";
import ToggleVehicleStatusUseCase from "./usecases/ToggleVehicleStatusUseCase";

import CreateVehicleDocumentUseCase from "./usecases/CreateVehicleDocumentUseCase";
import VerifyVehicleDocumentUseCase from "./usecases/VerifyVehicleDocumentUseCase";
import DeleteVehicleDocumentUseCase from "./usecases/DeleteVehicleDocumentUseCase";

@Module({
  controllers: [VehicleController],

  providers: [
    CreateVehicleUseCase,

    GetMyVehiclesUseCase,

    GetAllVehiclesUseCase,

    GetVehicleByIdUseCase,

    UpdateVehicleUseCase,

    ToggleVehicleStatusUseCase,

    CreateVehicleDocumentUseCase,

    VerifyVehicleDocumentUseCase,

    DeleteVehicleDocumentUseCase,
  ],

  exports: [CreateVehicleUseCase, GetVehicleByIdUseCase],
})
export class VehicleModule {}
