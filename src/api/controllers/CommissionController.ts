
import {
    Authorized, Get, JsonController, Param, Post, Body
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { CommissionService } from '../services/CommissionService';

import { ResponseMessage } from '../Common';
import { GeneralResponse } from './responses/CommonResponse';
import { CommissionRules } from '../models/CommissionRules';

@Authorized()
@JsonController('/commission')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {

    constructor(
        private commissionService: CommissionService
    ) { }

    @Get('/groupaccounts')
    @ResponseSchema(GeneralResponse)
    public async groupAssociateAccounts(): Promise<GeneralResponse> {
        const users = await this.commissionService.groupAssociateAccounts();

        return { status: ResponseMessage.SUCCEEDED, res: users };
    }

    @Get('/rules/:userid')
    @ResponseSchema(GeneralResponse)
    public async groupAssociatsByUserId(@Param('userid') userid: string): Promise<GeneralResponse> {
        const users = await this.commissionService.groupAssociatsByUserId(parseInt(userid, 10));

        return { status: ResponseMessage.SUCCEEDED, res: users };
    }

    @Post('/save')
    @ResponseSchema(GeneralResponse)
    public async saveRules(@Body() body: CommissionRules): Promise<GeneralResponse> {
        const newComRules = body as CommissionRules;
        const savedComRules = await this.commissionService.save(newComRules);

        return {status: ResponseMessage.SUCCEEDED, res: savedComRules };
    }

}
