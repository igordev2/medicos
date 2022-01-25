<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Running the app

## Modify environment variables

1. Rename file .env.example to .env
2. Add database connection settings to files.

```files
.env
.env.local
.env.test
```

Example:

```env
# TypeORM Config

MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=medicos
```
## Execute app

```bash
# development
$ docker-compose up
```

## Test

```bash
## unit tests
$ npm run test
```

# e2e tests

```bash
$ npm run test:e2e
```

# test coverage

````bash
$ npm run test:cov
````
