import { Injectable } from '@nestjs/common';

import { type GetOutsoucedVehicleDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedVehicleDto';
import { type FindAllOutsourcedVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedVehicleRepositoryDto';
import { type OutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedVehiclePrismaDTO } from './prismaDTO/OwnsourcedVehiclePrisma.Dto';

@Injectable()
export class OutsourcedVehicleServicePrisma
  implements OutsourcedVehicleRepository
{
  constructor(private prisma: PrismaService) {}

  async findOutsourcedVehicle(
    request: GetOutsoucedVehicleDTO,
  ): Promise<OutsourcedVehicle> {
    return OutsourcedVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedVehicle.findFirst({
        where: {
          OR: [
            { id: request.id },
            { vehicle_id: request.vehicleId },
            { Vehicle: { plate: request.plate } },
          ],
        },
      }),
    );
  }
  async createOutsourcedVehicle(
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedVehicle> {
    return OutsourcedVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedVehicle.create({
        data: OutsourcedVehiclePrismaDTO.EntityToCreatePrisma(
          outsourcedVehicle,
          vehicle,
        ),
      }),
    );
  }
  async updateOutsourcedVehicle(
    id: string,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedVehicle> {
    return OutsourcedVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedVehicle.update({
        data: OutsourcedVehiclePrismaDTO.EntityToPrismaUpdate(
          outsourcedVehicle,
          vehicle,
        ),
        where: { id },
      }),
    );
  }
  async findAllOutsourcedVehicle(
    parameters: FindAllOutsourcedVehicleWhereRequestDTO,
  ): Promise<OutsourcedVehicle[]> {
    const outsourcedVehiclePrisma =
      await this.prisma.outsourcedVehicle.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return outsourcedVehiclePrisma.map(out =>
      OutsourcedVehiclePrismaDTO.PrismaToEntity(out),
    );
  }
}
