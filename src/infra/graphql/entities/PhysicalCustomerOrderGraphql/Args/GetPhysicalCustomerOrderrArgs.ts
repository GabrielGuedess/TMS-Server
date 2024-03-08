import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetPhysicalCustomerOrderArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  order?: string;
}
