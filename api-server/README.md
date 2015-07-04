# Squawk Api Server

Please note that nothing is locked down. Only use the server if you are comfortable with how bad it is. To use the server, get a twilio account, and email me that you want in. I'll send you an alpha build and the info you need to get connected.

**To be clear:** there is no security. All you have to do to pretend to be someone is enter their twilio number at the "sign in" page. The application server has to have your twilio api creds. This is not something anyone should consider to be secure. One day this will be fixed but for now, data is going plaintext over the wire and there is no password.

## Environment Variables

`MONGO_URL`: url to the mongodb instance

## Endpoints

Incoming requests should have a header `Content-Type` set to `application/json` and send JSON strings in the request body. Responses will be in JSON format and the API will attempt to give intelligent status codes.

### Contacts

#### GET /contacts

Returns all contacts.

**Query Params**

`ownerId`: [optional] String objectId of the user whose contacts are being requested


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
