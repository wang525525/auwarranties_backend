import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { PaymentIn } from '../models/PaymentIn';
import { PaymentInRepository } from '../repositories/PaymentInRepository';

@Service()
export class PaymentInService {

    constructor(
        @OrmRepository() private paymentInRepository: PaymentInRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<PaymentIn[]> {
        this.log.info('Find all paymentIns');
        return this.paymentInRepository.findAll();
    }

    public async create(paymentIn: PaymentIn): Promise<PaymentIn> {
        this.log.info('Create a new paymentIn => ');

        const newPaymentIn = await this.paymentInRepository.save(paymentIn);

        return newPaymentIn;
    }

    public async update(paymentIn: PaymentIn): Promise<PaymentIn> {
        this.log.info('Update a paymentIn =>');

        const updatePaymentIn = await this.paymentInRepository.save(paymentIn);

        return updatePaymentIn;
    }

    public findOneById(paymentid: number): Promise<PaymentIn | undefined> {
        return this.paymentInRepository.findOneById(paymentid);
    }

    public async delete(paymentInid: number): Promise<void> {
        this.log.info('Delete a paymentIn');
        await this.paymentInRepository.delete(paymentInid);
        return;
    }
}
