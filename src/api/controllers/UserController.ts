
import {
    Authorized, Get, JsonController
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { UserResponse } from './responses/UserResponse';

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get('/all')
    @ResponseSchema(UserResponse, { isArray: true })
    public find(): Promise<User[]> {
        return this.userService.find();
    }

}
