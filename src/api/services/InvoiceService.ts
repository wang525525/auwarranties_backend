import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Invoice } from '../models/Invoice';
import { InvoiceRepository } from '../repositories/InvoiceRepository';

@Service()
export class InvoiceService {

    constructor(
        @OrmRepository() private invoiceRepository: InvoiceRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findAll(limit: number): Promise<Invoice[]> {
        this.log.info('Find all invoices');
        return this.invoiceRepository.findAll(limit);
    }

    public async create(invoice: Invoice): Promise<Invoice> {
        this.log.info('Create a new invoice => ');

        const newInvoice = await this.invoiceRepository.save(invoice);

        return newInvoice;
    }

    public async update(invoice: Invoice): Promise<Invoice> {
        this.log.info('Update a invoice =>');

        const updateInvoice = await this.invoiceRepository.save(invoice);

        return updateInvoice;
    }

    public findByUserId(dealerid: number): Promise<Invoice[]> {
        return this.invoiceRepository.findByUserId(dealerid);
    }

    public findOneById(invoiceid: number): Promise<Invoice | undefined> {
        return this.invoiceRepository.findOneById(invoiceid);
    }

    public async delete(invoiceid: number): Promise<void> {
        this.log.info('Delete a invoice');
        await this.invoiceRepository.delete(invoiceid);
        return;
    }
}
