import { EntityRepository, Repository } from 'typeorm';

import { Invoice } from '../models/Invoice';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice>  {

    public getBaseQuery(): any {
        return this.createQueryBuilder('invoices')
                    .leftJoinAndSelect('invoices.dealer', 'users')
                    .leftJoinAndSelect('invoices.invoicestate', 'state');
    }

    /**
     * Find All Invoices by limit count
     */
    public findAll(limit: number): Promise<any> {
        return this.getBaseQuery()
                            .orderBy({'invoices.invoicedate': 'DESC'})
                            .take(limit)
                            .getMany();
    }

    /**
     * Find All Invoices by search and limit count
     */
    public findAllBySearch(limit: number, search: string): Promise<any> {
        return this.getBaseQuery()
                            .where(this.searchText(search))
                            .orderBy({'invoices.invoicedate': 'DESC'})
                            .take(limit)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findByUserId(dealerid: number): Promise<any> {
        return this.getBaseQuery()
                            .where(`invoices.dealerid=${dealerid}`)
                            .orderBy({'invoices.invoicedate': 'DESC'})
                            .getMany();
    }

    /**
     * Find Invoices By userid and search
     */
    public findByUserIdSearch(dealerid: number, search: string): Promise<any> {
        return this.getBaseQuery()
                            .where(`invoices.dealerid=${dealerid} and (${this.searchText(search)})`)
                            .orderBy({'invoices.invoicedate': 'DESC'})
                            .getMany();
    }

    public searchText(search: string): any {
        return `\
            invoices.invoicenumber ilike '%${search}%' \
        `;
    }

    /**
     * Find Policies By userid
     */
    public findOneById(id: number): Promise<any> {
        return this.getBaseQuery()
                            .where(`invoiceid=${id}`)
                            .getOne();
    }

    /**
     * Find Policies By userid
     */
    public getFilterDate(userid: number = undefined): Promise<any> {
        const sqlUserFilter = (userid) ? `where dealerid = ${userid}` : ``;
        return this.query(`select distinct(invoicedate) As invoicedate, invdateseconds  from invoices ${sqlUserFilter} \
                            order by invoicedate DESC`);
    }
}
