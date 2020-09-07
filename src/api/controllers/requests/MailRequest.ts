import { IsString, IsOptional } from 'class-validator';

export class MailRegisterRequest {

    @IsString()
    public from: string;

    @IsString()
    public to: string;

    @IsString()
    public subject: string;

    @IsOptional()
    @IsString()
    public text?: string;

    @IsOptional()
    @IsString()
    public html?: string;
}
