import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('purchaseduration')
export class Pricing {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        nullable: true,
    })
    public coverid: number;

    @Column({
        nullable: true,
    })
    public durationid: number;

    @Column({
        nullable: true,
    })
    public price: number;

    @Column({
        nullable: true,
    })
    public claimid: number;

    @Column({
        nullable: true,
    })
    public deposit: number;

    @Column({
        nullable: true,
    })
    @IsEmail()
    public email: string;

    @Column({
        nullable: true,
    })
    public refundid: number;

    @Column({
        nullable: true,
    })
    public pricingrefundvalue: number;

    @Column({
        nullable: true,
    })
    public pricingrefundduration: number;
}
