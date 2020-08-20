
import {
    Authorized, Get, JsonController, Param
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

// import { CustomPricing } from '../models/CustomPricing';

import { CustomPricingService } from '../services/CustomPricingService';

import { ResponseMessage } from '../Common';
import { GeneralResponse } from './responses/CommonResponse';
import { DurationService } from '../services/DurationService';

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

    // @Get('/:id')
    // @ResponseSchema(CustomPricingResponse)
    // public async one(@Param('id') id: string): Promise<CustomPricingResponse> {
    //     const CustomPricing = await this.customPricingService.findOneById(parseInt(id, 10)) as CustomPricingDetail;
    //     if (CustomPricing) {
    //         return {status: ResponseMessage.SUCCEEDED, res: CustomPricing};
    //     } else {
    //         return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
    //     }
    // }

    // @Post('/create')
    // @ResponseSchema(CustomPricingResponse)
    // public async create(@Body() body: CustomPricingRegisterRequest): Promise<CustomPricingResponse> {
    //     let newCustomPricing = new CustomPricing();
    //     newCustomPricing = body as CustomPricing;
    //     const createdCustomPricing = await this.customPricingService.create(newCustomPricing) as CustomPricingDetail;

    //     return {status: ResponseMessage.SUCCEEDED, res: createdCustomPricing};
    // }

    // @Post('/update')
    // @ResponseSchema(CustomPricingResponse)
    // public async update(@Body() body: CustomPricingUpdateRequest): Promise<CustomPricingResponse> {
    //     const CustomPricing = await this.customPricingService.findOneById(body.CustomPricingid);

    //     if (CustomPricing) {
    //         let updateCustomPricing = new CustomPricing();
    //         updateCustomPricing = body as CustomPricing;
    //         const updatedCustomPricing = await this.customPricingService.update(updateCustomPricing) as CustomPricingDetail;

    //         return {status: ResponseMessage.SUCCEEDED, res: updatedCustomPricing };
    //     } else {
    //         return {status: ResponseMessage.NOT_FOUND_DURATION, res: undefined};
    //     }
    // }

    // @Delete('/:id')
    // @ResponseSchema(StatusResponse)
    // public async delete(@Param('id') id: string): Promise<StatusResponse> {
    //     const CustomPricingId = parseInt(id, 10);
    //     const CustomPricing = await this.customPricingService.findOneById(CustomPricingId);
    //     if (CustomPricing) {
    //         await this.customPricingService.delete(CustomPricingId);
    //         return {status: ResponseMessage.SUCCEEDED };
    //     } else {
    //         return {status: ResponseMessage.NOT_FOUND_DURATION };
    //     }
    // }

}
