# 1. Example how to use TypeORM with TypeScript

1. clone repository 
2. run `yarn install`
3. edit `ormconfig.json` and change your database configuration (you can also change a database type, but don't forget to install specific database drivers)
4. run `npm start`

## 1.1. How to use CLI?

1. install `typeorm` globally: `npm i -g typeorm`
2. run `typeorm -h` to show list of available commands


## 1.2. start

### 1.2.1. npm 패키지를 설치 :

   `npm install typeorm --save`

### 1.2.2. `reflect-metadata`를 설치해야합니다 :

   `npm install reflect-metadata --save`

   그리고 앱의 글로벌 위치에서 import 합니다. (예를 들면 app.ts):

   `import "reflect-metadata";`

### 1.2.3. node설치가 필요할 수도 있습니다:

   `npm install @types/node --save`

### 1.2.4. 데이터베이스 드라이버를 설치하세요:

   - **MySQL**이거나 **MariaDB**의 경우

     `npm install mysql --save` (mysql2 대신에 설치할 수도 있습니다)

   - **PostgreSQL**이거나 **CockroachDB**의 경우

     `npm install pg --save`

   - **SQLite**의 경우

     `npm install sqlite3 --save`

   - **Microsoft SQL Server**의 경우

     `npm install mssql --save`

   - **sql.js**의 경우

     `npm install sql.js --save`

   - **Oracle**의 경우

     `npm install oracledb --save`

     Oracle 드라이버가 작동하게 하려면, [해당](https://github.com/oracle/node-oracledb) 사이트의 설치지침을 따라야합니다.

   - **SAP Hana**의 경우

     ```
     npm config set @sap:registry https://npm.sap.com
     npm i @sap/hana-client
     npm i hdb-pool
     ```

   - **MongoDB**의 경우 (experimental)

     `npm install mongodb --save`

   - **NativeScript**, **react-native**이거나 **Cordova**의 경우

     [지원되는 플랫폼](https://github.com/typeorm/typeorm/blob/master/docs/supported-platforms.md)을 확인하세요.

   사용할 데이터베이스에 따라 이중에서 _하나만_ 설치하세요.


### 1.2.5. TypeScript 설정

타입스크립트 버전이 **3.3**보다 높은지 확인하고, `tsconfig.json`에서 다음 설정을 사용하도록 했는지 확인하세요 :

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

컴파일러 옵션의 `lib` 섹션에서 `es6`을 사용하도록 설정하거나, `@types`에서 `es6-shim`을 설치해야 할 수도 있습니다.

## 1.3. 빠른 시작

TypeORM을 시작하는 가장 빠른 방법은 CLI 커맨드를 사용하여 시작 프로젝트를 만드는 것입니다. 빠른 시작은 Nodejs 애플리케이션에서 TypeORM을 사용할때만 작동

먼저, TypeORM을 전역적으로 설치 :

```
npm install typeorm -g
```

그 다음, 새 프로젝트를 만들고싶은 경로에 가서 다음 커맨드를 실행 :

```
typeorm init --name MyProject --database mysql
```

여기서 `name`은 여러분의 프로젝트 혹은 데이터베이스 이름을, `database`는 여러분이 사용할 데이터베이스입니다.
데이터베이스는 다음 중 하나가 될 수 있습니다 : `mysql`, `mariadb`, `postgres`, `cockroachdb`, `sqlite`, `mssql`, `oracle`, `mongodb`,
`cordova`, `react-native`, `expo`, `nativescript`.

이 명령은 다음 파일을 사용하여 `MyProject` 디렉토리에 새 프로젝트를 생성합니다 :

```
MyProject
├── src              // TypeScript 코드 위치
│   ├── entity       // entity가 저장되는 위치
│   │   └── User.ts  // 샘플 entity
│   ├── migration    // migration이 저장되는 위치
│   └── index.ts     // 앱의 시작포인트
├── .gitignore       // 표준 .gitignore 파일
├── ormconfig.json   // ORM 및 데이터베이스 연결 설정
├── package.json     // node 모듈 종속성
├── README.md        // 간단한 readme 파일
└── tsconfig.json    // Typescript 컴파일러 설정
```

> 기존의 node 프로젝트에서도 `typeorm init` 명령을 사용할수 있지만, 이미 존재하는 일부 파일을 재정의 할 수 있으니 주의하세요.

다음 단계는 새로운 프로젝트 종속성을 설치해보는 것입니다:

```
cd MyProject
npm install
```

설치가 진행되는 동안, `ormconfig.json`파일을 편집하고 데이터베이스 connection 설정을 추가하세요:

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "test",
  "password": "test",
  "database": "test",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"]
}
```

대부분의 경우 `host`, `username`, `password`, `database` 그리고 `port` 설정만 하면 됩니다.

설정과 모든 node 모듈 설치기 완료되면, 애플리케이션을 실행할 수 있습니다:

```
npm start
```

애플리케이션이 성공적으로 실행되고 새로운 유저를 데이터베이스에 삽입해야합니다. 이 프로젝트를 진행하면서 필요한 다른 모듈을 통합하고 더 많은 entity를 만들 수 있습니다.

> `typeorm init --name MyProject --database mysql --express` 명령어를 실행하면 express가 설치된 프로젝트를 생성할 수 있습니다.


## 1.4. connection

- [메인 API](#메인-api)
- [`Connection` API](#connection-api)
- [`ConnectionManager` API](#connectionmanager-api)

### 1.4.1. 메인 API

- `createConnection()` - 새 connection을 생성하고 글로벌 connection manager 에 등록합니다. connection 옵션을 생략하면 `ormconfig` 파일이나 환경변수에서 connection 옵션을 읽어옵니다.

```typescript
import { createConnection } from 'typeorm';

const connection = await createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
});
```

- `createConnections()` - 다중 connection을 생성하고 글로벌 connection manager 에 등록합니다. connection 옵션을 생략하면 ormconfig 파일이나 환경변수에서 connection 옵션을 읽어옵니다.

```typescript
import { createConnections } from 'typeorm';

const connection = await createConnections([
  {
    name: 'connection1',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
  },
  {
    name: 'connection2',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
  },
]);
```

- `getConnectionManager()` - 생성된 모든 connection(`createConnection()` 이나 `createConnections()` 를 사용한)을 저장하는 connection manager를 불러옵니다.

```typescript
import { getConnectionManager } from 'typeorm';

const defaultConnection = getConnectionManager().get('default');
const secondaryConnection = getConnectionManager().get('secondary');
```

- `getConnection()` - `createConnection` 메소드를 사용하여 생성된 connection을 가져옵니다.

```typescript
import { getConnection } from 'typeorm';

const connection = getConnection();
// connection에 이름이 있는 경우 이름을 지정하세요 :
const secondaryConnection = getConnection('secondary-connection');
```

- `getEntityManager()` - connection에서 `EntityManager` 를 가져옵니다. connection 이름을 지정하여 어떤 connection의 entity manager를 선택해야 하는지 나타낼 수 있습니다.

```typescript
import { getEntityManager } from 'typeorm';

const manager = getEntityManager();
// 이제 manager 메소드를 사용할 수 있습니다.

const secondaryManager = getEntityManager('secondary-connection');
// 이제 secondary connection의 manager 메소드를 사용할 수 있습니다.
```

- `getRepository()` - connection에서 `Repository` 를 가져옵니다. connection 이름을 지정하여 어떤 connection의 entity manager를 선택해야 하는지 나타낼 수 있습니다.

```typescript
import { getRepository } from 'typeorm';

const userRepository = getRepository(User);
// 이제 repository 메소드를 사용할 수 있습니다.

const blogRepository = getRepository(Blog, 'secondary-connection');
// 이제 secondary connection의 manager 메소드를 사용할 수 있습니다.
```

- `getTreeRepository()` - connection에서 `TreeRepository` 를 가져옵니다. connection 이름을 지정하여 어떤 connection의 entity manager를 선택해야 하는지 나타낼 수 있습니다.

```typescript
import { getTreeRepository } from 'typeorm';

const userRepository = getTreeRepository(User);
// 이제 repository 메소드를 사용할 수 있습니다.

const blogRepository = getTreeRepository(Blog, 'secondary-connection');
// 이제 secondary connection의 manager 메소드를 사용할 수 있습니다.
```

- `getMongoRepository()` - connection에서 `MongoRepository` 를 가져옵니다. connection 이름을 지정하여 어떤 connection의 entity manager를 선택해야 하는지 나타낼 수 있습니다.

```typescript
import { getMongoRepository } from 'typeorm';

const userRepository = getMongoRepository(User);
// 이제 repository 메소드를 사용할 수 있습니다.

const blogRepository = getMongoRepository(Blog, 'secondary-connection');
// 이제 secondary connection의 manager 메소드를 사용할 수 있습니다.
```

### 1.4.2. `Connection` API

- `name` - Connection 이름. 이름없는 connection을 만들었을 경우 그 connection의 이름은 "default"와 같습니다. 다중 connection과 함께 작업하거나 `getConnection(connectionName: string)` 이 호출될 때 사용합니다.

```typescript
const connectionName: string = connection.name;
```

- `options` - 이 connection에서 사용될 Connection 옵션입니다. 자세한 내용은 [Connection Options](./connection-options.md)를 참조하세요.

```typescript
const connectionOptions: ConnectionOptions = connection.options;
// connectionOptions 에서 MysqlConnectionOptions로 캐스트 할 수 있습니다.
// 또는 사용하는 데이터베이스 드라이버에 따라 다른 옵션으로 캐스트 할 수 있습니다.
```

- `isConnected` - 데이터베이스에 대한 실제 연결이 이루어졌는지 여부를 나타냅니다.

```typescript
const isConnected: boolean = connection.isConnected;
```

- `driver` - 이 connection에 사용된 기본 드라이버.

```typescript
const driver: Driver = connection.driver;
// connectionOptions 에서 MysqlDriver로 캐스트 할 수 있습니다.
// 또는 사용하는 데이터베이스 드라이버에 따라 다른 드라이버로 캐스트 할 수 있습니다.
```

- `manager` - `EntityManager` 는 connection entity와 함께 작업하는데 사용됩니다. 더 자세한 내용은 [Entity Manager and Repository](../entityManagerAndRepository/working-with-entity-manager.md)를 참조하세요.

```typescript
const manager: EntityManager = connection.manager;
// manager 메소드를 호출할 수 있습니다. 예를 들면:
const user = await manager.findOne(1);
```

- `mongoManager` - `MongoEntityManager` 는 mongodb connection에서 connection entities와 함께 작업하는데 사용됩니다. MongoEntityManager에 대한 더 자세한 내용은 [MongoDB](../guides/mongodb.md) 문서를 참조하세요.

```typescript
const manager: MongoEntityManager = connection.mongoManager;
// manager나 mongodb-manager 메소드를 호출할 수 있습니다. 예를 들면:
const user = await manager.findOne(1);
```

- `connect` - 데이터베이스에 연결을 수행합니다. `createConnection`을 사용하면 자동으로 `connect` 도 호출되기 때문에 직접 호출할 필요가 없습니다.

```typescript
await connection.connect();
```

- `close` - 데이터베이스와의 연결을 닫습니다. 일반적으로, 애플리케이션이 종료될 때 이 메소드를 호출합니다.

```typescript
await connection.close();
```

- `synchronize` - 데이터베이스 스키마를 동기화합니다. connection 옵션의 값이 `synchronize: true` 일 경우 호출되는 메소드입니다. 일반적으로, 애플리케이션이 실행 될 때 이 메소드를 호출합니다.

```typescript
await connection.synchronize();
```

- `dropDatabase` - 데이터베이스와 모든 데이터를 드랍합니다. 이 메소드를 사용하면 모든 데이터베이스 테이블과 해당 데이터가 지워지므로 프로덕션 시 주의하세요. 데이터베이스와 연결 한 후에만 사용 가능합니다.

```typescript
await connection.dropDatabase();
```

- `runMigrations` - 보류중인 모든 마이그레이션을 실행합니다.

```typescript
await connection.runMigrations();
```

- `undoLastMigrations` - 마지막으로 실행된 마이그레이션을 되돌립니다.

```typescript
await connection.undoLastMigration();
```

- `hasMetadata` - 지정한 엔티티에 대한 메타데이터가 등록 돼 있는지 확인합니다. 자세한 내용은 [Entity Metadata](https://typeorm.io/#/entity-metadata/)를 참조하세요.

```typescript
if (connection.hasMetadata(User)) const userMetadata = connection.getMetadata(User);
```

- `getMetadata` - 지정된 엔티티의 `EntityMetadata` 를 가져옵니다. 테이블 이름을 지정할 수도 있으며, 이러한 테이블 이름을 가진 엔티티 metadata가 발견되면 반환됩니다. 자세한 내용은 [Entity Metadata](https://typeorm.io/#/entity-metadata/)를 참조하세요.

```typescript
const userMetadata = connection.getMetadata(User);
// user 엔티티에 대한 모든 정보를 얻을 수 있습니다.
```

- `getRepository` - 지정된 엔티티의 `Repository` 를 가져옵니다. 테이블 이름을 지정할 수도 있으며, 이러한 테이블 이름을 가진 repository가 발견되면 반환됩니다. 자세한 내용은 [Repositories](../entityManagerAndRepository/working-with-repository.md)를 참조하세요.

```typescript
const repository = connection.getRepository(User);
// repository 메소드를 호출 할 수 있습니다. 예를 들면 :
const users = await repository.findOne(1);
```

- `getTreeRepository` - 지정된 엔티티의 `TreeRepository` 를 가져옵니다. 테이블 이름을 지정할 수도 있으며, 이러한 테이블 이름을 가진 repository가 발견되면 반환됩니다. 자세한 내용은 [Repositories](../entityManagerAndRepository/working-with-repository.md)를 참조하세요.

```typescript
const repository = connection.getTreeRepository(Category);
// tree repository 메소드를 호출 할 수 있습니다. 예를 들면 :
const categories = await repository.findTrees();
```

- `getMongoRepository` - 지정된 엔티티의 `MongoRepository` 를 가져옵니다. 이 repository는 MongoDB connection에 있는 entites에서 사용됩니다. 자세한 내용은 [MongoDB support](../guides/mongodb.md)를 참조하세요.

```typescript
const repository = connection.getMongoRepository(User);
//mongodb-specific repository 메소드를 호출 할 수 있습니다. 예를 들면:
const categoryCursor = repository.createEntityCursor();
const category1 = await categoryCursor.next();
const category2 = await categoryCursor.next();
```

- `getCustomRepository` - 사용자 커스텀 정의 Repository를 가져옵니다. 자세한 내용은 [custom repositories](../entityManagerAndRepository/custom-repository.md)를 참조하세요.

```typescript
const userRepository = connection.getCustomRepository(UserRepository);
// 사용자 정의 repository 안의 메소드를 사용할 수 있음. - UserRepository class
const crazyUsers = await userRepository.findCrazyUsers();
```

- `transaction` - 단일 데이터베이스 트랜잭션에서 여러 데이터베이스 요청이 실행되는 단일 트랜잭션을 제공합니다.
  더 자세한 내용은 [Transactions](../advancedTopics/transactions.md)을 참조하세요.

```typescript
await connection.transaction(async (manager) => {
  // NOTE: 지정된 manager 인스턴스를 이용하여 모든 데이터베이스 작업을 완료해야 합니다.
  // 트랜잭션과 함께 작업하는 entityManager의 special instance.
  // await을 사용하는것도 잊지마세요.
});
```

- `query` - 원시 SQL 쿼리를 실행합니다.

```typescript
const rawData = await connection.query(`SELECT * FROM USERS`);
```

- `createQueryBuilder` - queryBuilder를 만듭니다. queryBuilder는 쿼리를 작성할때 사용할 수 있습니다. 자세한 내용은 [QueryBuilder](../queryBuilder/select-query-builder.md)를 참조하세요.

```typescript
const users = await connection
  .createQueryBuilder()
  .select()
  .from(User, 'user')
  .where('user.name = :name', { name: 'John' })
  .getMany();
```

- `createQueryRunner` - 실제 단일 데이터베이스 connection을 관리하고 작업하는데 사용되는 queryRunner를 만듭니다. 자세한 내용은 [QueryRunner](https://typeorm.io/#/query-runner/)를 참조하세요.

```typescript
const queryRunner = connection.createQueryRunner();

// 실제 데이터베이스 연결을 수행하는 connection을 호출한 후에만 메소드를 사용할 수 있습니다.
await queryRunner.connect();

// ... 이제 query runner와 함께 작업할 수도 있고, 메소드를 호출할 수도 있습니다.

// 매우 중요합니다 - 작업을 끝마치면 query runner를 해제하는걸 잊지마세요.
await queryRunner.release();
```

### 1.4.3. `ConnectionManager` API

- `create` - 새로운 connection을 만들어 manager에 등록합니다.

```typescript
const connection = connectionManager.create({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
});
```

- `get` - 이름으로 manager에 생성된 connection을 가져옵니다.

```typescript
const defaultConnection = connectionManager.get('default');
const secondaryConnection = connectionManager.get('secondary');
```

- `has` - 해당 connection이 지정된 connection manager에게 등록이 되어 있는지 확인합니다.

```typescript
if (connectionManager.has('default')) {
  // ...
}
```

## 1.5. entity

### 1.5.1. 모델(Model) 생성

데이터베이스 작업은 테이블 생성에서부터 시작됩니다. 어떻게 TypeORM이 테이블을 만들도록 할수있을까요? 바로 모델을 통하는 것입니다. 앱의 모델은 데이터베이스 테이블과 일맥상통합니다.

예를 들어, `Photo` 모델이 있다고 생각해 봅시다.

```typescript
export class Photo {
  id: number;
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}
```

그리고 당신은 데이터베이스에 사진을 저장하길 원합니다. 그 데이터베이스에 사진을 저장하려면 먼저 데이터베이스 테이블이 필요하며, 데이터베이스 테이블은 _entites_ 로 정의된 모델의 경우에만 생성됩니다.

### 1.5.2. 엔티티(entity) 생성

_entity_ 는 `@Entity` 데코레이터가 달린 모델입니다. 데이터베이스 테이블은 이런 모델에 대하여 생성됩니다. TypeORM을 사용하여 entity와 작업하는 경우, 불러오기/삽입/업데이트/삭제 및 다른 작업을 어디서나 수행 할 수 있습니다.

아까 만들었던 `Photo` 모델을 엔티티로 만들어봅시다:

```typescript
import { Entity } from 'typeorm';

@Entity()
export class Photo {
  id: number;
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}
```

이제 `Photo` 엔티티에 대한 데이터베이스 테이블이 생성되었으며 앱의 어느곳에서나 사용 할 수 있습니다. 우리는 데이터베이스 테이블을 만들었습니다. 하지만 열(columns)없이 어떻게 테이블이 존재한다고 말할 수 있을까요? 테이블에 대하여 열을 몇 개 만들어 봅시다.

### 1.5.3. 테이블 열(columns) 추가

데이터베이스 열을 추가하려면, 열로 만들고 싶은 엔티티의 속성에 `@Column` 데코레이터를 달아주면 됩니다.

```typescript
import { Entity, Column } from 'typeorm';

@Entity()
export class Photo {
  @Column()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}
```

이제 `id`, `name`, `description`, `filename`, `views`, `isPublished` 열이 `photo` 테이블에 추가 되었습니다. 데이터베이스의 열 타입은 엔티티의 속성에서 사용된 타입에서 추론되어 사용됩니다. 예를 들어, `number`타입의 경우 `integer`, `string`은 `varchar`, `boolean`은 `bool`으로 변환됩니다. 그러나 `@Column` 데코레이터에 열 유형을 명시적으로 지정하여 데이터베이스가 지원하는 열 유형을 사용할 수 있습니다.

우리는 데이터베이스 테이블에 열을 추가했지만, 아직 한가지 남은게 있습니다. 각 데이터베이스 테이블에는 기본 키를 가진 열이 필요합니다.

### 1.5.4. 기본 열 만들기

각 엔티티는 기본 키를 가진 열이 하나 이상 `존재해야합니다`. 이는 필요조건이며 반드시 지켜야합니다. 열을 기본 키로 바꾸려면 `@PrimaryColumn` 데코레이터를 사용해야 합니다.

```typescript
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}
```

### 1.5.5. 자동 생성 열 만들기

이제, 자동으로 생성되는 id 열(auto-increment / sequence / serial / generated identity column 들과 같은 이름으로 알려진)을 만들고 싶다고 가정해봅시다 . 그렇게 하려면 `@PrimaryColumn` 데코레이터를 `@PrimaryGeneratedColumn` 데코레이터로 변경해야 합니다:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}
```

### 1.5.6. 열 데이터 타입

다음으로, 데이터 타입을 수정해봅시다. 기본적으로, string은 varchar(255)와 유사한 타입으로 매핑됩니다 (데이터베이스 유형에따라 달라질 수 있습니다). Number는 interger랑 유사한 타입으로 매핑됩니다 (데이터베이스 유형에따라 달라질 수 있습니다). 우리는 열들이 varchar나 interger로 한정되는것을 원하지 않습니다. 올바른 데이터 타입을 설정해봅시다:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('double')
  views: number;

  @Column()
  isPublished: boolean;
}
```

데이터베이스마다 열의 타입이 다릅니다. 데이터베이스가 지원하는 모든 타입을 사용할 수 있습니다. 지원하는 열의 타입에 대한 더 많은 정보는
[여기](./src/docs/entity/entities.md#열-타입)를 참조하세요.

### 1.5.7. 데이터베이스 연결 만들기

이제 엔티티가 생성되면 `index.ts`(또는 `app.ts`) 파일을 만들고 connection을 설정합시다.

```typescript
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Photo } from './entity/Photo';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [Photo],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    // 여기서 엔티티 작업을 할 수 있습니다.
  })
  .catch((error) => console.log(error));
```

이 예제에서는 MySQL을 사용했지만, 지원되는 다른 데이터베이스도 모두 사용 가능합니다.
다른 데이터베이스를 사용하려면, 단순히 `type` 옵션의 값을 사용할 다른 데이터베이스의 이름으로 바꾸면 됩니다: `mysql`, `mariadb`, `postgres`, `cockroachdb`, `sqlite`, `mssql`, `oracle`, `cordova`, `nativescript`, `react-native`, `expo` 또는 `mongodb`.
또한 자신의 호스트, 포트, 사용자 이름, 비밀번호 및 데이터베이스 설정을 사용해야 합니다.

이 connection의 엔티티 리스트에 Photo 엔티티를 추가했습니다. 이 connection에 사용중인 각각의 엔티티들은 모두 리스트에 나열되어 있어야합니다.

`synchronize`를 설정하면 애플리케이션이 실행할때마다 엔티티와 데이터베이스가 동기화됩니다. (migration)

### 1.5.8. 디렉토리에서 모든 엔티티 불러오기

나중에 엔티티를 더 많이 만들면, 계속해서 connection 설정에 엔티티를 추가해줘야 합니다. 이는 매우 불편하므로, 대신에 모든 엔티티가 연결되고, connection에 사용할 디렉토리를 지정할 수 있습니다:

```typescript
import { createConnection } from 'typeorm';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [__dirname + '/entity/*.js'],
  synchronize: true,
})
  .then((connection) => {
    // 여기서 엔티티 작업을 할 수 있습니다.
  })
  .catch((error) => console.log(error));
```

그러나 이 방법에 주의하세요. `ts-node`를 사용중이라면 `.ts`파일의 경로를 대신 지정 해야합니다. `outDir`을 사용중이라면 outDir 디렉토리 내의 `.js`파일의 경로를 지정해야합니다. `outDir`을 사용중이며 엔터티를 제거하거나 이름을 변경할 때는 outDir 디렉토리를 지우고 프로젝트를 다시 컴파일 하세요. 원본 `.ts`파일을 제거할 때 컴파일 된 `.js`버전이 디렉토리에서 제거되지않고 outDir 디렉토리에 존재하기 때문에 TypeORM에 의해 로드 됩니다.

### 1.5.9. 애플리케이션 실행

이제 `index.ts`를 실행하면 데이터베이스와의 연결이 초기화되고 photos 테이블이 생성됩니다.

```shell
+-------------+--------------+----------------------------+
|                         photo                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name        | varchar(100) |                            |
| description | text         |                            |
| filename    | varchar(255) |                            |
| views       | int(11)      |                            |
| isPublished | boolean      |                            |
+-------------+--------------+----------------------------+
```

### 1.5.10. 데이터베이스 생성 및 사진 삽입

이제 새 사진을 만들어 데이터베이스에 저장해보겠습니다:

```typescript
import { createConnection } from 'typeorm';
import { Photo } from './entity/Photo';

createConnection(/*...*/)
  .then((connection) => {
    let photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    return connection.manager.save(photo).then((photo) => {
      console.log('Photo has been saved. Photo id is', photo.id);
    });
  })
  .catch((error) => console.log(error));
```

엔티티가 저장되면 새로 생성된 ID를 얻을 수 있습니다. `save` 메소드는 전달한 것과 똑같은 객체를 반환합니다. 이때 새로운 객체가 아니라 "id"를 바꿔서 반환합니다.
## 1.6. subscribers

## 1.7. abstract table

## 1.8. pagination

## 1.9. entity listeners

## 1.10. relations

## 1.11. tree