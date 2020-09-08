import { Service } from 'typedi';
import * as request from 'request-promise-native';

import { ResponseMessage } from '../Common';
import { GeneralResponse } from '../controllers/responses/CommonResponse';

const ADDRESS_API = 'https://api.getaddress.io/v2/uk/';

@Service()
export class ExtService {

    public getApiUrl(postcode: string): string {
        return ADDRESS_API + postcode + '?api-key=aPcVxueEXkKLe8WLgpgpkg6847';
    }

    public async getAddresses(postcode: string): Promise<GeneralResponse> {
        try {
            const addresses = await request.get({url: this.getApiUrl(postcode)});
            if (addresses) {
                return { status: ResponseMessage.OK, res: JSON.parse(addresses) };
            }
        } catch (err) {
            return { status: ResponseMessage.FAILED, res: JSON.parse(err.response.body) };
        }
        return { status: ResponseMessage.FAILED, res: undefined };
    }
}
