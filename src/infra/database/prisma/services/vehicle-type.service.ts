import { Injectable } from '@nestjs/common';

import {
  type VehicleType,
  type IVehicleType,
} from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';
import { type VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from '../prisma.service';
import { VehicleTypePrismaDTO } from './prismaDTO/VehicleTypePrismaDto.ts';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleTypeService implements VehicleTypeRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleTypeById(id: string): Promise<VehicleType> {
    const vehicleTypePrisma = await this.prisma.vehicleType.findFirstOrThrow({
      where: { id },
    });
    const vehicleType = VehicleTypePrismaDTO.PrismaToEntity(vehicleTypePrisma);

    return vehicleType;
  }
  async createVehicleType(vehicleType: IVehicleType): Promise<VehicleType> {
    const prismaVehicleType = await this.prisma.vehicleType.create({
      data: VehicleTypePrismaDTO.EntityToPrisma(vehicleType),
      select: {
        name: true,
        bodywork: true,
        created_at: true,
        created_by: true,
        id: true,
        update_by: true,
        updated_at: true,
      },
    });

    return VehicleTypePrismaDTO.PrismaToEntity(prismaVehicleType);
  }
  async updateVehicleType(
    id: string,
    vehicleType: IVehicleType,
  ): Promise<VehicleType> {
    const updatedType = await this.prisma.vehicleType.update({
      data: VehicleTypePrismaDTO.EntityToPrisma(vehicleType),
      where: { id },
      select: {
        bodywork: true,
        created_at: true,
        created_by: true,
        id: true,
        name: true,
        update_by: true,
        updated_at: true,
      },
    });

    return VehicleTypePrismaDTO.PrismaToEntity(updatedType);
  }
  async getAllVehicleType(): Promise<VehicleType[]> {
    const vehicleTypes = await this.prisma.vehicleType.findMany();

    return vehicleTypes.map(vehicleType =>
      VehicleTypePrismaDTO.PrismaToEntity(vehicleType),
    );
  }
}
