import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Schedule } from '../models/Schedule';
import { ScheduleRepository } from '../repositories/ScheduleRepository';

@Service()
export class ScheduleService {

    constructor(
        @OrmRepository() private scheduleRepository: ScheduleRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Schedule[]> {
        this.log.info('Find all schedules');
        return this.scheduleRepository.find();
    }

    public async create(schedule: Schedule): Promise<Schedule> {
        this.log.info('Create a new schedule => ');

        const newSchedule = await this.scheduleRepository.save(schedule);

        return newSchedule;
    }

    public async update(schedule: Schedule): Promise<Schedule> {
        this.log.info('Update a schedule =>');

        const updateSchedule = await this.scheduleRepository.save(schedule);

        return updateSchedule;
    }

    public findOneById(id: number): Promise<Schedule | undefined> {
        return this.scheduleRepository.findOne({id});
    }

    public async delete(id: number): Promise<void> {
        this.log.info('Delete a schedule');
        await this.scheduleRepository.delete(id);
        return;
    }
}
