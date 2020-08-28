import { EntityRepository, Repository } from 'typeorm';

import { Claim } from '../models/Claim';

@EntityRepository(Claim)
export class ClaimRepository extends Repository<Claim>  {
    /**
     * Find All Claims By limit count
     */
    public findAll(limit: number): Promise<any> {
        return this.getBaseQueryForList()
                            .select(this.getSelectArrayForList())
                            .take(limit)
                            .getMany();
    }

    /**
     * Find All Claims By Search and limit count
     */
    public findAllBySearch(limit: number, search: string): Promise<any> {
        return this.getBaseQueryForList()
                            .where(this.searchText(search))
                            .select(this.getSelectArrayForList())
                            .take(limit)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findByUserId(branchid: number): Promise<any> {
        return this.getBaseQueryForList()
                            .where(`policy.branchid=${branchid}`)
                            .select(this.getSelectArrayForList())
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findByUserIdSearch(branchid: number, search: string): Promise<any> {
        return this.getBaseQueryForList()
                            .where(`policy.branchid=${branchid} and (${this.searchText(search)})`)
                            .select(this.getSelectArrayForList())
                            .getMany();
    }

    /**
     * Get base Query for User Id.
     */
    public getBaseQueryForList(): any {
        return this.createQueryBuilder('claims')
                    .leftJoinAndSelect('claims.policy', 'policy')
                    .leftJoinAndSelect('policy.branchuser', 'users')
                    .leftJoinAndSelect('claims.claimstate', 'state');
    }

    /**
     * Get select array for User Id.
     */
    public getSelectArrayForList(): any {
        return ['claims.claimid', 'claims.state', 'claims.adminresponded', 'claims.claimnumber', 'claims.dateclaim',
                'claims.claimdateseconds', 'claims.failedpart', 'claims.failurecause', 'claims.repairsrequired',
                'claims.claimtotal', 'claims.represponded', 'claims.paiddate',
                'policy.policyid', 'policy.policynumber',
                'users.companyname', 'users.userid',
                'state.stateid', 'state.statename'];
    }

    /**
     * Get search query
     */
    public searchText(search: string): any {
        return `\
            claims.failedpart ilike '%${search}%' or claims.failedarea ilike '%${search}%' or claims.failurecause ilike '%${search}%' or \
            claims.repairsrequired ilike '%${search}%' or claims.claimnumber ilike '%${search}%' or \
            state.statename ilike '%${search}%' or \
            policy.policynumber ilike '%${search}%' or policy.address1 ilike '%${search}%' or policy.address2 ilike '%${search}%' or \
            policy.address3 ilike '%${search}%' or policy.email ilike '%${search}%' or policy.forename ilike '%${search}%' or \
            policy.surname ilike '%${search}%' or policy.postcode ilike '%${search}%' or policy.town ilike '%${search}%' or \
            users.companyname ilike '%${search}%'`;
    }
    /**
     * Find Policies By userid
     */
    public findOneById(id: number): Promise<any> {
        return this.createQueryBuilder('claims')
                            .leftJoinAndSelect('claims.policy', 'policy')
                            .leftJoinAndSelect('policy.branchuser', 'users')
                            .leftJoinAndSelect('policy.vehicle', 'vehicle')
                            .leftJoinAndSelect('policy.policystate', 'state')
                            .leftJoinAndSelect('policy.guarantee', 'guarantee')
                            .leftJoinAndSelect('guarantee.cover', 'covertype')
                            .leftJoinAndSelect('guarantee.duration', 'purchaseduration')
                            .where(`claimid=${id}`)
                            .select(['claims.claimid', 'claims.adjustedclaim', 'claims.calculatedtotal', 'claims.claimnumber', 'claims.claimtotal',
                                     'claims.claimdateseconds', 'claims.failedarea', 'claims.failedpart', 'claims.notes',
                                     'claims.failurecause', 'claims.labourperhour', 'claims.lastservicedates', 'claims.faultdiagnosed',
                                     'claims.confirmedwarrantyclaim', 'claims.advicedtodiagnosefault', 'claims.advicedtosenddiagnostic', 'claims.hasbooklet',
                                     'claims.repairinggarage', 'claims.labourtotal', 'claims.mileageatclaim', 'claims.partstotal', 'claims.payvat',
                                     'claims.repairsrequired', 'claims.claimvatamt', 'claims.claimnotifyemail', 'claims.state',
                                     'policy.policyid', 'policy.dateseconds', 'policy.policynumber', 'policy.title', 'policy.forename', 'policy.surname',
                                     'policy.address1', 'policy.address2', 'policy.address3', 'policy.town', 'policy.postcode', 'policy.branchname',
                                     'vehicle.vehicleid', 'vehicle.regdate', 'vehicle.carmake', 'vehicle.carmodel', 'vehicle.cartype', 'vehicle.fueltype',
                                     'vehicle.carcolour',
                                     'covertype.coverid', 'covertype.covername',
                                     'state.stateid', 'state.statename', 'state.statetype',
                                     'purchaseduration.durationid', 'purchaseduration.durationvalue', 'purchaseduration.durationtype',
                                     'guarantee.guaranteeid', 'guarantee.claimlimitamount'])
                            .getOne();
    }
}
