
import {
    Authorized, Get, Post, JsonController, Param, Body, Delete
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Group } from '../models/Group';

import { GroupService } from '../services/GroupService';

import { ResponseMessage } from '../Common';
import { GroupRegisterRequest, GroupUpdateRequest } from './requests/GroupRequest';
import { GroupsResponse, GroupResponse, GroupDetail } from './responses/GroupResponse';
import { StatusResponse } from './responses/CommonResponse';

@Authorized()
@JsonController('/group')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class GroupController {

    constructor(
        private groupService: GroupService
    ) { }

    @Get('/all')
    @ResponseSchema(GroupsResponse)
    public async find(): Promise<GroupsResponse> {
        const groups = await this.groupService.find() as GroupDetail[];

        return { status: ResponseMessage.SUCCEEDED, res: groups };
    }

    @Get('/:id')
    @ResponseSchema(GroupResponse)
    public async one(@Param('id') id: string): Promise<GroupResponse> {
        const group = await this.groupService.findOneById(parseInt(id, 10)) as GroupDetail;
        if (group) {
            return {status: ResponseMessage.SUCCEEDED, res: group};
        } else {
            return {status: ResponseMessage.NOT_FOUND_GROUP, res: undefined};
        }
    }

    @Post('/create')
    @ResponseSchema(GroupResponse)
    public async create(@Body() body: GroupRegisterRequest): Promise<GroupResponse> {
        const groupname = body.groupname;

        const group = await this.groupService.checkDuplicated(groupname);
        if (group) {
            return {status: ResponseMessage.DUPLICATED_GROUPNAME, res: undefined};
        } else {
            let newGroup = new Group();
            newGroup = body as Group;
            const createdGroup = await this.groupService.create(newGroup) as GroupDetail;

            return {status: ResponseMessage.SUCCEEDED, res: createdGroup};
        }
    }

    @Post('/update')
    @ResponseSchema(GroupResponse)
    public async update(@Body() body: GroupUpdateRequest): Promise<GroupResponse> {
        const group = await this.groupService.findOneById(body.groupid);

        if (group) {
            let updateGroup = new Group();
            updateGroup = body as Group;
            console.log('updated group => ', updateGroup);
            const updatedGroup = await this.groupService.update(updateGroup) as GroupDetail;

            return {status: ResponseMessage.SUCCEEDED, res: updatedGroup };
        } else {
            return {status: ResponseMessage.NOT_FOUND_GROUP, res: undefined};
        }
    }

    @Delete('/:id')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('id') id: string): Promise<StatusResponse> {
        const groupId = parseInt(id, 10);
        const group = await this.groupService.findOneById(groupId);
        if (group) {
            await this.groupService.delete(groupId);
            return {status: ResponseMessage.SUCCEEDED };
        } else {
            return {status: ResponseMessage.NOT_FOUND_GROUP };
        }
    }

}
