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
                                     'policy.address1', 'policy.address2', 'policy.address3', 'policy.town', 'policy.postcode',
                                     'vehicle.vehicleid', 'vehicle.regdate', 'vehicle.carmodel', 'vehicle.cartype', 'vehicle.fueltype', 'vehicle.carcolour',
                                     'covertype.coverid', 'covertype.covername',
                                     'purchaseduration.durationid', 'purchaseduration.durationvalue', 'purchaseduration.durationtype',
                                     'guarantee.guaranteeid', 'guarantee.claimlimitamount'])
                            .getOne();
    }
}
