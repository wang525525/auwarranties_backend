import { EntityRepository, Repository } from 'typeorm';

import { Policy } from '../models/Policy';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy>  {
    /**
     * Find All Pricing Address, 'address', 'user.addressId = address.id'
     */
    public findAll(): Promise<any> {
        return this.createQueryBuilder('policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.cover', 'covertype')
                            .leftJoinAndSelect('policy.vehicle', 'vehicle')
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
                            .leftJoinAndSelect('policy.vehicle', 'vehicle')
                            .where(`branchid=${branchid}`)
                            .getOne();
    }
}
