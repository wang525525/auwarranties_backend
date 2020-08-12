
import {
    Authorized, Get, Post, JsonController, Param, Body, Delete
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Permission } from '../models/Permission';

import { PermissionService } from '../services/PermissionService';

import { ResponseMessage } from '../Common';
import { PermissionRegisterRequest, PermissionUpdateRequest, PermissionItemDetail } from './requests/PermissionRequest';
import { PermissionsResponse, PermissionResponse, PermissionDetail } from './responses/PermissionResponse';
import { StatusResponse } from './responses/CommonResponse';

@Authorized()
@JsonController('/permission')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class PermissionController {

    constructor(
        private permissionService: PermissionService
    ) { }

    @Get('')
    @ResponseSchema(PermissionsResponse)
    public async find(): Promise<PermissionsResponse> {
        const permissions = await this.permissionService.find() as PermissionDetail[];

        return { status: ResponseMessage.SUCCEEDED, res: permissions };
    }

    @Get('/:id')
    @ResponseSchema(PermissionResponse)
    public async one(@Param('id') id: string): Promise<PermissionResponse> {
        const permission = await this.permissionService.findOneById(parseInt(id, 10)) as PermissionDetail;
        if (permission) {
            const items = await this.permissionService.findItems(permission.permissionid) as PermissionItemDetail[];
            permission.items = items;
            return {status: ResponseMessage.SUCCEEDED, res: permission};
        } else {
            return {status: ResponseMessage.NOT_FOUND_PERMISSION, res: undefined};
        }
    }

    @Post('/create')
    @ResponseSchema(PermissionResponse)
    public async create(@Body() body: PermissionRegisterRequest): Promise<PermissionResponse> {
        let newPermission = new Permission();
        newPermission = body as Permission;

        const permission = await this.permissionService.create(newPermission) as PermissionDetail;

        const permissionItems: PermissionItemDetail[] = [];
        if (body.items && body.items.length > 0) {
            body.items.map(item => {
                item.permissionid = permission.permissionid;
                permissionItems.push(item);
            });
        }

        const items = await this.permissionService.saveItems(permissionItems) as PermissionItemDetail[];
        permission.items = items;

        return {status: ResponseMessage.SUCCEEDED, res: permission};
    }

    @Post('/update')
    @ResponseSchema(PermissionResponse)
    public async update(@Body() body: PermissionUpdateRequest): Promise<PermissionResponse> {
        const permission = await this.permissionService.findOneById(body.permissionid);

        if (permission) {
            let updatePermission = new Permission();
            updatePermission = body as Permission;
            const updatedPermission = await this.permissionService.update(updatePermission) as PermissionDetail;

            await this.permissionService.deleteItems(updatedPermission.permissionid);

            const permissionItems: PermissionItemDetail[] = [];
            if (body.items && body.items.length > 0) {
                body.items.map(item => {
                    item.permissionid = updatedPermission.permissionid;
                    permissionItems.push(item);
                });
            }

            const items = await this.permissionService.saveItems(permissionItems) as PermissionItemDetail[];
            updatedPermission.items = items;

            return {status: ResponseMessage.SUCCEEDED, res: updatedPermission };
        } else {
            return {status: ResponseMessage.NOT_FOUND_PERMISSION, res: undefined};
        }
    }

    @Delete('/:id')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('id') id: string): Promise<StatusResponse> {
        const permissionId = parseInt(id, 10);
        await this.permissionService.delete(permissionId);
        await this.permissionService.deleteItems(permissionId);

        return {status: ResponseMessage.SUCCEEDED };
    }

}
