import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Pricing } from './Pricing';
import { User } from './User';
import { Refund } from './Refund';

@Entity('pricingexception')
export class Exception {

    @PrimaryGeneratedColumn()
    public exceptionid: number;

    @Column({
        nullable: true,
    })
    public pricingid: number;

    @OneToOne(type => Pricing)
    @JoinColumn({ name: 'pricingid', referencedColumnName: 'id'})
    @IsOptional()
    public pricing?: Pricing;

    @Column({
        nullable: true,
    })
    public dealerid: number;

    @OneToOne(type => User)
    @JoinColumn({ name: 'dealerid', referencedColumnName: 'userid'})
    @IsOptional()
    public dealer?: User;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public newprice?: number;

    @Column({
        nullable: true,
    })
    public refundid: number;

    @OneToOne(type => Refund)
    @JoinColumn({ name: 'refundid', referencedColumnName: 'refundid'})
    @IsOptional()
    public refund?: Refund;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public poladmincosttype?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public poladmincostcent?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public poladmincostamt?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public exceptionrefundtype?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public exceptionrefundvalue?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public exceptionrefundduration?: string;
}
