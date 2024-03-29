import { NaturalPerson } from './NaturalPerson';

describe('Natural Person', () => {
  it('should create Natural Person', () => {
    const naturalPerson = new NaturalPerson({
      name: 'Jão',
      date_birth: new Date(),
      gender: 'Masculino',
      cpf: '147475874747',
      rg: '1234567',
      cep: '12345678',
      public_place: 'Rua Principal',
      address_number: '123',
      neighborhood: 'Centro',
      complement: 'Apartamento 456',
      city: 'São Paulo',
      uf: 'SP',
      first_phone: '155455',
      second_phone: null,
      third_phone: '333333333',
      email: 'joao@example.com',
      nationality: 'Brasileiro',
    });
    expect(naturalPerson).toBeTruthy();
  });
});
