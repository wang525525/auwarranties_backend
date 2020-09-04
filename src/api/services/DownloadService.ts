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

    // for agreement
    public printQuoteForPolicy(data: any = undefined): string {
        this.log.info('Make the pdf file for Policy.');
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
        html = html.replace('{{duration}}', `${utilService.toTitleCase(data.durationvalue.toString())} ${utilService.toUpperCase(data.durationtype)}`);
        html = html.replace('{{claimlimitamount}}', data.claimlimitamount);
        html = html.replace('{{retailprice}}', data.retailprice);

        // vehicle details
        html = html.replace('{{vrm}}', utilService.toUpperCase(data.vrm));
        html = html.replace('{{vin}}', utilService.toUpperCase(data.vin));
        html = html.replace('{{carmake}}', utilService.toUpperCase(data.carmake));
        html = html.replace('{{carmodel}}', data.carmodel);
        html = html.replace('{{cartype}}', `${utilService.toUpperCase(data.cartype)} ${utilService.toUpperCase(data.carcolour)}`);
        html = html.replace('{{enginecapacity}}', utilService.toUpperCase(data.enginecapacity.toString()));
        html = html.replace('{{transmission}}', utilService.toUpperCase(data.transmission));
        html = html.replace('{{fueltype}}', utilService.toUpperCase(data.fueltype));
        html = html.replace('{{regdate}}',
                            utilService.formatDateWithYYYYMMDD(
                                (utilService.convertTimestampToDate(parseInt(data.regdate, 10))).toString()
                            ));
        html = html.replace('{{purchasedate}}',
                            utilService.formatDateWithYYYYMMDD(
                                (utilService.convertTimestampToDate(parseInt(data.purchasedate, 10))).toString()
                            ));
        html = html.replace('{{mileage}}', utilService.toUpperCase(data.mileage.toString()));
        html = html.replace('{{purchaseprice}}', utilService.toUpperCase(data.purchaseprice.toString()));
        html = html.replace('{{fourbyfour}}', data.fourbyfour ? 'Yes' : 'No');
        html = html.replace('{{luxury}}', data.luxury ? 'Yes' : 'No');
        html = html.replace('{{specialist}}', data.specialist ? 'Yes' : 'No');

        return html;
    }

    // for claim
    public printQuoteForClaim(data: any = undefined, claimparts: any = undefined, claimlabours: any = undefined): string {
        this.log.info('Make the pdf file for Claim.');
        const dir = path.dirname(require.main.filename);
        let html = fs.readFileSync(dir + '/public/template/claim_pdf.html', 'utf8');

        html = html.replace('{{claimdate}}',
                                utilService.formatDateWithYYYYMMDD(
                                    (utilService.convertTimestampToDate(parseInt(data.claimdateseconds, 10))).toString()
                            ));
        html = html.replace('{{claimnumber}}', data.claimnumber);
        html = html.replace('{{agreement}}', `${data.policynumber} (${
                                utilService.formatDateWithYYYYMMDD(
                                    (utilService.convertTimestampToDate(parseInt(data.claimdateseconds, 10))).toString()
                                )})`
                            );
        html = html.replace('{{claimname}}', `${utilService.toUpperCase(data.title)} \
                                            ${utilService.toUpperCase(data.forename)} \
                                            ${utilService.toUpperCase(data.surname)}`);
        const regYear = new Date(utilService.convertTimestampToDate(data.regdate)).getFullYear();
        html = html.replace('{{vehicleinfo}}', `${data.carmake} ${data.carmodel} ${data.cartype} ${regYear} ${data.fueltype} ${data.carcolour} \
                                                ${data.covername} ${data.durationvalue} ${data.durationtype} Claim Limit: ${data.claimlimitamount}`);
        html = html.replace('{{claimaddr}}', `${utilService.toTitleCase(data.address1)} ${utilService.toTitleCase(data.address2)} \
                                                ${utilService.toTitleCase(data.address3)} \
                                                ${utilService.toUpperCase(data.town)} ${utilService.toUpperCase(data.postcode)}`);

        html = html.replace('{{mileage}}', data.mileageatclaim);
        html = html.replace('{{failedarea}}', utilService.toTitleCase(data.failedarea));
        html = html.replace('{{failedpart}}', utilService.toTitleCase(data.failedpart));
        html = html.replace('{{labourperhour}}', data.labourperhour);
        html = html.replace('{{failurecause}}', data.failurecause);

        let parts = '';
        if (claimparts && claimparts.length > 0) {
            claimparts.map(part => {
                parts += `\
                    <tr>\
                        <td style="width: 20%;">\
                            ${part.partnumber}\
                        </td>\
                        <td style="width: 10%;">\
                            ${part.qty}\
                        </td>\
                        <td style="width: 10%;">\
                            ${part.partprice}\
                        </td>\
                        <td style="width: 60%;">\
                            ${part.partdesc}\
                        </td>\
                    </tr>\
                `;
            });
        }
        html = html.replace('{{claimparts}}', parts);

        let labours = '';
        if (claimlabours && claimlabours.length > 0) {
            claimlabours.map(labour => {
                labours += `\
                    <tr>\
                        <td style="width: 20%;">\
                            ${labour.labourqty}\
                        </td>\
                        <td style="width: 10%;">\
                            ${labour.labourprice}\
                        </td>\
                        <td style="width: 70%;">\
                            ${labour.labourdesc}\
                        </td>\
                    </tr>\
                `;
            });
        }
        html = html.replace('{{claimlabours}}', labours);

        html = html.replace('{{vat}}', data.payvat ? 'Yes' : 'No');
        html = html.replace('{{partstotal}}', data.partstotal);
        html = html.replace('{{claimvatamt}}', data.claimvatamt);
        html = html.replace('{{labourtotal}}', data.labourtotal);
        html = html.replace('{{calculatedtotal}}', data.calculatedtotal);
        html = html.replace('{{adjustedclaim}}', data.adjustedclaim);
        html = html.replace('{{claimtotal}}', data.claimtotal);
        return html;
    }

    // for invoice
    public printQuoteForInvoice(data: any = undefined, userData: any = undefined, invoiceIds: number[] = undefined): string {
        this.log.info('Make the pdf file for Invoice.');
        const dir = path.dirname(require.main.filename);
        const html = fs.readFileSync(dir + '/public/template/invoice_pdf.html', 'utf8');

        if (invoiceIds && invoiceIds.length > 0) {
            invoiceIds.map(invoiceid => {
                
            });
        }

        return html + html + html;
    }
}
