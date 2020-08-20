import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
// import { CustomPricing } from '../models/CustomPricing';
import { CustomPricingRepository } from '../repositories/CustomPricingRepository';

@Service()
export class CustomPricingService {

    constructor(
        @OrmRepository() private customPricingRepository: CustomPricingRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findRuleByUserId(userid: number): Promise<any | undefined> {
        this.log.info('Find custom pricing rules by userid');
        return this.customPricingRepository.findRuleByUserId(userid);
    }

    public findMatrixByUserId(userid: number): Promise<any | undefined> {
        this.log.info('Find custom pricing matrix by userid');
        return this.customPricingRepository.findMatrixByUserId(userid);
    }

    public findCustomPricingByUserId(userid: number): Promise<any | undefined> {
        this.log.info('Find custom pricing by userid');
        return this.customPricingRepository.findCustomPricingByUserId(userid);
    }

    // public find(): Promise<CustomPricing[]> {
    //     this.log.info('Find all customPricings');
    //     return this.customPricingRepository.find();
    // }

    // public async create(customPricing: CustomPricing): Promise<CustomPricing> {
    //     this.log.info('Create a new customPricing => ');

    //     const newCustomPricing = await this.customPricingRepository.save(customPricing);

    //     return newCustomPricing;
    // }

    // public async update(customPricing: CustomPricing): Promise<CustomPricing> {
    //     this.log.info('Update a customPricing =>');

    //     const updateCustomPricing = await this.customPricingRepository.save(customPricing);

    //     return updateCustomPricing;
    // }

    // public findOneById(customPricingid: number): Promise<CustomPricing | undefined> {
    //     return this.customPricingRepository.findOne({customPricingid});
    // }

    // public async delete(customPricingid: number): Promise<void> {
    //     this.log.info('Delete a customPricing');
    //     await this.customPricingRepository.delete(customPricingid);
    //     return;
    // }
}
