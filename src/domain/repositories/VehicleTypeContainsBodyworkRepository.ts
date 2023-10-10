import {
  type IVehicleTypeContainsBody,
  type VehicleTypeContainsBody,
} from 'domain/entities/vehicle/vehicleTypeContainsBody/VehicleContainsBody';

export abstract class VehicleTypeContainsBodyRepository {
  abstract findVehicleTypeContainsBodyById(
    id?: string,
    typeId?: string,
    bodyId?: string,
  ): Promise<VehicleTypeContainsBody>;
  abstract createVehicleTypeContainsBody(
    vehicleTypeContainsBody: Omit<
      IVehicleTypeContainsBody,
      'id' | 'updated_at' | 'created_at'
    >,
  ): Promise<VehicleTypeContainsBody>;
  abstract deleteVehicleTypeContainsBody(
    typeId: string,
    bodyId: string,
  ): Promise<string>;
  abstract getAllVehicleTypeContainsBody(): Promise<VehicleTypeContainsBody[]>;
  abstract getAllVehicleTypeBodies(
    typeId: string,
  ): Promise<VehicleTypeContainsBody[] | null | void[]>;
  abstract getAllVehicleTypeContainsThisBody(
    bodyId: string,
  ): Promise<VehicleTypeContainsBody[] | null | void[]>;
}
