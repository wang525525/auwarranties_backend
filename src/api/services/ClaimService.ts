import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Claim } from '../models/Claim';
import { ClaimRepository } from '../repositories/ClaimRepository';

@Service()
export class ClaimService {

    constructor(
        @OrmRepository() private claimRepository: ClaimRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findAll(limit: number): Promise<Claim[]> {
        this.log.info('Find all claims');
        return this.claimRepository.findAll(limit);
    }

    public findAllBySearch(limit: number, search: string): Promise<Claim[]> {
        this.log.info('Find all claims');
        return this.claimRepository.findAllBySearch(limit, search);
    }

    public async create(claim: Claim): Promise<Claim> {
        this.log.info('Create a new claim => ');

        const newClaim = await this.claimRepository.save(claim);

        return newClaim;
    }

    public async update(claim: Claim): Promise<Claim> {
        this.log.info('Update a claim =>');

        const updateClaim = await this.claimRepository.save(claim);

        return updateClaim;
    }

    public async insertHistory(history: any): Promise<any> {
        this.log.info('Insert history in claim =>');

        const res = await this.claimRepository.insertHistory(history);

        return res;
    }

    public findByUserId(branchid: number): Promise<Claim[]> {
        return this.claimRepository.findByUserId(branchid);
    }

    public findByUserIdSearch(branchid: number, search: string): Promise<Claim[]> {
        return this.claimRepository.findByUserIdSearch(branchid, search);
    }

    public findOneById(claimid: number): Promise<Claim | undefined> {
        return this.claimRepository.findOneById(claimid);
    }

    public findOneForPdfById(claimid: number): Promise<Claim | undefined> {
        return this.claimRepository.findOneForPdfById(claimid);
    }

    public async delete(claimid: number): Promise<void> {
        this.log.info('Delete a claim');
        await this.claimRepository.delete(claimid);
        return;
    }
}
