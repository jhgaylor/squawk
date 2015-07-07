# Bugs

login -> logout -> login -> contacts list is missing. work around: refresh

# How to run

```js
npm install
gulp watch
npm start
```

# TODO:

* concat + minify pipeline (prod only)
* auth flow (basic auth over https vs oauth (https required?))
* not broken design
* tests + gulp testing
* binary build pipeline
  * create dist
  * create binary
  * upload binary
  * optionally keep the binary around ( for local use )
  * clean up
* model classes a thing? like a transform hook?
* features
  * popout conversations?
  * mms
  * group text
  * remove contact
  * connected status
  * queue messages to be "tried again later"
  * compose character counter. SMS segmentation. character limit 1600?
  * notifications (sound, os level)
  * search bar for contacts list (filter the list client side)
  * text replacements
  * commands (hubot style)
  * embed mms by using text snippet w/o downloading the file to the originating device (hash of snippets & urls)
  * multiple #s per contact
  * multiple twilio numbers per user
  * search
  * data vis
  * encrypted communication between squawk users. is there any way to do it between generic sms and squawk?
  * compose button to cleanly walk through selecting a contact (or making a new one) and then making them the active contact and then focusing the compose bar
  * make it extensible. ie:
    * emit events
    * document apis
    * make lifecycle hooks
