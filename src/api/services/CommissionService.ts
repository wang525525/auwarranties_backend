import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { CommissionRepository } from '../repositories/CommissionRepository';
import { CommissionRules } from '../models/CommissionRules';

@Service()
export class CommissionService {

    constructor(
        @OrmRepository() private commissionRepository: CommissionRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public groupAssociateAccounts(): Promise<any> {
        this.log.info('Find Group Association Commissions');
        return this.commissionRepository.groupAssociateAccounts();
    }

    public groupAssociatsByUserId(commissionid: number): Promise<any> {
        this.log.info('Find Group Associates by commission id');
        return this.commissionRepository.groupAssociatsByUserId(commissionid);
    }

    public async save(commissionRules: CommissionRules): Promise<CommissionRules> {
        this.log.info('Save commission rules');

        const savedComRules = await this.commissionRepository.save(commissionRules);

        return savedComRules;
    }
}
