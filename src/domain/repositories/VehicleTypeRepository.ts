import {
  type IVehicleType,
  type VehicleType,
} from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

export abstract class VehicleTypeRepository {
  abstract findVehicleTypeById(id: string): Promise<VehicleType>;
  abstract createVehicleType(
    vehicleBrand: Omit<IVehicleType, 'updated_at' | 'created_at' | 'id'>,
  ): Promise<VehicleType>;
  abstract updateVehicleType(
    id: string,
    vehicleBrand: Partial<IVehicleType>,
  ): Promise<VehicleType>;
  abstract getAllVehicleType(): Promise<VehicleType[]>;
}
