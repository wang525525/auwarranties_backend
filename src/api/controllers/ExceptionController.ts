
import {
    Authorized, Get, Post, JsonController, Param, Body, Delete
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Exception } from '../models/Exception';

import { ExceptionService } from '../services/ExceptionService';

import { ResponseMessage } from '../Common';
import { ExceptionRegisterRequest, ExceptionUpdateRequest } from './requests/ExceptionRequest';
import { ExceptionsResponse, ExceptionResponse, ExceptionDetail } from './responses/ExceptionResponse';
import { StatusResponse } from './responses/CommonResponse';

@Authorized()
@JsonController('/exception')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class ExceptionController {

    constructor(
        private exceptionService: ExceptionService
    ) { }

    @Get('')
    @ResponseSchema(ExceptionsResponse)
    public async find(): Promise<ExceptionsResponse> {
        const exceptions = await this.exceptionService.find() as ExceptionDetail[];

        return { status: ResponseMessage.SUCCEEDED, res: exceptions };
    }

    @Get('/:id')
    @ResponseSchema(ExceptionResponse)
    public async one(@Param('id') id: string): Promise<ExceptionResponse> {
        const exception = await this.exceptionService.findOneById(parseInt(id, 10)) as ExceptionDetail;
        if (exception) {
            return {status: ResponseMessage.SUCCEEDED, res: exception};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Post('/create')
    @ResponseSchema(ExceptionResponse)
    public async create(@Body() body: ExceptionRegisterRequest): Promise<ExceptionResponse> {
        let newException = new Exception();
        newException = body as Exception;
        const createdException = await this.exceptionService.create(newException) as ExceptionDetail;

        return {status: ResponseMessage.SUCCEEDED, res: createdException};
    }

    @Post('/update')
    @ResponseSchema(ExceptionResponse)
    public async update(@Body() body: ExceptionUpdateRequest): Promise<ExceptionResponse> {
        const exception = await this.exceptionService.findOneById(body.exceptionid);

        if (exception) {
            let updateException = new Exception();
            updateException = body as Exception;
            const updatedException = await this.exceptionService.update(updateException) as ExceptionDetail;

            return {status: ResponseMessage.SUCCEEDED, res: updatedException };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Delete('/:id')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('id') id: string): Promise<StatusResponse> {
        const exceptionId = parseInt(id, 10);
        const exception = await this.exceptionService.findOneById(exceptionId);
        if (exception) {
            await this.exceptionService.delete(exceptionId);
            return {status: ResponseMessage.SUCCEEDED };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION };
        }
    }

}
