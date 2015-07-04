# Squawk Api Server

## Gulp Commands

### gulp

Runs the linter.


### gulp build

Create the final deploy artifact. Generate the new build of the source code, run the tests against it, delete the previous docker image, build the new docker image and delete the new build. At this point the docker image is ready to be deployed using the deploy gulp job.

### gulp deploy

**Note:** Run `docker login` prior to running this command.

Deploys the most recent build to the server.

**Parameters:**

`twilio_sid` & `twilio_auth_token`: both required to tell the application which twilio account to use.

`external_port`: indicates which external port to deploy the application to

`host`: ssh host to connect to. configure access via `~/.ssh/config`. The SSH stuff here will be fun...
