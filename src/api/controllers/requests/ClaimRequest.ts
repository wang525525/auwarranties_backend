import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { MailRegisterRequest } from './MailRequest';

export class ClaimRegisterRequest {

    @IsNumber()
    public mileageatclaim: number;

    @IsString()
    public failedpart: string;

    @IsString()
    public failedarea: string;

    @IsString()
    public failurecause: string;

    @IsString()
    public repairsrequired: string;

    @IsNumber()
    public labourperhour: number;

    @IsNumber()
    public partstotal: number;

    @IsNumber()
    public labourtotal: number;

    @IsNumber()
    public claimtotal: number;

    @IsBoolean()
    public payvat: boolean;

    @IsNumber()
    public adjustedclaim: number;

    @IsNumber()
    public policyid: number;

    @IsDate()
    public dateclaim: Date;

    @IsNumber()
    public claimdateseconds: number;

    @IsString()
    public claimnumber: string;

    @IsNumber()
    public state: number;

    @IsNumber()
    public calculatedtotal: number;

    @IsNumber()
    public claimvatamt: number;

    @IsNumber()
    public claimsvatcent: number;

    @IsString()
    public notes: string;

    @IsString()
    public claimnotifyemail: string;

    @IsDate()
    public paiddate: Date;

    @IsString()
    public lastservicedates: string;

    @IsBoolean()
    public faultdiagnosed: boolean;

    @IsBoolean()
    public confirmedwarrantyclaim: boolean;

    @IsBoolean()
    public advicedtodiagnosefault: boolean;

    @IsString()
    public advicedtosenddiagnostic: string;

    @IsString()
    public hasbooklet: string;

    @IsString()
    public repairinggarage: string;

    @IsBoolean()
    public adminresponded: boolean;

    @IsBoolean()
    public represponded: boolean;

    @IsDate()
    public adminrespondtime: Date;
}
export class ClaimUpdateRequest extends ClaimRegisterRequest {
    @IsNumber()
    public claimid: number;
}

export class ClaimHistoryRegisterRequest {

    @IsNumber()
    public claimid: number;

    @IsNumber()
    public statusid: number;

    @IsString()
    public claimnumber: string;

}

export class ClaimEmail {

    @IsNumber()
    public userid: number;

    public claim: ClaimHistoryRegisterRequest;

    public mail: MailRegisterRequest;
}
