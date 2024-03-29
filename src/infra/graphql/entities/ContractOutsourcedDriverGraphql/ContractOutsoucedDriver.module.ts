import { Module } from '@nestjs/common';

import { ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { ContractOutsourcedDriverUseCases } from 'app/useCases/ContractOutsourcedDriverUseCases/ContractOutsourcedDriverUseCases';

import { ContractOutsourcedDriverPrismaService } from 'infra/database/prisma/services/contract-outsouced-driver.service';
import { OutsourcedDriverPrismaService } from 'infra/database/prisma/services/outsourced-driver.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { ContractOutsoucedDriverResolver } from './ContractOutsourcedDriver.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: ContractOutsourcedDriverRepository,
      useClass: ContractOutsourcedDriverPrismaService,
    },
    {
      provide: OutsourcedDriverRepository,
      useClass: OutsourcedDriverPrismaService,
    },
    ContractOutsourcedDriverUseCases,
    ContractOutsoucedDriverResolver,
  ],
  exports: [ContractOutsourcedDriverUseCases],
})
export class ContractOutsoucedDriverModule {}
