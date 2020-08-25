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
                            .select(['claims.claimid', 'claims.state', 'claims.adminresponded', 'claims.claimnumber', 'claims.dateclaim', 
                                     'claims.claimdateseconds', 'claims.failedpart', 'claims.failurecause', 'claims.repairsrequired', 
                                     'claims.claimtotal', 'claims.represponded', 
                                     'policy.policyid', 'policy.policynumber', 
                                     'users.companyname', 'users.userid', 
                                     'state.stateid', 'state.statename'])
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
                            .select(['claims.claimid', 'claims.state', 'claims.adminresponded', 'claims.claimnumber', 'claims.dateclaim', 
                                     'claims.claimdateseconds', 'claims.failedpart', 'claims.failurecause', 'claims.repairsrequired', 
                                     'claims.claimtotal', 'claims.represponded', 
                                     'policy.policyid', 'policy.policynumber', 
                                     'users.companyname', 'users.userid', 
                                     'state.stateid', 'state.statename'])
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
