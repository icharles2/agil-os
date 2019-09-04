# Plnnr

##Description

Plnnr is a choose your own adventure style travel budgeting app and cost estimator. With very few required user inputs, Plnnr accesses city and date specific average prices for Transportation, Lodging, Meals, and Entertainment. Trip data is calculated on user budget preference for cost-saving trips to extravagant vacations. Trips are saved and rendered per user in the Trip Dashboard. Plnnr provides a complete cost breakdown for all your travel needs.

## Built With
* [Angular8](https://angular.io/) - The web framework used
* [NestJS](https://docs.nestjs.com/) - Server Framework
* [TypeORM](https://typeorm.io/#/) - Query Language and Database Schema
* [PostgreSQL](https://www.postgresql.org/docs/) - Database Management
* [AWS](https://aws.amazon.com/codedeploy/) - Deployment

# Client Side

## Development server
* [Server](https://github.com/agil-os/Server-side) - Run with `npm run start server:dev`

## Build

Run `npm start` to build the project. The build artifacts will be stored in the `dist/` directory. Navigate to `http://localhost:3000/`

# Server Side

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