import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type ILegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

@InputType()
export class LegalContractInput
  implements Omit<ILegalContract, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @IsString()
  @IsNotEmpty()
  contract_number: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  legal_client_id: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  carrier_company_id: string;
  @Field({ nullable: true })
  @IsOptional()
  observations?: string;

  @Field()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  effective_date: Date;
  @Field()
  @IsString()
  @IsNotEmpty()
  delivery_conditions: string;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
}
@InputType()
export class LegalContractUpdateInput extends PartialType(LegalContractInput) {}
