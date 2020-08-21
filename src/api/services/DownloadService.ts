import { Service } from 'typedi';

import * as fs from 'fs';
import * as path from 'path';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Policy } from '../models/Policy';

@Service()
export class DownloadService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public printQuote(data: Policy): string {
        this.log.info('Make the pdf file.');
        const dir = path.dirname(require.main.filename);
        const html = fs.readFileSync(dir + '/public/template/pdf.html', 'utf8');

        return html;
    }
}
