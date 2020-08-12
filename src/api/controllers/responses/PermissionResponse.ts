import { IsString, IsNumber, IsArray, IsBoolean, IsJSON, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PermissionItemDetail } from '../requests/PermissionRequest';

export class PermissionDetail {

    @IsNumber()
    public permissionid: number;

    @IsString()
    public permissionname: string;

    @IsBoolean()
    public active: boolean;

    @IsArray()
    @IsOptional()
    public items: PermissionItemDetail[];

}

export class PermissionsResponse {

    @IsString()
    public status: string;

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => PermissionDetail)
    public res: PermissionDetail[];

}

export class PermissionResponse {

    @IsString()
    public status: string;

    @ValidateNested({ each: true })
    @IsJSON()
    @Type(() => PermissionDetail)
    public res: PermissionDetail;

}
