import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetContractOutsourcedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetContractOutsourcedDriverDto';
import { ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';

import { type CreateContractOutsourcedDriverDTO } from 'app/dtos/ContractOutsourcedDriverDto/CreateContractOutsourcedDriverDto';
import { type GetAllContractOutsourcedDriverDTO } from 'app/dtos/ContractOutsourcedDriverDto/GetAllContractOutsourcedDriverDto';
import { type UpdateContractOutsourcedDriverDTO } from 'app/dtos/ContractOutsourcedDriverDto/UpdateContractOutsourcedDriverDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

@Injectable()
export class ContractOutsourcedDriverUseCases {
  constructor(
    private contractOutsourcedDriverRepository: ContractOutsourcedDriverRepository,
  ) {}
  async getContractOutsourcedDriver(request: GetContractOutsourcedDriverDTO) {
    if (!request.contractNumber && !request.id) {
      throw new GraphQLError('IS NECESSARY AN ID OR CONTRACT NUMBER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const contract =
      await this.contractOutsourcedDriverRepository.getContractOutsourcedDriver(
        request,
      );
    console.log(contract);
    if (contract) return contract;

    throw new GraphQLError('Contract Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllContractOutsourcedDriver(
    request: GetAllContractOutsourcedDriverDTO,
  ) {
    return this.contractOutsourcedDriverRepository.findAllContracOutsourcedDriver(
      request,
    );
  }
  async createAllContractOutsourcedDriver(
    data: CreateContractOutsourcedDriverDTO,
  ) {
    const contractExist =
      await this.contractOutsourcedDriverRepository.getContractOutsourcedDriver(
        { contractNumber: data.contract_number },
      );

    if (contractExist) {
      throw new GraphQLError('CONTRACT NUMBER ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    data.contract_number = generateRandomNumber(8);
    const newContract = new ContractOutsourcedDriver({
      cpf: data.cpf,
      created_by: data.created_by,
      contract_number: data.contract_number,
      outsourced_driver_id: data.outsourced_driver_id,
      situation: data.situation,
      start_at: data.start_at,
      type: data.type,
      end_at: data.end_at,
      updated_by: data.updated_by,
    });

    return this.contractOutsourcedDriverRepository.createContractOutsourcedDriver(
      newContract,
    );
  }

  async updateContractOutsourcedDriver(
    id: string,
    data: UpdateContractOutsourcedDriverDTO,
  ) {
    const updateContract = new ContractOutsourcedDriver({
      cpf: data.cpf,
      created_by: null,
      contract_number: null,
      outsourced_driver_id: data.outsourced_driver_id,
      situation: data.situation,
      start_at: data.start_at,
      type: data.type,
      end_at: data.end_at,
      updated_by: data.updated_by,
    });

    return this.contractOutsourcedDriverRepository.updateContractOutsourcedDriver(
      id,
      updateContract,
    );
  }
}
