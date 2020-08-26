
import {
    Authorized, Get, Post, JsonController, Param, Body, Delete, QueryParam
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Policy } from '../models/Policy';

import { PolicyService } from '../services/PolicyService';
import utilService from '../services/UtilService';

import { ResponseMessage } from '../Common';
import { PolicyRegisterRequest, PolicyUpdateRequest } from './requests/PolicyRequest';
import { PolicysResponse, PolicyResponse, PolicyDetail } from './responses/PolicyResponse';
import { StatusResponse } from './responses/CommonResponse';

@Authorized()
@JsonController('/policy')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class PolicyController {

    constructor(
        private policyService: PolicyService
    ) { }

    @Get('/:branchid')
    @ResponseSchema(PolicysResponse)
    public async one(@Param('branchid') branchid: string, @QueryParam('search', {required: false}) search: string): Promise<PolicysResponse> {
        let policy;
        if (search) {
            policy = await this.policyService.findByUserIdSearch(parseInt(branchid, 10), search) as PolicyDetail[];
        } else {
            policy = await this.policyService.findByUserId(parseInt(branchid, 10)) as PolicyDetail[];
        }
        if (policy) {
            return {status: ResponseMessage.SUCCEEDED, res: policy};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Get('/all/:limit')
    @ResponseSchema(PolicysResponse)
    public async find(@Param('limit') limit: string, @QueryParam('search', {required: false}) search: string): Promise<PolicysResponse> {
        let policys;
        if (search) {
            policys = await this.policyService.findAllBySearch(parseInt(limit, 10), search) as PolicyDetail[];
        } else {
            policys = await this.policyService.findAll(parseInt(limit, 10)) as PolicyDetail[];
        }

        return { status: ResponseMessage.SUCCEEDED, res: policys };
    }

    @Get('/one/:id')
    @ResponseSchema(PolicysResponse)
    public async policyOne(@Param('id') id: string): Promise<PolicyResponse> {
        const policy = await this.policyService.findOneById(parseInt(id, 10)) as PolicyDetail;
        if (policy) {
            if (policy.vehicle) {
                policy.vehicle.purchasedateDate = utilService.convertTimestampToDate(policy.vehicle.purchasedate);
                policy.vehicle.regdateDate = utilService.convertTimestampToDate(policy.vehicle.regdate);
            }
            return {status: ResponseMessage.SUCCEEDED, res: policy};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Post('/create')
    @ResponseSchema(PolicyResponse)
    public async create(@Body() body: PolicyRegisterRequest): Promise<PolicyResponse> {
        let newPolicy = new Policy();
        newPolicy = body as Policy;
        const createdPolicy = await this.policyService.create(newPolicy) as PolicyDetail;

        return {status: ResponseMessage.SUCCEEDED, res: createdPolicy};
    }

    @Post('/update')
    @ResponseSchema(PolicyResponse)
    public async update(@Body() body: PolicyUpdateRequest): Promise<PolicyResponse> {
        const policy = await this.policyService.findOneById(body.policyid);

        if (policy) {
            let updatePolicy = new Policy();
            updatePolicy = body as Policy;
            const updatedPolicy = await this.policyService.update(updatePolicy) as PolicyDetail;

            return {status: ResponseMessage.SUCCEEDED, res: updatedPolicy };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Delete('/:id')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('id') id: string): Promise<StatusResponse> {
        const policyId = parseInt(id, 10);
        const policy = await this.policyService.findOneById(policyId);
        if (policy) {
            await this.policyService.delete(policyId);
            return {status: ResponseMessage.SUCCEEDED };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION };
        }
    }

}
