# Spring boot starter blueprint

This project aims to provide a very minimal but modern feature complete blueprint for building and deploying 
a full stack web application
using Spring boot and Vue.js.  
This blueprint is useful for people who want to start building a web application with sensible 
defaults but want to remain flexible.     
As a result this blueprint only includes the libraries and config you need to start
building, it doesn't provide any application code or structure (besides the examples) which help in building web applications.  
For this you can visit the spring docs which provide many useful samples or have a look at the [Help section](./HELP.md).

## Features

* [Spring Security](https://spring.io/projects/spring-security) with [Keycloak](https://www.keycloak.org/) integration
* Migrations using [Flyway](https://flywaydb.org/)
* Database setup using [PostgreSQL](https://www.postgresql.org/) + [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/reference/htmlsingle/#boot-features-jpa-and-spring-data)
* [Vue.js](https://vuejs.org/) frontend embedded in the jar at build time
* [Testcontainers](https://www.testcontainers.org/) for integration testing of repositories and other infrastructure
* [Mockito](https://site.mockito.org/) integration for mocking objects and asserting certain behaviour
* [Docker-compose](https://docs.docker.com/compose/) for running required infrastructure locally (Postgres, Keycloak)
* Integrated dev tools for hot reloading (optional, depending on IDE setup)
* Simple CI integration for test & build pipeline (Currently only [Github actions](https://github.com/features/actions))

## Requirements

- [JDK 11](https://openjdk.java.net/projects/jdk/11/)
- Recent version [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (including [docker-compose](https://docs.docker.com/compose/))
- Your favorite IDE (I prefer [IntelliJ Idea](https://www.jetbrains.com/idea/))

## Running the application

1. Start the infrastructure (from root of folder)
> This will start a postgres container on localhost:5432 and keycloak which is accessible on http://localhost:8080
```
cd /src/main/docker
docker-compose up -d 
```

2. Install dependencies & Start the frontend (from root of folder)
> This will start a hot reloaded Vue.js frontend on http://localhost:8081
```
cd src/main/webapp 
npm i
cp .env.example .env.local
npm run serve
```

3. Fetch dependencies 
> This will fetch all required dependencies (from the root of the project)
```
./gradlew dependencies
```

4. Run spring boot app
> This will run the spring boot app on port 8000
```
./gradlew bootRun
```

After executing these steps your frontend is accessible on http://localhost:8081 and the api on http://localhost:8000

## Building for production

Deployment is done using docker and the provided java image from spring boot

// TODO provide values for image gradle.build

__To create a docker image including the frontend__
```
./gradlew buildFrontend bootBuildImage
```

__To create a docker image without the frontend__
```
./gradlew bootBuildImage
```

## Hot reloading (todo)
