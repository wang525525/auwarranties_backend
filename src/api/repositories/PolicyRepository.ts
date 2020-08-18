import { EntityRepository, Repository } from 'typeorm';

import { Policy } from '../models/Policy';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy>  {
    /**
     * Find All Pricing
     */
    public findAll(): Promise<any> {
        return this.createQueryBuilder('policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.cover', 'covertype')
                            .getMany();
    }

    /**
     * Find All Pricing
     */
    public findOneById(branchid: number): Promise<any> {
        return this.createQueryBuilder('policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.cover', 'covertype')
                            .where(`branchid=${branchid}`)
                            .getOne();
    }
}
