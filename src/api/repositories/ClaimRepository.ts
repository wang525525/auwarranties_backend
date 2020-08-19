import { EntityRepository, Repository } from 'typeorm';

import { Claim } from '../models/Claim';

@EntityRepository(Claim)
export class ClaimRepository extends Repository<Claim>  {
    /**
     * Find All Pricing Address, 'address', 'user.addressId = address.id'
     */
    public findAll(limit: number): Promise<any> {
        return this.createQueryBuilder('claims')
                            .leftJoinAndSelect('claims.policy', 'policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('claims.claimstate', 'state')
                            .take(limit)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findByUserId(branchid: number): Promise<any> {
        return this.createQueryBuilder('claims')
                            .leftJoinAndSelect('claims.policy', 'policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('claims.claimstate', 'state')
                            .where(`policy.branchid=${branchid}`)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findOneById(id: number): Promise<any> {
        return this.createQueryBuilder('claims')
                            .leftJoinAndSelect('claims.policy', 'policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('claims.claimstate', 'state')
                            .where(`claimid=${id}`)
                            .getOne();
    }
}
