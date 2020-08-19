
import {
    Authorized, Get, Post, JsonController, Param, Body, Delete
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Claim } from '../models/Claim';

import { ClaimService } from '../services/ClaimService';

import { ResponseMessage } from '../Common';
import { ClaimRegisterRequest, ClaimUpdateRequest } from './requests/ClaimRequest';
import { ClaimsResponse, ClaimResponse, ClaimDetail } from './responses/ClaimResponse';
import { StatusResponse } from './responses/CommonResponse';

@Authorized()
@JsonController('/claim')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class ClaimController {

    constructor(
        private claimService: ClaimService
    ) { }

    @Get('/:branchid')
    @ResponseSchema(ClaimsResponse)
    public async one(@Param('branchid') branchid: string): Promise<ClaimsResponse> {
        const policy = await this.claimService.findByUserId(parseInt(branchid, 10)) as ClaimDetail[];
        if (policy) {
            return {status: ResponseMessage.SUCCEEDED, res: policy};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Get('/all/:limit')
    @ResponseSchema(ClaimsResponse)
    public async find(@Param('limit') limit: string): Promise<ClaimsResponse> {
        const claims = await this.claimService.findAll(parseInt(limit, 10)) as ClaimDetail[];

        return { status: ResponseMessage.SUCCEEDED, res: claims };
    }

    @Get('/one/:id')
    @ResponseSchema(ClaimResponse)
    public async policyOne(@Param('id') id: string): Promise<ClaimResponse> {
        const policy = await this.claimService.findOneById(parseInt(id, 10)) as ClaimDetail;
        if (policy) {
            return {status: ResponseMessage.SUCCEEDED, res: policy};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Post('/create')
    @ResponseSchema(ClaimResponse)
    public async create(@Body() body: ClaimRegisterRequest): Promise<ClaimResponse> {
        let newClaim = new Claim();
        newClaim = body as Claim;
        const createdClaim = await this.claimService.create(newClaim) as ClaimDetail;

        return {status: ResponseMessage.SUCCEEDED, res: createdClaim};
    }

    @Post('/update')
    @ResponseSchema(ClaimResponse)
    public async update(@Body() body: ClaimUpdateRequest): Promise<ClaimResponse> {
        const claim = await this.claimService.findOneById(body.claimid);

        if (claim) {
            let updateClaim = new Claim();
            updateClaim = body as Claim;
            const updatedClaim = await this.claimService.update(updateClaim) as ClaimDetail;

            return {status: ResponseMessage.SUCCEEDED, res: updatedClaim };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Delete('/:id')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('id') id: string): Promise<StatusResponse> {
        const claimId = parseInt(id, 10);
        const claim = await this.claimService.findOneById(claimId);
        if (claim) {
            await this.claimService.delete(claimId);
            return {status: ResponseMessage.SUCCEEDED };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION };
        }
    }

}
