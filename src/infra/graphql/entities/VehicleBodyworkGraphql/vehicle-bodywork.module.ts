import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBodyworkService } from 'infra/database/prisma/services/vehicle-bodywork.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleBodyworkResolver } from './vehicle-bodywork.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    PrismaService,
    { provide: VehicleBodyworkRepository, useClass: VehicleBodyworkService },

    VehicleBodyworkResolver,
  ],
})
export class VehicleBodyworkModule {}
