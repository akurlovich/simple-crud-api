# Task 3, Simple CRUD API

## Downloading and installing dependencies

- Сlone repository:

`git clone https://github.com/akurlovich/simple-crud-api.git`

- Move to folder:

`cd simple-crud-api`

- Checkout to branch "develop":

`git checkout develop`

- Install dependencies:

`npm i`


## Usage

- Start server in development mode:

```
npm run start:dev
```

- Build application and start server in production mode:
```
npm run start:prod
```

- Run E2E tests:


```
npm run test
```

## API usage

- GET `/person` return all persons
- GET `/person/${personId}` return person with corresponding personId
- POST `/person` is used to create record about new person and store it in database
- PUT `/person/${personId}` is used to update record about existing person
- DELETE `/person/${personId}` is used to delete record about existing person from database
