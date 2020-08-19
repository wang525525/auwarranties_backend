import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Policy } from './Policy';
import { State } from './State';

@Entity('claims')
export class Claim {

    @PrimaryGeneratedColumn()
    public claimid: number;

    @Column({
        nullable: true,
    })
    public mileageatclaim: number;

    @Column({
        nullable: true,
    })
    public failedpart: string;

    @Column({
        nullable: true,
    })
    public failedarea: string;

    @Column({
        nullable: true,
    })
    public failurecause: string;

    @Column({
        nullable: true,
    })
    public repairsrequired: string;

    @Column({
        nullable: true,
    })
    public labourperhour: number;

    @Column({
        nullable: true,
    })
    public partstotal: number;

    @Column({
        nullable: true,
    })
    public labourtotal: number;

    @Column({
        nullable: true,
    })
    public claimtotal: number;

    @Column({
        nullable: true,
    })
    public payvat: boolean;

    @Column({
        nullable: true,
    })
    public adjustedclaim: number;

    @Column({
        nullable: true,
    })
    public policyid: number;

    @OneToOne(type => Policy, entity => entity.policyid)
    @JoinColumn({ name: 'policyid', referencedColumnName: 'policyid'})
    @IsOptional()
    public policy?: Policy;

    @Column({
        nullable: true,
    })
    public dateclaim: Date;

    @Column({
        nullable: true,
    })
    public claimdateseconds: number;

    @Column({
        nullable: true,
    })
    public claimnumber: string;

    @Column({
        nullable: true,
    })
    public state: number;

    @OneToOne(type => State, entity => entity.stateid)
    @JoinColumn({ name: 'state', referencedColumnName: 'stateid'})
    @IsOptional()
    public claimstate?: State;

    @Column({
        nullable: true,
    })
    public calculatedtotal: number;

    @Column({
        nullable: true,
    })
    public claimvatamt: number;

    @Column({
        nullable: true,
    })
    public claimsvatcent: number;

    @Column({
        nullable: true,
    })
    public notes: string;

    @Column({
        nullable: true,
    })
    public claimnotifyemail: string;

    @Column({
        nullable: true,
    })
    public paiddate: Date;

    @Column({
        nullable: true,
    })
    public lastservicedates: string;

    @Column({
        nullable: true,
    })
    public faultdiagnosed: boolean;

    @Column({
        nullable: true,
    })
    public confirmedwarrantyclaim: boolean;

    @Column({
        nullable: true,
    })
    public advicedtodiagnosefault: boolean;

    @Column({
        nullable: true,
    })
    public advicedtosenddiagnostic: string;

    @Column({
        nullable: true,
    })
    public hasbooklet: string;

    @Column({
        nullable: true,
    })
    public repairinggarage: string;

    @Column({
        nullable: true,
    })
    public adminresponded: boolean;

    @Column({
        nullable: true,
    })
    public represponded: boolean;

    @Column({
        nullable: true,
    })
    public adminrespondtime: Date;
}
