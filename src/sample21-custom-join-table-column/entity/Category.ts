import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ManyToMany} from "typeorm";
import {Post} from "./Post";

@Entity("sample21_category")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToMany(type => Post, post => post.categories)
    posts: Post[];

}