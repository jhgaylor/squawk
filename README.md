![Squawk in use](/screenshots/squawkv0.0.1.png?raw=true)

# Limitations:

* every outgoing message has to come from a twilio number
* every user has to give their API info to the squawk server
  * the application could be rewritten in a manner to not need a server but would have to do without the webhooks side of things, which sounds dreadful.

# Steps to configuring your twilio number to work with Squawk

1) Set up Webhooks to point to http://squawk:4000/twilio/incoming . Upon invitation, you'll receive a hosts file entry to make. This is a temporary step while the API is side wide open.

2) Meet up with Jake to get your Twilio user created. Will need your twilio api creds and phone number.

3) Download & Login using the Squawk desktop client

# [Future] Steps to configuring your twilio number to work with Squawk

1) Set up Webhooks to point to http://squawk:4000/twilio/incoming . Upon invitation, you'll receive a hosts file entry to make. This is a temporary step while the API is wide open.

2) Register an Account using the binary for your operating system.

3) Login to your account