
import {
    Get, Controller, Param, Req, Res
} from 'routing-controllers';
import {Request, Response} from 'express';
// import * as fs from 'fs';
import * as path from 'path';
// import { OpenAPI } from 'routing-controllers-openapi';

import * as pdf from 'html-pdf';
import { DownloadService } from '../services/DownloadService';
// import { PolicyService } from '../services/PolicyService';
import { promisify } from 'util';

// @Authorized()
@Controller('/download')
// @OpenAPI({ security: [{ bearerAuth: [] }] })
export class DownloadController {

    constructor(
        private downloadService: DownloadService,
        // private policyService: PolicyService
    ) { }

    @Get('/agreement/:id')
    public async downloadAsPdf(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<Response> {
        const option = {
            format: 'Letter',
        };
        // res.setHeader('Content-Type', 'application/pdf');
        res.writeHead(200, { 'Content-Type': 'application/pdf' });
        // const data = await this.policyService.findOneById(parseInt(id, 10));
        const html = this.downloadService.printQuote();
        console.log('#######');
        const fut = new Promise((resolve, reject) => {
            console.log('@@@@@@@');
            pdf.create(html, option).toStream((err, stream) => {
                console.log('err======>', err);
                if (err) {
                    reject();
                } else {
                    console.log('&&&&&&&&&&');
                    // stream.on('end', () => {
                    //     resolve();
                    // });
                    stream.pipe(res);
                }
            });
        });

        await fut;
        res.end();
        console.log('===========>');
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
