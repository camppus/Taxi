import { Controller, Get, Patch, Param, Req, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import HasUnreadNotificationsUseCase from "./usecases/HasUnreadNotificationsUseCase";
import GetNotificationsUseCase from "./usecases/GetNotificationsUseCase";
import {
  MarkAllNotificationsReadUseCase,
  MarkNotificationReadUseCase,
} from "./usecases/MarkNotificationReadUseCase";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationController {
  constructor(
    private readonly hasUnreadUseCase: HasUnreadNotificationsUseCase,
    private readonly markReadUseCase: MarkNotificationReadUseCase,
    private readonly markAllReadUseCase: MarkAllNotificationsReadUseCase,
    private readonly getNotificationsUseCase: GetNotificationsUseCase,
  ) {}
  @Get()
  @ApiOperation({
    summary: "Buscar notificações do usuário",
    description: "Retorna notificações usando paginação por cursor.",
  })
  async getNotifications(
    @Req() req: any,

    @Query("cursor") cursor?: string,

    @Query("limit") limit = 20,
  ) {
    return this.getNotificationsUseCase.execute({
      userId: req.user.id,
      cursor,
      limit: Number(limit),
    });
  }

  @Get("unread")
  @ApiOperation({
    summary: "Verificar notificações não lidas",
    description:
      "Retorna se o usuário possui notificações pendentes de leitura.",
  })
  async hasUnread(@Req() req: any) {
    return this.hasUnreadUseCase.execute({
      userId: req.user.id,
    }) as any;
  }

  @Patch(":id/read")
  @ApiOperation({
    summary: "Marcar uma notificação como lida",
  })
  async markRead(
    @Req() req: any,

    @Param("id") id: string,
  ) {
    return this.markReadUseCase.execute({
      userId: req.user.id,

      notificationId: id,
    });
  }

  @Patch("read-all")
  @ApiOperation({
    summary: "Marcar todas notificações como lidas",
  })
  async markAllRead(@Req() req: any) {
    return this.markAllReadUseCase.execute({
      userId: req.user.id,
    });
  }
}
