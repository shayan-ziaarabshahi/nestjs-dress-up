import { Controller } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Crud({
  query: {
    join: {
      parent: {},
    },
    alwaysPaginate: true,
    limit: 10,
  },
  model: {
    type: User,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  @ApiBody({ type: User })
  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
  ): Promise<User> {
     return this.base.createOneBase(req, dto);
  }
}
