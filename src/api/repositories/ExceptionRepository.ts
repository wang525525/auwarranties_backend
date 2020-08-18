import { EntityRepository, Repository } from 'typeorm';

import { Exception } from '../models/Exception';

@EntityRepository(Exception)
export class ExceptionRepository extends Repository<Exception>  {

    /**
     * Find All Exception
     */
    public findAll(): Promise<any> {
        return this.createQueryBuilder('pricingexception')
                            .leftJoinAndSelect('pricingexception.pricing', 'pricing')
                            .leftJoinAndSelect('pricingexception.dealer', 'users')
                            .leftJoinAndSelect('pricingexception.refund', 'refund')
                            .getMany();
    }

    /**
     * Find One Exception
     */
    public findOneById(exceptionid: number): Promise<any> {
        return this.createQueryBuilder('pricingexception')
                            .leftJoinAndSelect('pricingexception.pricing', 'pricing')
                            .leftJoinAndSelect('pricingexception.dealer', 'users')
                            .leftJoinAndSelect('pricingexception.refund', 'refund')
                            .where(`exceptionid=${exceptionid}`)
                            .getOne();
    }
}
