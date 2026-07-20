import { UseCase } from "src/shared/interfaces/UseCases";
import {
  OffsetPaginationInPut,
  OffsetPaginationOutPut,
} from "src/shared/interfaces/OffsetPagination";
import type UserRepository from "src/modules/user/repositories/UserRepo";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/User";

@Injectable()
export default class FindAllUsersUseCase implements UseCase<
  OffsetPaginationInPut,
  OffsetPaginationOutPut<User>
> {
  constructor(
    @Inject("UserRepository")
    private readonly repo: UserRepository,
  ) {}

  async execute(
    input: OffsetPaginationInPut,
  ): Promise<OffsetPaginationOutPut<User>> {
    const data = await this.repo.findAll(input);

    return data;
  }
}
