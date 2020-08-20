import { EntityRepository, Repository } from 'typeorm';

import { CommissionRules } from '../models/CommissionRules';

@EntityRepository(CommissionRules)
export class CommissionRepository extends Repository<CommissionRules>  {

    public groupAssociateAccounts(): Promise<any> {
        return this.query(`select userid, companyname from users where userid in (select distinct(accountid) from groupassociation) order by companyname`);
    }

    public groupAssociatsByUserId(userid: number): Promise<any> {
        const query = `\
            SELECT companyname, users.userid, groupassociation.groupid, \
            coalesce((select distinct(commissionpaytype) from commissionrules where accountid = ${userid} and dealerid = users.userid), \
                coalesce(k.commissionpaid, 0)) as commissionpaytype, \
            coalesce((select distinct(commissiontype) from commissionrules where accountid = ${userid} and dealerid = users.userid), \
                coalesce( k.commissiontype, 0)) as commissiontype, \
            coalesce((select distinct(commissioncent) from commissionrules where accountid = ${userid} and dealerid = users.userid), \
                coalesce( k.commissioncent, '0.00')) as commissioncent, \
            coalesce((select distinct(commissionamt) from commissionrules where accountid = ${userid} and dealerid = users.userid), \
                coalesce( k.commissionamt,'0.00')) as commissionamt, \
            coalesce((select cmpt.paytypevalue from commissionrules left join commissionpaytype as cmpt on cmpt.paytypeid = commissionpaytype \
                where accountid = ${userid} and dealerid = users.userid), \
                coalesce( k.paytypevalue,'')) as paytypevalue, \
            coalesce((select cmt.typevalue from commissionrules left join commissiontype as cmt on cmt.typeid = commissiontype \
                where accountid = ${userid} and dealerid = users.userid), \
                coalesce( k.typevalue,'')) as typevalue, \
            k.commissiontype as currcomtype, k.commissioncent as currcomcent, k.commissionamt as currcomamt, k.commissionpaid as currcompaytype \
            FROM groupassociation, groupmembers, users, \
            (select commissiontype, commissioncent, commissionamt, commissionpaid, cmpt.paytypevalue, cmt.typevalue from users \
            left join commissionpaytype as cmpt on cmpt.paytypeid = commissionpaid \
            left join commissiontype as cmt on cmt.typeid = commissiontype \
            where userid = ${userid}) k \
            where groupassociation.accountid = ${userid} and groupassociation.groupid = groupmembers.groupid and \
                groupmembers.dealerid = users.userid order by companyname`;
        return this.query(query);
    }
}
