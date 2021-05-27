import {Column, Entity} from "typeorm";
import {PrimaryColumn} from "typeorm";

@Entity("sample27_composite_primary_keys")
export class Post {

    @PrimaryColumn("int")
    id: number;

    @PrimaryColumn()
    type: string;

    @Column()
    text: string;

}