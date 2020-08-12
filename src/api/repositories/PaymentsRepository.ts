import { EntityRepository, Repository } from 'typeorm';

import { Payments } from '../models/Payments';

@EntityRepository(Payments)
export class PaymentsRepository extends Repository<Payments>  {
    /**
     * Find All Payments
     */
    public findAll(): Promise<any> {
        return this.createQueryBuilder('payments')
                            .leftJoinAndSelect('payments.dealer', 'users')
                            .orderBy({'users.username': 'ASC'})
                            .getMany();
    }

    /**
     * Find One payment by paymentId
     */
    public findOneById(paymentid: number): Promise<any> {
        return this.createQueryBuilder('payments')
                            .leftJoinAndSelect('payments.dealer', 'users')
                            .where(`payments.paymentid=${paymentid}`)
                            .orderBy({'users.username': 'ASC'})
                            .getMany();
    }
}
