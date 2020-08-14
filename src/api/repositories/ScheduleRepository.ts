import { EntityRepository, Repository } from 'typeorm';

import { Schedule } from '../models/Schedule';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule>  {

}
