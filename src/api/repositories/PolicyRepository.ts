import { EntityRepository, Repository } from 'typeorm';

import { Policy } from '../models/Policy';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy>  {
    public getBaseQuery(): any {
        return this.createQueryBuilder('policy')
                    .leftJoinAndSelect('policy.branchuser', 'users')
                    .leftJoinAndSelect('policy.policystate', 'state')
                    .leftJoinAndSelect('policy.cover', 'covertype')
                    .leftJoinAndSelect('policy.vehicle', 'vehicle')
                    .leftJoinAndSelect('policy.guarantee', 'guarantee')
                    .leftJoinAndSelect('guarantee.duration', 'purchaseduration');
    }

    /**
     * Find All Policy by search text and limit count
     */
    public findAllBySearch(limit: number, search: string): Promise<any> {
        return this.getBaseQuery().where(search ? this.searchText(search) : ``)
                                  .take(limit)
                                  .getMany();
    }

    /**
     * Find Policies By userid and search text
     */
    public findByUserIdSearch(branchid: number, search: string): Promise<any> {
        return this.getBaseQuery().where(`branchid=${branchid} \
                                    ${search ? `and (${this.searchText(search)})` : ``}`)
                                  .getMany();
    }

    public searchText(search: string): any {
        return `\
            policy.address1 ilike '%${search}%' or policy.address2 ilike '%${search}%' or policy.address3 ilike '%${search}%' or \
            policy.company ilike '%${search}%' or policy.country ilike '%${search}%' or policy.email ilike '%${search}%' or \
            policy.forename ilike '%${search}%' or policy.mobile ilike '%${search}%' or policy.policynumber ilike '%${search}%' or \
            policy.postcode ilike '%${search}%' or policy.surname ilike '%${search}%' or policy.title ilike '%${search}%' or \
            policy.town ilike '%${search}%' or \
            vehicle.carmake ilike '%${search}%' or vehicle.carmodel ilike '%${search}%' or vehicle.cartype ilike '%${search}%' or \
            vehicle.fueltype ilike '%${search}%' or vehicle.transmission ilike '%${search}%' or vehicle.vin ilike '%${search}%' or \
            vehicle.extranum ilike '%${search}%' or \
            guarantee.covertype ilike '%${search}%' or guarantee.vehiclecategory ilike '%${search}%' or \
            purchaseduration.durationtype ilike '%${search}%'`;
    }

    /**
     * Find Policies By userid
     */
    public findOneById(id: number): Promise<any> {
        return this.getBaseQuery().where(`policyid=${id}`)
                            .getOne();
    }

    // public findOneForPdfById(policyid: number): Promise<any> {
    //     const query = `\
    //         select policy.branchid, policy.policynumber,policy.dateseconds as policydateseconds, users.usecustomlogo, \
    //         users.companyname as branchname, users.address1 as branchadd1, users.address2 as branchadd2, users.address3 as branchadd3, \
    //         users.postcode as branchpost, users.county as branchcounty, users.country as branchcountry, policy.title as custitle, \
    //         policy.forename as custforename, policy.surname as custlastname, policy.address1 as custadd1, policy.address2 as custadd2, \
    //         policy.address3 as custadd3, policy.postcode as custpostcode, policy.hometel as custhometel, policy.mobile as custmobile, \
    //         vehicle.vrm as vrm,vin,carmake, carmodel, cartype, carcolour, enginecapacity, transmission, fueltype, regdate, purchasedate, \
    //         mileage, purchaseprice, fourbyfour, luxury, specialist, guarantee.startdateseconds, covertype, vehiclecategory, \
    //         durationtype, durationvalue, claimlimitamount, retailprice from policy \
    //         left join vehicle on policy.policynumber = vehicle.policynumber \
    //         left join guarantee on policy.policynumber = guarantee.policynumber \
    //         left join purchaseduration on guarantee.durationid = purchaseduration.durationid \
    //         left join users on policy.branchid = users.userid \
    //         where policyid = ${policyid} \
    //     `;
    //     return this.query(query);
    // }
}
