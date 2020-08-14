import { IsString, IsNumber, IsDate } from 'class-validator';

export class ScheduleRegisterRequest {

    @IsNumber()
    public day: number;

    @IsNumber()
    public hour: number;

    @IsString()
    public task: string;

    @IsString()
    public schedulename: string;

    @IsString()
    public repeat: string;

    @IsDate()
    public commence: Date;

    @IsNumber()
    public commenceseconds: number;

    @IsDate()
    public rundate: Date;

    @IsString()
    public message: string;

    @IsString()
    public notify: string;
}

export class ScheduleUpdateRequest extends ScheduleRegisterRequest {
    @IsNumber()
    public id: number;
}
