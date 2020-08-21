
import {
    Get, Controller, Param, Req, Res
} from 'routing-controllers';
import {Request, Response} from 'express';
// import { OpenAPI } from 'routing-controllers-openapi';

import * as pdf from 'html-pdf';
import { DownloadService } from '../services/DownloadService';
import { PolicyService } from '../services/PolicyService';

// @Authorized()
@Controller('/download')
// @OpenAPI({ security: [{ bearerAuth: [] }] })
export class DownloadController {

    constructor(
        private downloadService: DownloadService,
        private policyService: PolicyService
    ) { }

    @Get('/agreement/:id')
    public async downloadAsPdf(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {

        const option = { format: 'Letter' };

        const data = await this.policyService.findOneById(parseInt(id, 10));
        const html = this.downloadService.printQuote(data);
        const fut = new Promise((resolve, reject) => {
            res.setHeader('Content-Type', 'application/pdf');
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

}
