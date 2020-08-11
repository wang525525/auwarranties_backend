import { EntityRepository, Repository } from 'typeorm';

import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User>  {

    /**
     * Find users included to the groupmembers by groupid
     */
    public findNonGroupMembers(): Promise<any> {
        return this.createQueryBuilder('users')
                            .select(['users.usertype', 'users.userid', 'users.companyname', 'users.town'])
                            .where('userid not in (select dealerid from groupmembers)')
                            .getMany();
    }
}
