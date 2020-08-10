import { IsString, IsNumber, IsArray, IsJSON, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GroupDetail {

    @IsNumber()
    public groupid: number;

    @IsString()
    public groupname: string;

}

export class GroupsResponse {

    @IsString()
    public status: string;

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => GroupDetail)
    public res: GroupDetail[];

}

export class GroupResponse {

    @IsString()
    public status: string;

    @ValidateNested({ each: true })
    @IsJSON()
    @Type(() => GroupDetail)
    public res: GroupDetail;

}
