import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import { UuidService } from './UuidService';
import utilApi from './UtilService';
import { ResponseMessage } from '../Common';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface,
        private uuidService: UuidService
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    // public findOne(id: string): Promise<User | undefined> {
    //     this.log.info('Find one user');
    //     return this.userRepository.findOne({ id });
    // }

    // public async create(user: User): Promise<User> {
    //     this.log.info('Create a new user => ', user.toString());
    //     user.id = uuid.v1();
    //     const newUser = await this.userRepository.save(user);
    //     this.eventDispatcher.dispatch(events.user.created, newUser);
    //     return newUser;
    // }

    // public update(id: string, user: User): Promise<User> {
    //     this.log.info('Update a user');
    //     user.id = id;
    //     return this.userRepository.save(user);
    // }

    // public async delete(id: string): Promise<void> {
    //     this.log.info('Delete a user');
    //     await this.userRepository.delete(id);
    //     return;
    // }

    public checkDuplicated(username: string): Promise<User | undefined> {
        this.log.info('check duplicated user.');
        // const role = UserRole.USER_CUSTOMER;
        return this.userRepository.findOne({username});
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.username);
        if (!user.appcode) {
            user.appcode = this.uuidService.unique7Digits();
        }

        // user.updated_at = new Date();
        // user.created_at = new Date();

        const newUser = await this.userRepository.save(user);

        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({username});
    }

    public async login(user: User): Promise<any> {

        const session_id = this.uuidService.uuid();
        const token = utilApi.getAuthToken({ username: user.username, password: user.password, session_id });

        this.eventDispatcher.dispatch(events.user.login, user);

        return {status: ResponseMessage.LOGINED, token};
    }
}
