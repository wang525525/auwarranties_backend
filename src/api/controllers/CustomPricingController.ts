
import {
    Authorized, Get, JsonController, Param, Post, Body, Delete
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

// import { CustomPricing } from '../models/CustomPricing';

import { CustomPricingService } from '../services/CustomPricingService';

import { ResponseMessage } from '../Common';
import { GeneralResponse, StatusResponse } from './responses/CommonResponse';
import { DurationService } from '../services/DurationService';
import { CustomPricing } from '../models/CustomPricing';

@Authorized()
@JsonController('/custompricing')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class CustomPricingController {

    constructor(
        private customPricingService: CustomPricingService,
        private durationService: DurationService
    ) { }

    @Get('/rule/:userid')
    @ResponseSchema(GeneralResponse)
    public async findRuleByUserId(@Param('userid') userid: string): Promise<GeneralResponse> {
        const res = await this.customPricingService.findRuleByUserId(parseInt(userid, 10));

        if (res) {
            return { status: ResponseMessage.SUCCEEDED, res: res };
        } else {
            return {status: ResponseMessage.NOT_FOUND_CUSTOM_PRICING, res: undefined};
        }
    }

    @Get('/matrix/:userid')
    @ResponseSchema(GeneralResponse)
    public async findMatrixByUserId(@Param('userid') userid: string): Promise<GeneralResponse> {
        const cover = await this.customPricingService.findMatrixByUserId(parseInt(userid, 10));

        if (cover && cover.length > 0) {
            const duration = await this.durationService.find();

            if (duration && duration.length > 0) {
                const pricing = await this.customPricingService.findCustomPricingByUserId(parseInt(userid, 10));

                if (pricing && pricing.length > 0) {
                    cover.map(coveritem => {

                        const durationItems = [];
                        duration.map(durationitem => {
                            const secondDuration = {
                                durationid: durationitem.durationid,
                                durationtype: durationitem.durationtype,
                                durationvalue: durationitem.durationvalue,
                                coveramt: undefined,
                            };
                            const idx = pricing.findIndex(item => {
                                return  item.durationtype === durationitem.durationtype &&
                                        item.durationvalue === durationitem.durationvalue &&
                                        item.coverid === coveritem.coverid;
                            });

                            if (idx > -1) {
                                secondDuration.coveramt = pricing[idx].coveramt;
                            }
                            durationItems.push(secondDuration);
                        });
                        coveritem.duration = durationItems;
                    });
                    return {status: ResponseMessage.SUCCEEDED, res: cover};
                } else {
                    return {status: ResponseMessage.NOT_FOUND_CUSTOM_PRICING, res: undefined};
                }
            } else {
                return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
            }
        } else {
            return {status: ResponseMessage.NOT_FOUND_CUSTOM_PRICING, res: undefined};
        }
    }

    @Post('/save')
    @ResponseSchema(GeneralResponse)
    public async create(@Body() body: CustomPricing[]): Promise<GeneralResponse> {
        const newCustomPricings = body as CustomPricing[];
        const savedCustomPricing = await this.customPricingService.update(newCustomPricings);

        return {status: ResponseMessage.SUCCEEDED, res: savedCustomPricing};
    }

    @Delete('/:dealerid')
    @ResponseSchema(StatusResponse)
    public async delete(@Param('dealerid') dealerid: string): Promise<StatusResponse> {
        await this.customPricingService.delete(parseInt(dealerid, 10));
        return {status: ResponseMessage.SUCCEEDED };
    }

}
