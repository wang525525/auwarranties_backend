import { EntityRepository, Repository } from 'typeorm';

import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User>  {

    /**
     * Find users included to the groupmembers by groupid
     */
    public findNonGroupMembers(): Promise<any> {
        return this.createQueryBuilder('users')
                            .select(['users.usertype', 'users.userid', 'users.companyname', 'users.town'])
                            .where('userid not in (select dealerid from groupmembers)')
                            .getMany();
    }

    /**
     * Get user status by user id
     */
    public statusByUserId(userid: number): Promise<any> {
        return this.query(` \
            select \
            (select count(*) from policy where branchid = ${userid} and state is null ) as policynotinvoiced, \
            (select count(*) from policy, invoices where policy.branchid = ${userid} and invoices.invoiceid = policy.invoiceid) \
            as policyinvoiced, \
            (select sum(policy.gross) from policy, invoices where policy.branchid = ${userid} and invoices.invoiceid = policy.invoiceid ) \
            as policyinvoicedtotal,
            (select count(*) from policy, invoices where policy.branchid = ${userid} and invoices.state = 10 and \
            policy.invoiceid = invoices.invoiceid ) as policypaid,
            (select sum(policy.gross - policy.tax - coalesce(policy.taxadmin,0)) from policy, invoices where \
            policy.branchid = ${userid} and invoices.state = 10 and policy.invoiceid = invoices.invoiceid ) as policypaidtotal,
            (select sum(policy.tax + coalesce(policy.taxadmin,0)) from policy, invoices where policy.branchid = ${userid} and \
            invoices.state = 10 and policy.invoiceid = invoices.invoiceid ) as policypaidvattotal,
            (select count(*) from policy, invoices where policy.branchid = ${userid} and invoices.state = 9 and \
            policy.invoiceid = invoices.invoiceid ) as policypending,
            (select sum(policy.gross) from policy, invoices where policy.branchid = ${userid} and invoices.state = 9 and \
            policy.invoiceid = invoices.invoiceid ) as policypendingtotal, \
            (select count(*) from policy where branchid = ${userid} ) as policycount, \
            (select sum(gross) from policy where branchid = ${userid} ) as policycounttotal, \
            (select count(*) from invoices where dealerid = ${userid} ) as totalinvoices, \
            (select sum(gross) from invoices where dealerid = ${userid} ) as invoicestotal, \
            (select count(*) from invoices where dealerid = ${userid} and state = 9 ) as invoicespending, \
            (select sum(gross) from invoices where dealerid = ${userid} and state = 9) as invoicespendingtotal, \
            (select count(*) from invoices where dealerid = ${userid} and state = 10 ) as invoicespaid, \
            (select sum(gross) from invoices where dealerid = ${userid} and state = 10 ) as invoicespaidtotal, \
            (select count(*) from claims  left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} ) \
            as claimscount, \
            (select sum(claimtotal) from claims  left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} ) \
            as claimstotal, \
            (select count(*) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 12 ) as claimssubmitted, \
            (select sum(claimtotal) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 12 ) as claimssubmittedtotal, \
            (select count(*) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 13) as claimsaccepted, \
            (select sum(claimtotal) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 13 ) as claimsacceptedtotal, \
            (select count(*) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 14 ) as claimspaid, \
            (select sum(claimtotal) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 14 ) as claimspaidtotal, \
            (select count(*) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 15 ) as claimdocuments, \
            (select sum(claimtotal) from claims left join policy on claims.policyid = policy.policyid where policy.branchid = ${userid} and \
            claims.state = 15 ) as claimdocumentstotal, \
            (select sum(paymentamount) from payments left join users on payments.dealerid = users.userid where payments.dealerid = ${userid}) \
            as fundsreturned,
            (select sum(paymentamount) from paymentsin left join users on paymentsin.dealerid = users.userid where paymentsin.dealerid = ${userid}) \
            as fundsreceived, \
            (select refundafter from users where userid = ${userid}) as refundafter, \
            (select coalesce( (select sum \
            (case when poladmincosttype = 0 then nett \
            when poladmincosttype = 1 then ( nett - (nett * ( poladmincostcent / 100 ))) \
            when poladmincosttype = 2 then (nett - poladmincostamt) end) \
            from policy, invoices where branchid = ${userid} \
            and policy.policyrefundtype is null \
            and policy.invoiceid = invoices.invoiceid and invoices.state = 10) , 0) \
            + \
            coalesce( (select sum \
            (case when poladmincosttype = 0 then nett \
            when poladmincosttype = 1 then ( nett - (nett * ( poladmincostcent / 100 ))) \
            when poladmincosttype = 2 then (nett  ) end) \
            from policy, invoices where branchid = ${userid} \
            and policy.policyrefundtype is not null \
            and policy.policyrefundtype <> 0 \
            and policy.invoiceid = invoices.invoiceid and invoices.state = 10) , 0) ) \
            as policynettotal`);
    }
}
