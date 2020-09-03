
import {
    Get, Controller, Param, Req, Res
} from 'routing-controllers';
import {Request, Response} from 'express';
// import * as fs from 'fs';
import * as path from 'path';
// import { OpenAPI } from 'routing-controllers-openapi';

import * as pdf from 'html-pdf';
import { DownloadService } from '../services/DownloadService';
import { PolicyService } from '../services/PolicyService';
import { promisify } from 'util';
import { ClaimService } from '../services/ClaimService';

// @Authorized()
@Controller('/download')
// @OpenAPI({ security: [{ bearerAuth: [] }] })
export class DownloadController {

    constructor(
        private downloadService: DownloadService,
        private policyService: PolicyService,
        private claimService: ClaimService
    ) { }

    @Get('/agreement/:id')
    public async downloadAsPdfForAgreement(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
        const option = { format: 'Letter' };
        const data = await this.policyService.findOneForPdfById(parseInt(id, 10));
        const html = this.downloadService.printQuoteForPolicy(data[0]);
        const fut = new Promise((resolve, reject) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=AU Warranties Agreement ${data[0].policynumber}.pdf;`);
            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            pdf.create(html, option).toStream((err, stream) => {
                if (err) {
                    reject();
                } else {
                    stream.on('end', () => {
                        resolve();
                    });
                    stream.pipe(res);
                }
            });
        });

        await fut;
        res.end();
        return res;
    }

    @Get('/claim/:id')
    public async downloadAsPdfForClaim(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
        const option = { format: 'Letter' };
        const data = await this.claimService.findOneForPdfById(4435);
        const html = this.downloadService.printQuoteForClaim(data[0]);
        const fut = new Promise((resolve, reject) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=AU Warranties Agreement.pdf;`);
            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            pdf.create(html, option).toStream((err, stream) => {
                if (err) {
                    reject();
                } else {
                    stream.on('end', () => {
                        resolve();
                    });
                    stream.pipe(res);
                }
            });
        });

        await fut;
        res.end();
        return res;
    }

    @Get('/docs/:filename')
    public async downloadDocument(@Param('filename') filename: string, @Res() response: Response): Promise<any> {
        const dir = path.dirname(require.main.filename);
        const file = dir + '//public//docs//' + filename;
        await promisify<string, void>(response.download.bind(response))(file);
        return response;
    }

}
