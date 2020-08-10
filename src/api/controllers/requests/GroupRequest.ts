import { IsString, IsNumber } from 'class-validator';

export class GroupInfo {

    @IsString()
    public groupname: string;

}

export class GroupRegisterRequest extends GroupInfo {

}

export class GroupUpdateRequest extends GroupInfo {

    @IsNumber()
    public groupid: number;
}
