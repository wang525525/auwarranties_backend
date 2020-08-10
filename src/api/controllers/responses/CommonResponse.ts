import { IsString } from 'class-validator';

export class StatusResponse {

    @IsString()
    public status: string;

}
