import { randomUUID } from 'node:crypto';

import { type IValidationField } from 'domain/shared/notification/Notification';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IOutsourcedTransportVehicle {
  id?: string;
  vehicle_id: string;
  outsourced_company_id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}

export class OutsourcedTransportVehicle extends Entity {
  private props: IOutsourcedTransportVehicle;

  constructor(
    props: Replace<
      IOutsourcedTransportVehicle,
      { created_at?: Date; updated_at?: Date }
    >,
  ) {
    super();

    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
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
    const fieldsValidation: Array<IValidationField> =
      new Array<IValidationField>();
    fieldsValidation.push(
      {
        field: this.vehicle_id,
        fieldName: 'Vehicle ID',
        maxLength: 1000,
      },
      {
        field: this.outsourced_company_id,
        fieldName: 'Outsourced Transport Vehicle',
        maxLength: 1000,
      },
    );
    this.notification.requiredField(
      'OutsourcedTransportVehicle',
      fieldsValidation,
    );
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public get vehicle_id(): string {
    return this.props.vehicle_id;
  }
  public set vehicle_id(vehicle_id: string) {
    this.props.vehicle_id = vehicle_id;
  }
  public set outsourced_company_id(outsourced_company_id: string) {
    this.props.outsourced_company_id = outsourced_company_id;
  }
  public get outsourced_company_id(): string {
    return this.props.outsourced_company_id;
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
  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  public get updated_by(): string {
    return this.props.updated_by;
  }

  public set created_by(created_by: string) {
    this.props.created_by = created_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
}
