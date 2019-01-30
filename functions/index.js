const functions = require('firebase-functions')





const {
  eventbrite,
  webflow,
} = require('./routes')





exports.eventbrite = functions.https.onRequest(eventbrite)

exports.webflow = functions.https.onRequest(webflow)
