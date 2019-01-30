const { webflowAPI } = require('../../services')

const collectionID = '5bdc84f77169fdf42d16afa9'
// const siteID = '5bc803c7612fc8211a197ce5'





module.exports = async event => {
  console.log('Updating event:', event)
  // const collections = await webflowAPI.collections({ siteId: siteID })
  // const sites = await webflowAPI.sites()
  const { items } = await webflowAPI.items({ collectionId: collectionID })

  const item = items.find(({ 'eventbrite-event-id': id }) => id === event.id)

  if (item) {
    const result = await webflowAPI.updateItem({
      collectionId: collectionID,
      itemId: item._id,
      fields: {
        date: event.start.utc,
        name: event.name.text,
        published: event.status === 'live',
        slug: event.id,
        'sold-out': event.ticket_availability.is_sold_out,
        _archived: event.status !== 'live',
        _draft: false,
      },
    }, { live: true })

    console.log('Webflow result:', result)
  } else {
    console.log('Event does not exist in Webflow')
  }
}
