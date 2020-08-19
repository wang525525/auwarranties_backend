import { EntityRepository, Repository } from 'typeorm';

import { Invoice } from '../models/Invoice';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice>  {
    /**
     * Find All Pricing Address, 'address', 'user.addressId = address.id'
     */
    public findAll(limit: number): Promise<any> {
        return this.createQueryBuilder('invoices')
                            .leftJoinAndSelect('invoices.dealer', 'users')
                            .leftJoinAndSelect('invoices.invoicestate', 'state')
                            .take(limit)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findByUserId(dealerid: number): Promise<any> {
        return this.createQueryBuilder('invoices')
                            .leftJoinAndSelect('invoices.dealer', 'users')
                            .leftJoinAndSelect('invoices.invoicestate', 'state')
                            .where(`invoices.dealerid=${dealerid}`)
                            .getMany();
    }

    /**
     * Find Policies By userid
     */
    public findOneById(id: number): Promise<any> {
        return this.createQueryBuilder('invoices')
                            .leftJoinAndSelect('invoices.dealer', 'users')
                            .leftJoinAndSelect('invoices.invoicestate', 'state')
                            .where(`invoiceid=${id}`)
                            .getOne();
    }
}
