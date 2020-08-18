import { EntityRepository, Repository } from 'typeorm';

import { Policy } from '../models/Policy';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy>  {

}
