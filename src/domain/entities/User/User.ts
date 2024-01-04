import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../shared/entities/Entity';
import { type IValidationField } from '../../shared/notification/Notification';
import { NotificationError } from '../../shared/notification/NotificationError';
export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}
export abstract class IUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class User extends Entity {
  private props: IUser;

  constructor(props: Replace<IUser, { created_at?: Date; updated_at?: Date }>) {
    super();
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      updated_at: new Date(),
      created_at: props.created_at ?? new Date(),
    };
    console.log(this.props);
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
        field: this.props.name,
        fieldName: 'Name',
        maxLength: 80,
        minLength: 4,
      },
      { field: this.props.email, fieldName: 'Email', maxLength: 80 },
      { field: this.props.password, fieldName: 'Password', maxLength: 80 },
      {
        field: String(this.props.role),
        fieldName: 'Role',
        maxLength: 10,
      },
      {
        field: this.props.username,
        fieldName: 'Username',
        maxLength: 80,
        regex: '^[^0-9]',
      },
    );
    this.notification.requiredField('User', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username(): string {
    return this.props.username;
  }

  public set role(role: ROLE) {
    this.props.role = role;
  }

  public get role(): string {
    return this.props.role;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }
}
