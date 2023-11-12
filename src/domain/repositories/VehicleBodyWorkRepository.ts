import { type VehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

export abstract class VehicleBodyworkRepository {
  abstract findVehicleBodyworkById(id: string): Promise<VehicleBodywork>;
  abstract createVehicleBodywork(
    vehicleBodywork: VehicleBodywork,
  ): Promise<VehicleBodywork>;
  abstract updateVehicleBodywork(
    id: string,
    vehicleBodywork: VehicleBodywork,
  ): Promise<VehicleBodywork>;
  abstract getAllVehicleBodywork(): Promise<VehicleBodywork[]>;
}
