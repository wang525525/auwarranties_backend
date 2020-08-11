import { EntityRepository, Repository } from 'typeorm';

import { Pricing } from '../models/Pricing';

@EntityRepository(Pricing)
export class PricingRepository extends Repository<Pricing>  {

}
