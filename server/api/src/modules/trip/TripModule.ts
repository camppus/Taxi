import { LocationServiceProvider } from "./../location/LocationServiceProvider";
import { Module } from "@nestjs/common";
import CreateTripUseCase from "./usecases/CreateTripUseCase";
import GetAllTripsUseCase from "./usecases/GetAllTripsUseCase";
import GetMyTripsUseCase from "./usecases/GetMyTripsUseCase";
import SearchTripUseCase from "./usecases/SearchTripUseCase";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import CreateLocationUseCase from "src/modules/location/usecases/CreateLocationUseCase";
import NominatimLocationProvider from "../location/provider/NominatimLocationProvider";
import { TripController } from "./TripController";

@Module({
  controllers: [TripController],

  providers: [
    PrismaService,

    CreateTripUseCase,

    GetAllTripsUseCase,

    GetMyTripsUseCase,

    SearchTripUseCase,

    CreateLocationUseCase,

    {
      provide: "LocationServiceProvider",
      useClass: NominatimLocationProvider,
    },
  ],

  exports: [
    CreateTripUseCase,
    GetAllTripsUseCase,
    GetMyTripsUseCase,
    SearchTripUseCase,
  ],
})
export class TripModule {}
