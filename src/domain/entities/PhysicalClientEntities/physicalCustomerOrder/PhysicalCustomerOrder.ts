import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IPhysicalCustomerOrder {
  id?: string;
  order: string;
  physical_contract_id: string;

  updated_at: Date;
  created_at: Date;
  updated_by: string;
  created_by: string;
}

export class PhysicalCustomerOrder extends Entity {
  private props: IPhysicalCustomerOrder;

  constructor(
    props: Replace<
      IPhysicalCustomerOrder,
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
        field: this.props.order,
        fieldName: 'Order',
        maxLength: 999,
      },
      {
        field: this.props.physical_contract_id,
        fieldName: 'Physical Contract',
        maxLength: 200,
      },
      {
        field: this.props.created_by,
        fieldName: 'Created By',
        maxLength: 200,
      },
      {
        field: this.props.updated_by,
        fieldName: 'Updated By',
        maxLength: 200,
      },
      {
        field: this.props.created_at,
        fieldName: 'Created At',
        maxLength: 200,
      },
      {
        field: this.props.updated_at,
        fieldName: 'Updated At',
        maxLength: 200,
      },
    );

    this.notification.requiredField('CustomerOrder', fieldsValidation);
  }

  get id(): string {
    return this.props.id;
  }

  get order(): string {
    return this.props.order;
  }

  set order(order: string) {
    this.props.order = order;
  }

  get physical_contract_id(): string {
    return this.props.physical_contract_id;
  }

  set physical_contract_id(physical_contract_id: string) {
    this.props.physical_contract_id = physical_contract_id;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_by(): string {
    return this.props.updated_by;
  }

  set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  get created_by(): string {
    return this.props.created_by;
  }

  set created_by(created_by: string) {
    this.props.created_by = created_by;
  }
}
