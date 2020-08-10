import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Group } from '../models/Group';
import { GroupRepository } from '../repositories/GroupRepository';

@Service()
export class GroupService {

    constructor(
        @OrmRepository() private groupRepository: GroupRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Group[]> {
        this.log.info('Find all groups');
        return this.groupRepository.find();
    }

    public checkDuplicated(groupname: string): Promise<Group | undefined> {
        this.log.info('check duplicated group.');

        return this.groupRepository.findOne({groupname});
    }

    public async create(group: Group): Promise<Group> {
        this.log.info('Create a new group => ', group.groupname);

        const newGroup = await this.groupRepository.save(group);

        return newGroup;
    }

    public async update(group: Group): Promise<Group> {
        this.log.info('Update a group =>', group);

        const updateGroup = await this.groupRepository.save(group);

        return updateGroup;
    }

    public findOne(groupname: string): Promise<Group | undefined> {
        return this.groupRepository.findOne({groupname});
    }

    public findOneById(groupid: number): Promise<Group | undefined> {
        return this.groupRepository.findOne({groupid});
    }

    public async delete(groupid: number): Promise<void> {
        this.log.info('Delete a group');
        await this.groupRepository.delete(groupid);
        return;
    }
}
