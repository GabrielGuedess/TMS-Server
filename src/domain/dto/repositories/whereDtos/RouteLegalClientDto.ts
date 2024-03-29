import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereRouteLegalClientTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  cep?: StringFilterDTO;
  public_place?: StringFilterDTO;
  address_number?: StringFilterDTO;
  neighborhood?: StringFilterDTO;
  complement?: StringFilterDTO;
  legalClientOrderId?: StringFilterDTO;
  city?: StringFilterDTO;
  uf?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
}

export abstract class SortByRouteLegalClientTypeDTO {
  id?: 'asc' | 'desc';
  cep?: 'asc' | 'desc';
  public_place?: 'asc' | 'desc';
  address_number?: 'asc' | 'desc';
  neighborhood?: 'asc' | 'desc';
  complement?: 'asc' | 'desc';
  legalClientOrderId?: 'asc' | 'desc';
  city?: 'asc' | 'desc';
  uf?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
}

export class FindAllRouteLegalClientWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByRouteLegalClientTypeDTO;
  where?: WhereRouteLegalClientTypeDTO;
}
