import { Injectable } from '@nestjs/common';

import {
  VehicleBrand,
  type IVehicleBrand,
} from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import { type VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleBrandService implements VehicleBrandRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleBrandById(id: string): Promise<VehicleBrand> {
    const brand = await this.prisma.vehicleBrand.findFirstOrThrow({
      where: { id },
      include: { CreatedBy: true, UpdateBy: true },
    });

    const vehicleBrand = VehicleBrandPrismaDTO.PrismaToEntity(brand);

    return vehicleBrand;
  }
  async createVehicleBrand(vehicleBrand: IVehicleBrand): Promise<VehicleBrand> {
    const newVehicleBrand = await this.prisma.vehicleBrand.create({
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });
    const vehicleBrandReturn = new VehicleBrand(
      {
        created_by: newVehicleBrand.created_by,
        name: newVehicleBrand.name,
        updated_by: newVehicleBrand.update_by,
        created_at: newVehicleBrand.created_at,
        updated_at: newVehicleBrand.created_at,
      },
      newVehicleBrand.id,
    );

    return vehicleBrandReturn;
  }
  async updateVehicleBrand(
    id: string,
    vehicleBrand: IVehicleBrand,
  ): Promise<VehicleBrand> {
    const updatedVehicleBrand = await this.prisma.vehicleBrand.update({
      where: { id },
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });
    const vehicleBrandReturn =
      VehicleBrandPrismaDTO.PrismaToEntity(updatedVehicleBrand);

    return vehicleBrandReturn;
  }
  async getAllVehicleBrand(): Promise<VehicleBrand[]> {
    const brands = await this.prisma.vehicleBrand.findMany();
    const vehicleBrands = brands.map(brand =>
      VehicleBrandPrismaDTO.PrismaToEntity(brand),
    );

    return vehicleBrands;
  }
}
