import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("sample20_author")
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
}