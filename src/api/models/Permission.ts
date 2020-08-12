import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity('permission')
export class Permission {

    @PrimaryGeneratedColumn()
    public permissionid: number;

    @Column({
        nullable: true,
    })
    public permissionname: string;

    @Column({
        nullable: true,
    })
    public active: boolean;

}

@Entity('permissionitems')
export class PermissionItem {

    @PrimaryGeneratedColumn()
    @IsOptional()
    public permissionitemid?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public permissionid?: number;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public permissionvalue?: boolean;

    @Column({
        nullable: true,
    })
    @IsOptional()
    public permissiontype?: string;

}
