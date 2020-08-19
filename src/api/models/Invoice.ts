import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { User } from './User';
import { State } from './State';

@Entity('invoices')
export class Invoice {

    @PrimaryGeneratedColumn()
    public invoiceid: number;

    @Column({
        nullable: true,
    })
    public invoicedate: Date;

    @Column({
        nullable: true,
    })
    public invdateseconds: number;

    @Column({
        nullable: true,
    })
    public dealerid: number;

    @OneToOne(type => User, entity => entity.userid)
    @JoinColumn({ name: 'dealerid', referencedColumnName: 'userid'})
    @IsOptional()
    public dealer?: User;

    @Column({
        nullable: true,
    })
    public state: number;

    @OneToOne(type => State, entity => entity.stateid)
    @JoinColumn({ name: 'state', referencedColumnName: 'stateid'})
    @IsOptional()
    public invoicestate?: State;

    @Column({
        nullable: true,
    })
    public invoicenumber: string;

    @Column({
        nullable: true,
    })
    public details: string;

    @Column({
        nullable: true,
    })
    public net: number;

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
    public taxpercentage: number;

    @Column({
        nullable: true,
    })
    public invlog: string;

    @Column({
        nullable: true,
    })
    public paiddate: Date;

    @Column({
        nullable: true,
    })
    public invvatrule: number;

    @Column({
        nullable: true,
    })
    public invvatamount: number;

    @Column({
        nullable: true,
    })
    public invadmincosttype: number;

    @Column({
        nullable: true,
    })
    public invadmincostcent: number;

    @Column({
        nullable: true,
    })
    public invadmincostamt: number;

    @Column({
        nullable: true,
    })
    public invvatcent: number;

    @Column({
        nullable: true,
    })
    public taxadmin: number;

    @Column({
        nullable: true,
    })
    public totaladmin: number;
}
