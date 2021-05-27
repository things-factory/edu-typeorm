import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("sample1_post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    likesCount: number;

}