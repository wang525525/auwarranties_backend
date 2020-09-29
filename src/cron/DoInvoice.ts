import { Logger } from '../lib/logger';

export async function doInvoices(scheduleId: number,
                                startdt: Date = undefined,
                                enddt: Date = undefined,
                                userId: number = 0,
                                invoiceNumber: string = ''): Promise<void> {
    const log = new Logger(__filename);
    log.info('Do Invoices.');
    
}
