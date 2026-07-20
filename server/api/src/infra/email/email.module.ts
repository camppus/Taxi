import { Global, Module } from "@nestjs/common";
import { ConsoleEmailProvider } from "./ConsoleEmailProvider";

@Global()
@Module({
  providers: [
    {
      provide: "EmailProvider",
      useClass: ConsoleEmailProvider,
    },
  ],
  exports: ["EmailProvider"],
})
export class EmailModule {}
