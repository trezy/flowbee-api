const { eventbriteAPI } = require('../services')
const webflow = require('../modules/webflow')





module.exports = async (request, response) => {
  const {
    api_url: apiURL,
    config: { action },
  } = request.body


  const [entityType, actionType] = action.split('.')
  let eventbriteData = await eventbriteAPI.request(`${apiURL}?expand=ticket_availability`)

  switch (entityType) {
    case 'event':
      switch (actionType) {
        case 'created':
          await webflow.createEvent(eventbriteData)
          break

        case 'deleted':
        case 'published':
        case 'unpublished':
        case 'updated':
          await webflow.updateEvent(eventbriteData)
          break

        default:
          break
      }
      break

    case 'order':
      switch (actionType) {
        case 'updated':
        default:
          eventbriteData = await eventbriteAPI.request(`https://www.eventbriteapi.com/v3/events/${eventbriteData.event_id}?expand=ticket_availability`)
          await webflow.updateEvent(eventbriteData)
          break
      }
      break

    default:
      break
  }

  response.send('Hello from Firebase!')
}
