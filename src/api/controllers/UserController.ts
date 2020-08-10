
import {
    Authorized, Get, JsonController
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserService } from '../services/UserService';
import { UserResponse, UserDetail } from './responses/UserResponse';
import { ResponseMessage } from '../Common';

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get('/all')
    @ResponseSchema(UserResponse)
    public async find(): Promise<UserResponse> {
        const users = await this.userService.find() as UserDetail[];

        return { status: ResponseMessage.SUCCEEDED, res: users };
    }

    // @Get('/:id')
    // public async one(@Param('id') id: string): Promise<any> {
    //     const user = await this.userService.findOne(id);
    //     return {status: ResponseMessage.OK, user};
    // }

}
