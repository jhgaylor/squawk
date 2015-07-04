# Squawk Api Server

# Environment Variables

`MONGO_URL`: url to the mongodb instance

## Gulp Commands

### gulp

Runs the linter and the tests.

### gulp test

Runs the tests

### gulp lint

Runs jscs

### gulp compile

Takes the current source from `./src` and compiles it, leaving the artifact at `./dist`.

### gulp build

Creates the final deploy artifact, a docker image.

First calls compile to generate a new build of the source code.

Then uses the dockerfile to create a docker image from `./dist` before removing the compilation artifact.

### gulp push-to-docker-hub

Pushes the most recently created docker image to docker hub.

Depended on by `gulp deploy`

### gulp deploy

**Note:** Run `docker login` prior to running this command.

Deploys the most recent build to the server.

**Expected Environment Vars:**

`TWILIO_SID` & `TWILIO_AUTH_TOKEN`: both required to tell the application which twilio account to use. Without these, the server will just log what it **would have** sent to twilio.
