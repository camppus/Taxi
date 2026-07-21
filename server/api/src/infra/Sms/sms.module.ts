import { Global, Module } from "@nestjs/common";
import { FakeSmsProvider } from "./providers/FakeSmsProvider";

@Global()
@Module({
  providers: [
    {
      provide: "SmsProvider",
      useClass: FakeSmsProvider,
    },
  ],
  exports: ["SmsProvider"],
})
export class SmsModule {}
