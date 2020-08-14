import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('schedule')
export class Schedule {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        nullable: true,
    })
    public day: number;

    @Column({
        nullable: true,
    })
    public hour: number;

    @Column({
        nullable: true,
    })
    public task: string;

    @Column({
        nullable: true,
    })
    public schedulename: string;

    @Column({
        nullable: true,
    })
    public repeat: string;

    @Column({
        nullable: true,
    })
    public commence: Date;

    @Column({
        nullable: true,
    })
    public commenceseconds: number;

    @Column({
        nullable: true,
    })
    public rundate: Date;

    @Column({
        nullable: true,
    })
    public message: string;

    @Column({
        nullable: true,
    })
    public notify: string;
}
