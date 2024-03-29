import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalPersonDTO } from 'domain/dto/repositories/getDataDtos/GetLegalPersonDto';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { type CreateLegalPersonDTO } from 'app/dtos/LegalPerson/CreateLegalPersonDto';
import { type UpdateLegalPersonDTO } from 'app/dtos/LegalPerson/UpdateLegalPersonDto';

@Injectable()
export class LegalPersonUseCases {
  constructor(private legalPersonRepository: LegalPersonRepository) {}
  async getLegalPerson(request: GetLegalPersonDTO) {
    if (
      !request.cnpj &&
      !request.corporateName &&
      !request.fantasyName &&
      !request.legalPersonId
    )
      throw new GraphQLError(
        'IS NECESSARY A LEGALPERSONID, CORPORATENAME,  CNPJ OR FANTASY NAME',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    const legalPerson = await this.legalPersonRepository.findlegalperson(
      request,
    );
    if (!legalPerson)
      throw new GraphQLError('LEGAL PERSON NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return legalPerson;
  }
  async validatePerson(data: CreateLegalPersonDTO | UpdateLegalPersonDTO) {
    const person = await this.legalPersonRepository.ValideLegalPerson({
      cnpj: data.cnpj,
      corporate_name: data.corporate_name,
      fantasy_name: data.fantasy_name,
      state_registration: data.state_registration,
    });

    if (person) {
      let errors = '';

      if (data.cnpj == person.cnpj) {
        errors += 'CNPJ IN USE;';
      }

      if (data.state_registration == person.state_registration) {
        errors += 'STATE REGISTRATION IN USE;';
      }

      if (data.fantasy_name == person.fantasy_name) {
        errors += ' FANTASY NAME IN USE;';
      }

      if (data.corporate_name == person.corporate_name) {
        errors += 'CORPORATE NAME IN USE';
      }

      if (errors.length > 0) {
        throw new GraphQLError(errors, {
          extensions: { code: HttpStatus.CONFLICT },
        });
      }
    }

    return person;
  }
}
