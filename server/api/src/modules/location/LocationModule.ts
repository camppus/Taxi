import { Module } from "@nestjs/common";

import CreateLocationUseCase from "./usecases/CreateLocationUseCase";
import GetLocationByIdUseCase from "./usecases/GetLocationByIdUseCase";
import NominatimLocationProvider from "./provider/NominatimLocationProvider";

@Module({
  providers: [
    CreateLocationUseCase,
    GetLocationByIdUseCase,
    {
      useClass: NominatimLocationProvider,
      provide: "LocationServiceProvider",
    },
  ],

  exports: [
    CreateLocationUseCase,
    GetLocationByIdUseCase,
    "LocationServiceProvider",
  ],
})
export class LocationModule {}
