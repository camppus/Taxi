import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/Prisma/prisma.module";
import UserRepository from "../../repositories/UserRepo";
import { User } from "../../entities/User";
import {
  OffsetPaginationInPut,
  OffsetPaginationOutPut,
} from "src/shared/interfaces/OffsetPagination";

@Injectable()
export default class PrismaUserRepo implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(
    input: OffsetPaginationInPut,
  ): Promise<OffsetPaginationOutPut<User>> {
    const { page, limit } = input;

    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);
    const mappedData = items.map(this.toEntitie);
    return {
      items: mappedData,
      page,
      limit,
      total,
      lastPage: Math.ceil(total / limit),
    };
  }
  private toEntitie(data: any): User {
    return data as User;
  }
  async save(entity: User): Promise<void> {
    await this.prisma.user.upsert({
      where: {
        id: entity.id,
      },
      create: {
        id: entity.id,
        name: entity.name,
        password: entity.password,
        phone: entity.phone,
        role: entity.role,
        email: entity.email,
        status: entity.status as any,
      },
      update: {
        id: entity.id,
        name: entity.name,
        password: entity.password,
        phone: entity.phone,
        role: entity.role,
        email: entity.email,
        status: entity.status as any,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return this.toEntitie(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return this.toEntitie(user);
  }
}
