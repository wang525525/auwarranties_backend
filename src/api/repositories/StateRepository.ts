import { EntityRepository, Repository } from 'typeorm';

import { State } from '../models/State';

@EntityRepository(State)
export class StateRepository extends Repository<State>  {

}
