import { Injectable } from '@nestjs/common';

import { type FindAllCompanyVehicleWhereRequestDTO } from 'domain/dto/repositories/CompanyVehicleRepositoryDto';
import { type CompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';

import { PrismaService } from '../prisma.service';
import { CompanyVehiclePrismaDTO } from './prismaDTO/CompanyVehiclePrismaDto';

@Injectable()
export class CompanyVehicleServicePrisma implements CompanyVehicleRepository {
  constructor(private prisma: PrismaService) {}

  async findCompanyVehicle(
    id?: string,
    plate?: string,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.findFirst({
        where: { OR: [{ id }, { Vehicle: { plate } }] },
      }),
    );
  }
  async createCompanyVehicle(
    companyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.create({
        data: CompanyVehiclePrismaDTO.EntityToCreatePrisma(
          companyVehicle,
          vehicle,
        ),
      }),
    );
  }
  async updateCompanyVehicle(
    id: string,
    CompanyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.update({
        data: CompanyVehiclePrismaDTO.EntityToPrismaUpdate(
          CompanyVehicle,
          vehicle,
        ),
        where: { id },
      }),
    );
  }
  async findAllCompanyVehicle(
    parameters: FindAllCompanyVehicleWhereRequestDTO,
  ): Promise<CompanyVehicle[]> {
    const companyVehiclePrisma = await this.prisma.companyVehicle.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return companyVehiclePrisma.map(companyVehicle =>
      CompanyVehiclePrismaDTO.PrismaToEntity(companyVehicle),
    );
  }
}
