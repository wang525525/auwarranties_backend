import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Policy } from '../models/Policy';
import { PolicyRepository } from '../repositories/PolicyRepository';

@Service()
export class PolicyService {

    constructor(
        @OrmRepository() private policyRepository: PolicyRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findAll(): Promise<Policy[]> {
        this.log.info('Find all policys');
        return this.policyRepository.findAll();
    }

    public async create(policy: Policy): Promise<Policy> {
        this.log.info('Create a new policy => ');

        const newPolicy = await this.policyRepository.save(policy);

        return newPolicy;
    }

    public async update(policy: Policy): Promise<Policy> {
        this.log.info('Update a policy =>');

        const updatePolicy = await this.policyRepository.save(policy);

        return updatePolicy;
    }

    public findOneById(branchid: number): Promise<Policy | undefined> {
        return this.policyRepository.findOneById(branchid);
    }

    public async delete(policyid: number): Promise<void> {
        this.log.info('Delete a policy');
        await this.policyRepository.delete(policyid);
        return;
    }
}
