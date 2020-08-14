import { EntityRepository, Repository } from 'typeorm';

import { PolicyItem } from '../models/PolicyItem';

@EntityRepository(PolicyItem)
export class PolicyItemRepository extends Repository<PolicyItem>  {

    /**
     * Find All Pricing
     */
    public findByCoverId(coverid: number): Promise<any> {
        return this.createQueryBuilder('policyitems')
                            .where(`coverid=${coverid}`)
                            .select(['*'])
                            .getMany();
    }
}
