import { EntityRepository, Repository } from 'typeorm';

import { Policy } from '../models/Policy';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy>  {
    /**
     * Find All Pricing Address, 'address', 'user.addressId = address.id'
     */
    public findAll(limit: number): Promise<any> {
        return this.createQueryBuilder('policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.cover', 'covertype')
                            .leftJoinAndSelect('policy.vehicle', 'vehicle')
                            .leftJoinAndSelect('policy.guarantee', 'guarantee')
                            .leftJoinAndSelect('guarantee.duration', 'purchaseduration')
                            .take(limit)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findByUserId(branchid: number): Promise<any> {
        return this.createQueryBuilder('policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.cover', 'covertype')
                            .leftJoinAndSelect('policy.vehicle', 'vehicle')
                            .leftJoinAndSelect('policy.guarantee', 'guarantee')
                            .leftJoinAndSelect('guarantee.duration', 'purchaseduration')
                            .where(`branchid=${branchid}`)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findOneById(id: number): Promise<any> {
        return this.createQueryBuilder('policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.cover', 'covertype')
                            .leftJoinAndSelect('policy.vehicle', 'vehicle')
                            .leftJoinAndSelect('policy.guarantee', 'guarantee')
                            .leftJoinAndSelect('guarantee.duration', 'purchaseduration')
                            .where(`policyid=${id}`)
                            .getOne();
    }
}
