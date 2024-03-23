import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { uuid } from "uuidv4"

export interface ICreateUserDTO extends Omit<User, 'id'> {}

@Entity()
export default class User {
    @PrimaryColumn()
    public readonly id!: string;

    @Column()
    public readonly firstName!: string;

    @Column()
    public readonly lastName!: string;

    @Column({ unique: true })
    public readonly email!: string;

    @Column()
    public readonly password!: string;

    @CreateDateColumn()
    public readonly createdAt!: Date;

    @UpdateDateColumn()
    public readonly updatedAt!: Date;

    public constructor(props: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}
