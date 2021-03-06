import {EntityRepository} from "typeorm";
import {AbstractRepository} from "typeorm";
import {Author} from "../entity/Author";

/**
 * First type of custom repository - extends abstract repository.
 */
@EntityRepository(Author)
export class AuthorRepository extends AbstractRepository<Author> {

    createAndSave(firstName: string, lastName: string) {
        const author = new Author();
        author.firstName = firstName;
        author.lastName = lastName;

        return this.manager.save(author);
    }

    findMyAuthor() {
        return this
            .createQueryBuilder("author")
            .getOne();
    }

}