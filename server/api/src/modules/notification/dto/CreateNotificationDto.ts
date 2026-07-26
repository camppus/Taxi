import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { NotificationType } from "@prisma/client";

export default class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsEnum(NotificationType)
  type!: NotificationType;
}
