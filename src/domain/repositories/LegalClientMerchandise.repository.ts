import { type FindAllLegalClientMerchandiseWhereRequestDTO } from 'domain/dto/repositories/LegalClientMerchandiseRepositoryDto';
import { type LegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

export abstract class LegalClientMerchandiseRepository {
  abstract findLegalClientMerchandiseById(
    id: string,
  ): Promise<LegalClientMerchandise>;
  abstract createLegalClientMerchandise(
    legalClientMerchandise: LegalClientMerchandise,
  ): Promise<LegalClientMerchandise>;
  abstract updateLegalClientMerchandise(
    id: string,
    legalClientMerchandise: LegalClientMerchandise,
  ): Promise<LegalClientMerchandise>;
  abstract getAllLegalClientMerchandise(
    parameters: FindAllLegalClientMerchandiseWhereRequestDTO,
  ): Promise<LegalClientMerchandise[]>;
  abstract findLegalClientMerchandisesByOrder(
    legalClientOrderId: string,
  ): Promise<LegalClientMerchandise[]>;
}
