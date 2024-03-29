import { type ILegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export abstract class CreateLegalClientOrderDTO implements ILegalClientOrder {
  quote_table_id: string;

  order: string;

  legal_contract_id: string;

  created_by: string;

  updated_by: string;
}
