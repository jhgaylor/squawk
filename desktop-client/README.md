# Bugs

login -> logout -> login -> contacts list is missing. work around: refresh


# TODO:

* SCSS Build Pipeline
  * can we stick wiredep to work here? pipe the files through a compiler, concat them in the right order, minify, and embed that into index.html
* concat + minify pipeline (prod only)
* gulp watch
* auth flow (basic auth over https vs oauth (https required?))
* not broken design
* binary build pipeline
* features
  * popout conversations?
  * mms
  * group text
  * remove contact
  * notifications (sound, os level)
  * text replacements
  * commands (hubot style)
  * embed mms w/ text snippet w/o downloading the file to the originating device
  * multiple #s per contact
  * multiple twilio numbers per user
  * search
  * data vis
  * encrypted communication between squawk users. is there any way to do it between generic sms and squawk?

