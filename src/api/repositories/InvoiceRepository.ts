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
     * Find All Invoices by search and limit count
     */
    public findAllBySearch(limit: number, search: string, date: string): Promise<any> {
        return this.getBaseQuery()
                            .where(this.searchAll(search, date))
                            .orderBy({'invoices.invoicedate': 'DESC'})
                            .take(limit)
                            .getMany();
    }

    public searchAll(search: string, date: string): string {
        let res = '';
        if (search && !date) {
            res = this.searchText(search);
        } else if (search && date) {
            res = this.searchText(search) + 'and (' + this.searchDate(date) + ')';
        } else if (!search && date) {
            res = this.searchDate(date);
        } else {
            res = '';
        }
        console.log('res ==', res);
        return res;
    }

    /**
     * Find Invoices By userid and search
     */
    public findByUserIdSearch(dealerid: number, search: string, date: string): Promise<any> {
        return this.getBaseQuery()
                            .where(`invoices.dealerid=${dealerid} \
                                    ${search ? `and (${this.searchText(search)})` : ``} \
                                    ${date ? `and (${this.searchDate(date)})` : ``}`)
                            .orderBy({'invoices.invoicedate': 'DESC'})
                            .getMany();
    }

    public searchText(search: string): any {
        return `\
            invoices.invoicenumber ilike '%${search}%' \
        `;
    }

    public searchDate(date: string): any {
        return `\
            invoices.invoicedate = '${date}'
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
