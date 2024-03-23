import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { uuid } from "uuidv4"
import User from "./User";

export interface ICreateFavoriteDTO extends Omit<Favorite, 'id'> {}

@Entity()
export default class Favorite {
    @PrimaryColumn()
    public readonly id!: string;

    @Column()
    public readonly title!: string;

    @Column()
    public readonly itemId!: string;

    @Column()
    public readonly price!: string;

    @Column("varchar", { array: true })
    public readonly images!: string[];

    @ManyToOne(() => User)
    public user!: User;

    @CreateDateColumn()
    public readonly createdAt!: Date;

    @UpdateDateColumn()
    public readonly updatedAt!: Date;

    public constructor(props: Omit<Favorite, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}
