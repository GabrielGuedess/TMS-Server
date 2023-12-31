import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type Vehicle } from '../vehicle/Vehicle';

interface ICompanyVehicle {
  Vehicle: Vehicle;
  created_at: Date;
  updated_at: Date;
}

export class CompanyVehicle extends Entity {
  private _id: string;
  private props: ICompanyVehicle;

  constructor(
    props: Replace<ICompanyVehicle, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    super();

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      updated_at: new Date(),
      created_at: props.created_at ?? new Date(),
    };
    this.validate();

    if (this.notification.hasErrors()) {
      const errors = this.notification.getErrors();

      throw new NotificationError(errors);
    }
  }

  validate() {
    this.props.Vehicle.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get Vehicle(): Vehicle {
    return this.props.Vehicle;
  }
  public set Vehicle(vehicle: Vehicle) {
    this.props.Vehicle = vehicle;
  }
  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
