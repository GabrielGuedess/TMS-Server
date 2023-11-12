import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { PrismaService } from 'infra/database/prisma/prisma.service';

import { UserRepository } from '../../../../domain/repositories/UserRepository';
import { UserService } from '../../../database/prisma/services/user.service';
import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { UserResolver } from './user.resolver';

@Module({
  providers: [
    UserResolver,
    { provide: UserRepository, useClass: UserService },
    PrismaService,
  ],
  imports: [GraphqlCenterModule],
})
export class UserModule {}