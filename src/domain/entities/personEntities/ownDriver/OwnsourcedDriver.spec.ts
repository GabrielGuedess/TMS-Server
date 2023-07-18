/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OutsourcedVehicle } from '../../vehicleEntities/outsourcedVehicle/OutsourcedVehicle';
import { Vehicle } from '../../vehicleEntities/vehicle/Vehicle';
import { VehicleBrand } from '../../vehicleEntities/vehicleBrand/VehicleBrand';
import { VehicleModel } from '../../vehicleEntities/vehicleModel/VehicleModel';
import { NaturalPerson } from '../naturalPerson/NaturalPerson';
import { OwnsourcedDriver } from './OwnsourcedDriver';

describe('Ownsourced Driver', () => {
  it('should create Ownsourced Driver', () => {
    const ownsourcedDriver = new OwnsourcedDriver({
      NaturalPerson: new NaturalPerson({
        name: 'Jão',
        date_birth: new Date(),
        gender: 'Masculino',
        cpf: '75154789751',
        rg: '1475547854',
        cep: 12_345_678,
        public_place: 'Rua Principal',
        address_number: '123',
        neighborhood: 'Centro',
        complement: 'Apartamento 456',
        city: 'São Paulo',
        uf: 'SP',
        first_phone: '155455',
        second_phone: null,
        third_phone: '333333333',
        email: 'joao@example.com',
        nationality: 'Brasileiro',
      }),
      cnh: '48848878781',
      cnh_category: 'E',
      cnh_expiration: 1125,
      company_vehicle: false,
      course_mopp: true,
      cpf: null,
      OutsourcedVehicle: new OutsourcedVehicle({
        Vehicle: new Vehicle({
          plate: '455445',
          color: 'sdf',
          renavam: '449984944',
          rntrc_expiration: 'dsa',
          year: '455',
          VehicleModel: new VehicleModel({
            axles: 4,
            capacity_max: 40_000,
            name: 'Unão',
            weight: 4000,
            VehicleBrand: new VehicleBrand({
              name: 'Ford',
            }),
          }),
        }),
      }),
    });
    expect(ownsourcedDriver).toBeTruthy();
  });
});