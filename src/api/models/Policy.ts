import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { User } from './User';
import { State } from './State';
import { CoverType } from './CoverType';
import { Vehicle } from './Vehicle';

@Entity('policy')
export class Policy {

    @PrimaryGeneratedColumn()
    public policyid: number;

    @Column({
        nullable: true,
    })
    public address1: string;

    @Column({
        nullable: true,
    })
    public address2: string;

    @Column({
        nullable: true,
    })
    public address3: string;

    @Column({
        nullable: true,
    })
    public company: string;

    @Column({
        nullable: true,
    })
    public country: string;

    @Column({
        nullable: true,
    })
    public email: string;

    @Column({
        nullable: true,
    })
    public forename: string;

    @Column({
        nullable: true,
    })
    public hometel: string;

    @Column({
        nullable: true,
    })
    public mobile: string;

    @Column({
        nullable: true,
    })
    public policynumber: string;

    @OneToOne(type => Vehicle, entity => entity.policynumber)
    @JoinColumn({ name: 'policynumber', referencedColumnName: 'policynumber'})
    @IsOptional()
    public vehicle?: Vehicle;

    @Column({
        nullable: true,
    })
    public postcode: string;

    @Column({
        nullable: true,
    })
    public surname: string;

    @Column({
        nullable: true,
    })
    public title: string;

    @Column({
        nullable: true,
    })
    public town: string;

    @Column({
        nullable: true,
    })
    public recordtype: number;

    @Column({
        nullable: true,
    })
    public branchid: number;

    @OneToOne(type => User)
    @JoinColumn({ name: 'branchid', referencedColumnName: 'userid'})
    @IsOptional()
    public branchuser?: User;

    @Column({
        nullable: true,
    })
    public branchname: string;

    @Column({
        nullable: true,
    })
    public dateseconds: number;

    @Column({
        nullable: true,
    })
    public coverid: number;

    @OneToOne(type => CoverType)
    @JoinColumn({ name: 'coverid', referencedColumnName: 'coverid'})
    @IsOptional()
    public cover?: CoverType;

    @Column({
        nullable: true,
    })
    public operator: number;

    @Column({
        nullable: true,
    })
    public state: number;

    @OneToOne(type => State)
    @JoinColumn({ name: 'state', referencedColumnName: 'stateid'})
    @IsOptional()
    public policystate?: State;

    @Column({
        nullable: true,
    })
    public datepolicy: Date;

    @Column({
        nullable: true,
    })
    public invoiceid: number;

    @Column({
        nullable: true,
    })
    public nett: number;

    @Column({
        nullable: true,
    })
    public tax: number;

    @Column({
        nullable: true,
    })
    public gross: number;

    @Column({
        nullable: true,
    })
    public invoicenumber: string;

    @Column({
        nullable: true,
    })
    public vatpercent: number;

    @Column({
        nullable: true,
    })
    public county: string;

    @Column({
        nullable: true,
    })
    public poladmincosttype: number;

    @Column({
        nullable: true,
    })
    public poladmincostcent: number;

    @Column({
        nullable: true,
    })
    public poladmincostamt: number;

    @Column({
        nullable: true,
    })
    public pricepaid: number;

    @Column({
        nullable: true,
    })
    public deposit: number;

    @Column({
        nullable: true,
    })
    public notifyemail: string;

    @Column({
        nullable: true,
    })
    public policycommissionaccount: number;

    @Column({
        nullable: true,
    })
    public policycommissiontype: number;

    @Column({
        nullable: true,
    })
    public policycommissioncent: number;

    @Column({
        nullable: true,
    })
    public policycommissionamt: number;

    @Column({
        nullable: true,
    })
    public policycommissionvalue: number;

    @Column({
        nullable: true,
    })
    public policycommissionpaytype: number;

    @Column({
        nullable: true,
    })
    public vatcalculation: string;

    @Column({
        nullable: true,
    })
    public policyrefundtype: number;

    @Column({
        nullable: true,
    })
    public policyrefundvalue: number;

    @Column({
        nullable: true,
    })
    public policyrefundduration: string;

    @Column({
        nullable: true,
    })
    public refunddone: boolean;

    @Column({
        nullable: true,
    })
    public taxadmin: number;

    @Column({
        nullable: true,
    })
    public dateexpiry: Date;
}
