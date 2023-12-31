import { randomUUID } from 'node:crypto';

import { type CorporateClient } from 'domain/entities/legalPerson/CorporateClient/CorporateClient';
import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface ILegalContractor {
  branch: string;
  CorporateClient: CorporateClient;
  cnpj?: string;
  updated_at: Date;
  created_at: Date;
}

export class LegalContractor extends Entity {
  private _id: string;
  private props: ILegalContractor;

  constructor(
    props: Replace<ILegalContractor, { created_at?: Date; updated_at?: Date }>,
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
    const fieldsValidation: Array<IValidationField> =
      new Array<IValidationField>();
    fieldsValidation.push(
      {
        field: this.props.cnpj,
        fieldName: 'CPF',
        maxLength: 11,
        minLength: 11,
        isNullAble: true,
      },
      {
        field: this.props.branch,
        fieldName: 'Branch',
        maxLength: 80,
      },
    );
    this.props.CorporateClient.validate();
    this.notification.requiredField('LegalContractor', fieldsValidation);
  }

  public get id(): string {
    return this._id;
  }
  public set branch(branch: string) {
    this.props.branch = branch;
  }

  public get branch(): string {
    return this.props.branch;
  }

  public set CorporateClient(corporateClient: CorporateClient) {
    this.props.CorporateClient = corporateClient;
  }

  public get LegalPerson(): CorporateClient {
    return this.props.CorporateClient;
  }

  public set cnpj(cnpj: string | undefined) {
    this.props.cnpj = cnpj;
  }

  public get cnpj(): string | undefined {
    return this.props.cnpj;
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
