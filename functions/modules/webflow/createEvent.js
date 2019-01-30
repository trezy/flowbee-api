const { webflowAPI } = require('../../services')

const collectionID = '5bdc84f77169fdf42d16afa9'





module.exports = async event => {
  const newItemData = {
    collectionId: collectionID,
    fields: {
      date: event.start.utc,
      'eventbrite-event-id': event.id,
      name: event.name.text || '',
      published: event.status === 'live',
      slug: event.id,
      'sold-out': event.ticket_availability.is_sold_out,
      _archived: event.status !== 'live',
      _draft: false,
    },
  }

  await webflowAPI.createItem(newItemData, { live: true })
}
