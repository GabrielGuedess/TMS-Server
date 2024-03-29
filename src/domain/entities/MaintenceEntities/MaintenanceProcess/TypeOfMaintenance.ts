import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface ITypeOfMaintenance {
  id?: string;
  description: string;
  preventive?: boolean;
  corrective?: boolean;
  updated_at: Date;
  created_at: Date;
}

export class TypeOfMaintenance extends Entity {
  private props: ITypeOfMaintenance;

  constructor(
    props: Replace<
      ITypeOfMaintenance,
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
        field: this.description,
        fieldName: 'Description',
        maxLength: 100,
      },
      {
        field: this.props.preventive,
        fieldName: 'Preventive',
        maxLength: 5,
        isNullAble: true,
      },
      {
        field: this.props.corrective,
        fieldName: 'Corrective',
        maxLength: 5,
        isNullAble: true,
      },
    );

    this.notification.requiredField('TypeOfMaintenance', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set preventive(preventive: boolean | undefined) {
    this.props.preventive = preventive;
  }

  public get preventive(): boolean | undefined {
    return this.props.preventive;
  }

  public set corrective(corrective: boolean | undefined) {
    this.props.corrective = corrective;
  }

  public get corrective(): boolean | undefined {
    return this.props.corrective;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
