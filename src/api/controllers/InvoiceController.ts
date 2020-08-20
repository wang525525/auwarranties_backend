
import {
    Authorized, Get, Post, JsonController, Param, Body, Delete
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Invoice } from '../models/Invoice';

import { InvoiceService } from '../services/InvoiceService';

import { ResponseMessage } from '../Common';
import { InvoiceRegisterRequest, InvoiceUpdateRequest } from './requests/InvoiceRequest';
import { InvoicesResponse, InvoiceResponse, InvoiceDetail } from './responses/InvoiceResponse';
import { StatusResponse } from './responses/CommonResponse';

@Authorized()
@JsonController('/invoice')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class InvoiceController {

    constructor(
        private invoiceService: InvoiceService
    ) { }

    @Get('/:userid')
    @ResponseSchema(InvoicesResponse)
    public async one(@Param('userid') userid: string): Promise<InvoicesResponse> {
        const invoice = await this.invoiceService.findByUserId(parseInt(userid, 10)) as InvoiceDetail[];
        if (invoice) {
            return {status: ResponseMessage.SUCCEEDED, res: invoice};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Get('/all/:limit')
    @ResponseSchema(InvoicesResponse)
    public async find(@Param('limit') limit: string): Promise<InvoicesResponse> {
        const invoices = await this.invoiceService.findAll(parseInt(limit, 10)) as InvoiceDetail[];

        return { status: ResponseMessage.SUCCEEDED, res: invoices };
    }

    @Get('/one/:id')
    @ResponseSchema(InvoicesResponse)
    public async invoiceOne(@Param('id') id: string): Promise<InvoiceResponse> {
        const invoice = await this.invoiceService.findOneById(parseInt(id, 10)) as InvoiceDetail;
        if (invoice) {
            return {status: ResponseMessage.SUCCEEDED, res: invoice};
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Post('/create')
    @ResponseSchema(InvoiceResponse)
    public async create(@Body() body: InvoiceRegisterRequest): Promise<InvoiceResponse> {
        let newInvoice = new Invoice();
        newInvoice = body as Invoice;
        const createdInvoice = await this.invoiceService.create(newInvoice) as InvoiceDetail;

        return {status: ResponseMessage.SUCCEEDED, res: createdInvoice};
    }

    @Post('/update')
    @ResponseSchema(InvoiceResponse)
    public async update(@Body() body: InvoiceUpdateRequest): Promise<InvoiceResponse> {
        const invoice = await this.invoiceService.findOneById(body.invoiceid);

        if (invoice) {
            let updateInvoice = new Invoice();
            updateInvoice = body as Invoice;
            const updatedInvoice = await this.invoiceService.update(updateInvoice) as InvoiceDetail;

            return {status: ResponseMessage.SUCCEEDED, res: updatedInvoice };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
        }
    }

    @Delete('/:id')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('id') id: string): Promise<StatusResponse> {
        const invoiceId = parseInt(id, 10);
        const invoice = await this.invoiceService.findOneById(invoiceId);
        if (invoice) {
            await this.invoiceService.delete(invoiceId);
            return {status: ResponseMessage.SUCCEEDED };
        } else {
            return {status: ResponseMessage.NOT_FOUND_DURATION };
        }
    }

}