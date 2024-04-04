# New Articles Backend service

1. Developed a RESTful API endpoint to create and retrieve news articles.
2. Implement basic data storage for articles, including fields such as title, content, and publication date.
3. Retrieved latest news articles from 3rd party service ([Documentation](https://currentsapi.services/en))
4. Implemented authentication middleware
5. Implemented a `logger` to track the `APIs` request behavior
6. Developed Jest unit testing for `NewsArticlesController`  
7. Service is running on the docker container. There are separate 2 parts for the `database` and `service` (Have a look at `docker-compose.yml` and `Dockerfile`). If you do not have installed the docker yet on your machine. ([Visit and install](https://docs.docker.com/))
8. I have used `nest commands` to build up the project. ([Documentation](https://docs.nestjs.com/cli/overview))

## Versions
```bash
NestJs v  - 10.3.2
node v    - 18.17.0
npm v     - 9.6.7
Ubuntu 20.04.5 LTS
Docker version 20.10.12
```

## Installation
API documentation: ([API Doc](https://documenter.getpostman.com/view/17090553/2sA35K2Lk5))

### With docker

```bash
1. get a git clone from this repository
2. cp .env.development .env - change the environment variables
3. docker-compose up -d db
4. docker-compose build
5. docker-compose up 
6. Go to the browser and check whether `http://localhost:3004/` is getting this response --> {"statusCode":401,"message":"Unauthorized"}
7. Then application and database are ready for usage. otherwise, check the errors on your terminal and you have to fix them.
8. npm run test (before running this command you need to run `npm i`)
```
### Without docker

```bash
1. get a git clone from this repository
2. cp .env.development .env - change the environment variables
3. set the valid database values on.env
4. npm i
5. npm run start:dev --> dev
6. npm run start:prod --> prod
7. npm run build
8. npm run test

```
Also, you can see the Swager API documentation: `http://localhost:3004`

