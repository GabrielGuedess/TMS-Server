import {
  type getCarrierCompanyData,
  type FindAllWhereCarrierCompanyRequestType,
} from 'domain/dto/repositories/whereDtos/CarrierRepositoryDto';
import { type CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class CarrierCompanyRepository {
  abstract findCarrierCompany(
    data: getCarrierCompanyData,
  ): Promise<CarrierCompany>;
  abstract createCarrierCompany(
    carrierCompany: CarrierCompany,
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ): Promise<CarrierCompany>;
  abstract updateCarrierCompany(
    id: string,
    carrierCompany?: CarrierCompany,
    legalPerson?: LegalPerson,
  ): Promise<CarrierCompany>;
  abstract getAllCarrierCompany(
    where: FindAllWhereCarrierCompanyRequestType,
  ): Promise<CarrierCompany[]>;
}
