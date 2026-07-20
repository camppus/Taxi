import { Global, Module } from "@nestjs/common";
import CriptoJs from "./CriptoJS";
import BcryptHasher from "./BcryptHasher";
import { JwtService } from "./JwtService";

@Global()
@Module({
  providers: [
    {
      provide: "EncriptProvider",
      useClass: CriptoJs,
    },
    {
      provide: "HasherProvider",
      useClass: BcryptHasher,
    },
    JwtService,
  ],
  exports: ["EncriptProvider", "HasherProvider", JwtService],
})
export class SecurityModule {}
export default SecurityModule;
