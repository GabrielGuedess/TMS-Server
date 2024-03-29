import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Query,
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { CompanyVehicleUseCases } from 'app/useCases/CompanyVehicleUseCases/CompanyVehicleUseCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { CompanyVehicleWhereArgs } from 'infra/graphql/entities/CompanyVehicle/Args/WhereCompanyVehicleArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetCompanVehicleArgs } from './Args/GetCompanyVehicleArgs';
import {
  CompanyVehicleInput,
  CompanyVehicleUpdateInput,
} from './CompanyVehicle.input';
import { CompanyVehicleIModel } from './CompanyVehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => CompanyVehicleIModel)
export class CompanyVehicleResolver {
  constructor(
    private companyUseCases: CompanyVehicleUseCases,
    private vehicleUseCase: VehicleUseCases,
  ) {}
  @Query(() => CompanyVehicleIModel)
  async getCompanyVehicle(@Args() request: GetCompanVehicleArgs) {
    return this.companyUseCases.getCompanyVehicle(request);
  }
  @Query(() => [CompanyVehicleIModel])
  async getAllCompanyVehicle(@Args() args: CompanyVehicleWhereArgs) {
    return await this.companyUseCases.getAllCompanyVehicle({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });
  }
  @Mutation(() => CompanyVehicleIModel)
  async createCompanyVehicle(
    @Args('CompanyVehicleInput') companyVehicle: CompanyVehicleInput,
    @CurrentUser() user: User,
  ) {
    companyVehicle.created_by = user.id;
    companyVehicle.updated_by = user.id;

    return await this.companyUseCases.createCompanyVehicle(companyVehicle);
  }
  @Mutation(() => CompanyVehicleIModel)
  async updatedCompanyVehicle(
    @Args('id') id: string,
    @Args('outsourced') companyVehicle: CompanyVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    companyVehicle.updated_by = user.id;

    return await this.companyUseCases.updateCompanyVehicle(id, companyVehicle);
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: CompanyVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleUseCase.getVehicle({ vehicleId: vehicleId });
  }
}
