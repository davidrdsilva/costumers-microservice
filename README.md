## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running via Docker

First, create an external network in order to make the services from different compose files communicate with each other:

```bash
$ docker network create bank-microservices-network
```

Copy the `.env.template` file and configure it with your desired settings:

```bash
$ cp .env.template .env
```

Then, navigate to `docker` folder:
```bash
$ cd docker
```

Inside `docker`, copy the `.env.template` file and configure it with your desired settings for the database:

```bash
$ cp .env.template .env
```

Finally, you can start the services:

```bash
$ docker compose up -d
```
