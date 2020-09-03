import { Service } from 'typedi';

import * as fs from 'fs';
import * as path from 'path';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import utilService from './UtilService';

@Service()
export class DownloadService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public printQuote(data: any = undefined): string {
        this.log.info('Make the pdf file.');
        const dir = path.dirname(require.main.filename);
        let html = fs.readFileSync(dir + '/public/template/policy_pdf.html', 'utf8');

        html = html.replace('{{branchname}}', data.branchname);
        html = html.replace('{{branchadd1}}', data.branchadd1);
        html = html.replace('{{branchadd2}}', data.branchadd2);
        html = html.replace('{{branchadd3}}', data.branchadd3);
        html = html.replace('{{branchpost}}', data.branchpost);
        if (data.branchcounty !== '' && data.branchcountry !== '') {
            html = html.replace('{{branchlocation}}', data.branchcounty + ' ' + data.branchcountry);
        } else if (data.branchcounty !== '' && data.branchcountry === '') {
            html = html.replace('{{branchlocation}}', data.branchcounty);
        } else if (data.branchcounty === '' && data.branchcountry !== '') {
            html = html.replace('{{branchlocation}}', data.branchcountry);
        }
        html = html.replace('{{policydate}}', utilService.formatDateWithYYYYMMDD(data.datepolicy));
        html = html.replace('{{policynumber}}', data.policynumber);

        // customer details
        html = html.replace('{{policyname}}', `${data.custitle} ${data.custforename.toUpperCase()} ${data.custlastname.toUpperCase()}`);
        html = html.replace('{{custadd1}}', data.custadd1 === '' ? '' : utilService.toTitleCase(data.custadd1));
        html = html.replace('{{custadd2}}', data.custadd2 === '' ? '' : utilService.toTitleCase(data.custadd2));
        html = html.replace('{{custadd3}}', data.custadd3 === '' ? '' : utilService.toTitleCase(data.custadd3));
        html = html.replace('{{custpostcode}}', data.custpostcode);
        html = html.replace('{{custhometel}}', data.custhometel);

        // guarantee details
        html = html.replace('{{startdate}}', utilService.formatDateWithYYYYMMDD(data.startdate));
        html = html.replace('{{covertype}}', data.covertype);
        html = html.replace('{{vehiclecategory}}', data.vehiclecategory);
        html = html.replace('{{duration}}', `${utilService.toTitleCase(data.durationvalue.toString())} ${data.durationtype.toUpperCase()}`);
        html = html.replace('{{claimlimitamount}}', data.claimlimitamount);
        html = html.replace('{{retailprice}}', data.retailprice);

        // vehicle details
        html = html.replace('{{vrm}}', data.vrm.toUpperCase());
        html = html.replace('{{vin}}', data.vin.toUpperCase());
        html = html.replace('{{carmake}}', data.carmake.toUpperCase());
        html = html.replace('{{carmodel}}', data.carmodel);
        html = html.replace('{{cartype}}', `${data.cartype.toUpperCase()} ${data.carcolour.toUpperCase()}`);
        html = html.replace('{{enginecapacity}}', data.enginecapacity.toString().toUpperCase());
        html = html.replace('{{transmission}}', data.transmission.toUpperCase());
        html = html.replace('{{fueltype}}', data.fueltype.toUpperCase());
        html = html.replace('{{regdate}}',
                            utilService.formatDateWithYYYYMMDD(
                                (utilService.convertTimestampToDate(parseInt(data.regdate, 10))).toString()
                            ));
        html = html.replace('{{purchasedate}}',
                            utilService.formatDateWithYYYYMMDD(
                                (utilService.convertTimestampToDate(parseInt(data.purchasedate, 10))).toString()
                            ));
        html = html.replace('{{mileage}}', data.mileage.toString().toUpperCase());
        html = html.replace('{{purchaseprice}}', data.purchaseprice.toString().toUpperCase());
        html = html.replace('{{fourbyfour}}', data.fourbyfour ? 'Yes' : 'No');
        html = html.replace('{{luxury}}', data.luxury ? 'Yes' : 'No');
        html = html.replace('{{specialist}}', data.specialist ? 'Yes' : 'No');

        return html;
    }
}
