import { IsString, IsNumber, IsDate, IsArray, IsBoolean, IsJSON, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDetail } from './UserResponse';
import { StateDetail } from './StateResponse';
import { CoverTypeDetail } from './CoverTypeResponse';

export class PolicyDetail {

    @IsNumber()
    public policyid: number;

    @IsString()
    public address1: string;

    @IsString()
    public address2: string;

    @IsString()
    public address3: string;

    @IsString()
    public company: string;

    @IsString()
    public country: string;

    @IsString()
    public email: string;

    @IsString()
    public forename: string;

    @IsString()
    public hometel: string;

    @IsString()
    public mobile: string;

    @IsString()
    public policynumber: string;

    @IsString()
    public postcode: string;

    @IsString()
    public surname: string;

    @IsString()
    public title: string;

    @IsString()
    public town: string;

    @IsNumber()
    public recordtype: number;

    @IsNumber()
    public branchid: number;

    @ValidateNested({ each: true })
    @IsJSON()
    @Type(() => UserDetail)
    public branchuser: UserDetail;

    @IsString()
    public branchname: string;

    @IsNumber()
    public dateseconds: number;

    @IsNumber()
    public coverid: number;

    @ValidateNested({ each: true })
    @IsJSON()
    @Type(() => CoverTypeDetail)
    public cover: CoverTypeDetail;

    @IsNumber()
    public operator: number;

    @IsNumber()
    public state: number;

    @ValidateNested({ each: true })
    @IsJSON()
    @Type(() => StateDetail)
    public policystate: StateDetail;

    @IsDate()
    public datepolicy: Date;

    @IsNumber()
    public invoiceid: number;

    @IsNumber()
    public nett: number;

    @IsNumber()
    public tax: number;

    @IsNumber()
    public gross: number;

    @IsString()
    public invoicenumber: string;

    @IsNumber()
    public vatpercent: number;

    @IsString()
    public county: string;

    @IsNumber()
    public poladmincosttype: number;

    @IsNumber()
    public poladmincostcent: number;

    @IsNumber()
    public poladmincostamt: number;

    @IsNumber()
    public pricepaid: number;

    @IsNumber()
    public deposit: number;

    @IsString()
    public notifyemail: string;

    @IsNumber()
    public policycommissionaccount: number;

    @IsNumber()
    public policycommissiontype: number;

    @IsNumber()
    public policycommissioncent: number;

    @IsNumber()
    public policycommissionamt: number;

    @IsNumber()
    public policycommissionvalue: number;

    @IsNumber()
    public policycommissionpaytype: number;

    @IsString()
    public vatcalculation: string;

    @IsNumber()
    public policyrefundtype: number;

    @IsNumber()
    public policyrefundvalue: number;

    @IsString()
    public policyrefundduration: string;

    @IsBoolean()
    public refunddone: boolean;

    @IsNumber()
    public taxadmin: number;

    @IsDate()
    public dateexpiry: Date;

}

export class PolicysResponse {

    @IsString()
    public status: string;

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => PolicyDetail)
    public res: PolicyDetail[];

}

export class PolicyResponse {

    @IsString()
    public status: string;

    @ValidateNested({ each: true })
    @IsJSON()
    @Type(() => PolicyDetail)
    public res: PolicyDetail;

}
