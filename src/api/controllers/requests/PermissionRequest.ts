import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PermissionRegisterRequest {

    @IsString()
    public permissionname: string;

    @IsBoolean()
    @IsOptional()
    public active?: boolean;

    @ValidateNested({each: true})
    @IsArray()
    @Type(() => PermissionItemDetail)
    @IsOptional()
    public items?: PermissionItemDetail[];

}

export class PermissionUpdateRequest extends PermissionRegisterRequest {
    @IsNumber()
    public permissionid: number;
}

export class PermissionItemDetail {

    @IsNumber()
    public permissionid: number;

    @IsBoolean()
    @IsOptional()
    public permissionvalue?: boolean;

    @IsString()
    @IsOptional()
    public permissiontype?: string;

}
