import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.module";
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class PrismaModule {}
