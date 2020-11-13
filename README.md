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

## What is this not

* This is not a full fletched generator like [JHipster](https://www.jhipster.tech/). So it will not generate all kinds of CRUD logic for you. This is just a barebones blueprint to get your application up and running. See it as a more complete and enhanced version of [start.spring.io](https://start.spring.io/). Some experience with spring/spring boot is required to start building an application with this blueprint.
* Using this blueprint is a one time action, it is there to bootstrap your application not provide you with updates along the way.


## Requirements

- [JDK 11](https://openjdk.java.net/projects/jdk/11/)
- Recent version [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (including [docker-compose](https://docs.docker.com/compose/))
- Your favorite IDE (I prefer [IntelliJ Idea](https://www.jetbrains.com/idea/))

## Installation

> Retrieving a fresh new copy without any references
```
git clone https://github.com/barthr/spring-boot-blueprint
cd spring-boot-blueprint
rm -rf .git
git init
```

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
./gradlew npmInstall
cd src/main/webapp 
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

There is some config which need to be set:

> file: *build.gradle:50*

```
bootBuildImage {
    imageName = "<YOUR_IMAGE_NAME>"
}
```

Set `YOUR_IMAGE_NAME` to the name you would like to have for your image.


__To create a docker image including the frontend__
```
./gradlew buildFrontend bootBuildImage
```

__To create a docker image without the frontend__
```
./gradlew bootBuildImage
```

## Github CI

If you would like to use the provided github actions a couple of more settings are required. First you need to set 2 secrets in your github repository: 

```
DOCKER_USERNAME=<your_username>
DOCKER_PASSWORD=<your_password>
```
Next you also need to provide which image to push to your registry, this should be the same as the one provided in the `build.gradle`

> file: *.github/workflows/gradle.yaml:57*

```
repository: <DOCKER_HUB_NAMESPACE>/<DOCKER_HUB_REPOSITORY>
```

## Frequently asked questions

> What if I don't want to use the frontend?

*Remove the webapp folder in `src/main/webapp` and the buildsteps in `build.gradle` (including the node plugin)*
> What if I don't wnat to use the github actions?

`rm -rf .github`

> Where can I find the frontend when running the spring boot application?

*It is embedded during build time and can be found on the same port as your application*