import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";
import {ManyToMany} from "typeorm";
import {AfterRemove} from "typeorm";
import {BeforeRemove} from "typeorm";
import {AfterUpdate} from "typeorm";
import {BeforeUpdate} from "typeorm";
import {AfterInsert} from "typeorm";
import {BeforeInsert} from "typeorm";

@Entity("sample9_post_category")
export class PostCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Post, post => post.categories, {
        cascade: true
    })
    posts: Post[] = [];

    @BeforeInsert()
    doSomethingBeforeInsertion() {
        console.log(`event: PostCategory "${this.name}" will be inserted so soon...`);
    }

    @AfterInsert()
    doSomethingAfterInsertion() {
        console.log(`event: PostCategory "${this.name}" has been inserted and callback executed`);
    }

    @BeforeUpdate()
    doSomethingBeforeUpdate() {
        console.log(`event: PostCategory "${this.name}" will be updated so soon...`);
    }

    @AfterUpdate()
    doSomethingAfterUpdate() {
        console.log(`event: PostCategory "${this.name}" has been updated and callback executed`);
    }

    @BeforeRemove()
    doSomethingBeforeRemove() {
        console.log(`event: PostCategory "${this.name}" will be removed so soon...`);
    }

    @AfterRemove()
    doSomethingAfterRemove() {
        console.log(`event: PostCategory "${this.name}" has been removed and callback executed`);
    }

}