import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('groups')
export class Group {

    @PrimaryGeneratedColumn()
    public groupid: number;

    @Column()
    public groupname: string;
}
