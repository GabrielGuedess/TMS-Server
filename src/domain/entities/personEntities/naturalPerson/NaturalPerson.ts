import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface INaturalPerson {
  name: string;
  date_birth: Date;
  gender: string;
  cpf: string;
  rg: string;
  cep: number;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement: string;
  city: string;
  uf: string;
  first_phone: string;
  second_phone: string;
  third_phone: string;
  email: string;
  nationality: string;
  updated_at: Date;
  created_at: Date;
}
export class NaturalPerson extends Entity {
  private _id: string;
  private props: INaturalPerson;

  constructor(
    props: Replace<INaturalPerson, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.name,
        fieldName: 'Name',
        maxLength: 80,
      },
      {
        field: this.props.date_birth,
        fieldName: 'Date of Birth',
        maxLength: 10,
      },
      {
        field: this.props.gender,
        fieldName: 'Gender',
        maxLength: 10,
      },
      {
        field: this.props.cpf,
        fieldName: 'CPF',
        maxLength: 99_999_999_999,
      },
      {
        field: this.props.rg,
        fieldName: 'RG',
        maxLength: 9_999_999_999,
      },
      {
        field: this.props.cep,
        fieldName: 'CEP',
        maxLength: 99_999_999,
      },
      {
        field: this.props.public_place,
        fieldName: 'Public Place',
        maxLength: 80,
      },
      {
        field: this.props.address_number,
        fieldName: 'Address Number',
        maxLength: 10,
      },
      {
        field: this.props.neighborhood,
        fieldName: 'Neighborhood',
        maxLength: 80,
      },
      {
        field: this.props.complement,
        fieldName: 'Complement',
        maxLength: 80,
      },
      {
        field: this.props.city,
        fieldName: 'City',
        maxLength: 80,
      },
      {
        field: this.props.uf,
        fieldName: 'UF',
        maxLength: 2,
      },
      {
        field: this.props.first_phone,
        fieldName: 'First Phone',
        maxLength: 20,
      },
      {
        field: this.props.second_phone,
        fieldName: 'Second Phone',
        maxLength: 20,
        isNullAble: true,
      },
      {
        field: this.props.third_phone,
        fieldName: 'Third Phone',
        maxLength: 20,
        isNullAble: true,
      },
      {
        field: this.props.email,
        fieldName: 'Email',
        maxLength: 80,
      },
      {
        field: this.props.nationality,
        fieldName: 'Nationality',
        maxLength: 80,
      },
      {
        field: this.props.updated_at,
        fieldName: 'Updated At',
        maxLength: 10,
      },
      {
        field: this.created_at,
        fieldName: 'Created At',
        maxLength: 10,
      },
    );
    this.notification.requiredField('NaturalPerson', fieldsValidation);
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set date_birth(dateOfBirth: Date) {
    this.props.date_birth = dateOfBirth;
  }

  public get date_birth(): Date {
    return this.props.date_birth;
  }

  public set gender(gender: string) {
    this.props.gender = gender;
  }

  public get gender(): string {
    return this.props.gender;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set rg(rg: string) {
    this.props.rg = rg;
  }

  public get rg(): string {
    return this.props.rg;
  }

  public set cep(cep: number) {
    this.props.cep = cep;
  }

  public get cep(): number {
    return this.props.cep;
  }

  public set public_place(publicPlace: string) {
    this.props.public_place = publicPlace;
  }

  public get public_place(): string {
    return this.props.public_place;
  }

  public set address_number(addressNumber: string) {
    this.props.address_number = addressNumber;
  }

  public get address_number(): string {
    return this.props.address_number;
  }

  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set complement(complement: string) {
    this.props.complement = complement;
  }

  public get complement(): string {
    return this.props.complement;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city(): string {
    return this.props.city;
  }

  public set uf(uf: string) {
    this.props.uf = uf;
  }

  public get uf(): string {
    return this.props.uf;
  }

  public set first_phone(firstPhone: string) {
    this.props.first_phone = firstPhone;
  }

  public get first_phone(): string {
    return this.props.first_phone;
  }

  public set second_phone(secondPhone: string) {
    this.props.second_phone = secondPhone;
  }

  public get second_phone(): string {
    return this.props.second_phone;
  }

  public set third_phone(thirdPhone: string) {
    this.props.third_phone = thirdPhone;
  }

  public get third_phone(): string {
    return this.props.third_phone;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set nationality(nationality: string) {
    this.props.nationality = nationality;
  }

  public get nationality(): string {
    return this.props.nationality;
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
