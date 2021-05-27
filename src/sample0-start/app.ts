import {ConnectionOptions, createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";

const options: ConnectionOptions = {
    "name": "sap",
    "type": "sap",
    "host": "192.168.56.102",
    "port": 39015,
    "username": "SYSTEM",
    "password": "MySuperHanaPwd123!",
    "database": "HXE",
    "logging": true,
    synchronize: true,
    entities: [Post]
};

// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {

    const category1 = new Category();
    category1.name = "TypeScript";
    await connection.manager.save(category1);

    const category2 = new Category();
    category2.name = "Programming";
    await connection.manager.save(category2);

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];

    await connection.manager.save(post);

    console.log("Post has been saved: ", post);

}).catch(error => console.log("Error: ", error));