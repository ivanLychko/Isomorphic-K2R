# Isomorphic Koa2-Reat


This is my personal experience, you can use it for yourself if you want.

### For example, the minimal work with authorization and users is implemented.

Have a nice day ;)

# About
Server can use:
* cron 
* web socket
* REST with koa2
* session
* sequelize // mysql 

#### Error server notification telegram bot
Create telegram Bot (using this bot [@BotFather ](https://t.me/BotFather)) and change file config (config/tgLogs.js) 

Front can use:
* react (front end render) -- available shared rout with server (koa2)
* bootstrap

# Installation

### Requires
* [Node.js](https://nodejs.org/) v14+.
* [Docker](https://www.docker.com/get-started)

Install the dependencies and devDependencies.

```sh
npm i -- // install dependencies
npm run i // auto create base config and keyn session key (config/*)
npm run migrate all force // migrate batabase // login admin : pass admin
```
You can reset all configs

```sh
npm run ri // !!! ATTENTION !!! old configurations will be removed.
```

# Development

First Tab:

```sh
npm run dev-s // Live start server (auto reboot with changes code server)
```

Second Tab:

```sh
npm run dev-f // Live start front (auto reboot with changes code front)
```

### Building for source

For production release:

```sh
npm start // Full applicatoin build by using webpack. And start server by using pm2 
```
```sh
npm run build // Build production front-end
```
```sh
npm run startServer // Start server by using pm2 
```

### Docker

```sh
docker-compose build && docker-compose up -d // production ( see file docker-compose.yml )
```
