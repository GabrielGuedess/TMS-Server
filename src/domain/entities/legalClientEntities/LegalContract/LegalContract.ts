import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface ILegalContract {
  id?: string;
  legal_client_id: string;
  updated_at: Date;
  created_at?: Date;
  updated_by: string;
  created_by?: string;
}

export class LegalContract extends Entity {
  private props: ILegalContract;

  constructor(
    props: Replace<ILegalContract, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.legal_client_id,
        fieldName: 'Legal Client',
        maxLength: 200,
      },
      {
        field: this.props.created_at,
        fieldName: 'Created At',
        maxLength: 80,
      },
      {
        field: this.props.updated_at,
        fieldName: 'Updated At',
        maxLength: 80,
      },
      {
        field: this.props.updated_by,
        fieldName: 'Updated By',
        maxLength: 80,
      },
      {
        field: this.props.created_by,
        fieldName: 'Created By',
        maxLength: 80,
      },
    );
    this.notification.requiredField('LegalContract', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get legal_client_id(): string {
    return this.props.legal_client_id;
  }

  set legal_client_id(legal_client_id: string) {
    this.props.legal_client_id = legal_client_id;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  set created_at(created_at: Date) {
    this.props.created_at = created_at;
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
