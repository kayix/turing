<p align="center">An e-commerce backend software based on nodejs.</p>

## Description

<ul>
  <li>This project is based on <a href="https://nestjs.com/">NestJS</a> framework.</li>
  <li>Typescript preferred over javascript for ease of maintaining.</li>
  <li><a href="sequelizejs.com">Sequelize ORM</a> used for database actions.</li>
  <li>Data validation provided by <a href="https://github.com/typestack/class-validator">class validator</a>.</li>
</ul>

## Project Structure
<p>Project is using moduler system</p>
<h5>Module Files</h5>
<p>.controller.ts: For Route Mathing</p>
<p>.entity.ts: For Model Definion</p>
<p>.service.ts: For Controller Methods</p>

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

## Testing
```bash
$ npm run test:e2e
```
