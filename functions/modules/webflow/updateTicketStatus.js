const { webflowAPI } = require('../../services')

const collectionID = '5bdc84f77169fdf42d16afa9'
// const siteID = '5bc803c7612fc8211a197ce5'





module.exports = async event => {
  // const collections = await webflowAPI.collections({ siteId: siteID })
  const { items } = await webflowAPI.items({ collectionId: collectionID })
  // const sites = await webflowAPI.sites()

  const item = items.find(({ 'eventbrite-event-id': id }) => id === event.id)
  // const item = items.find(({ 'eventbrite-event-id': id }) => id === event.id)

  if (item) {
    const newItemData = {
      collectionId: collectionID,
      itemId: item._id,
      fields: {
        date: event.start.utc,
        name: event.name.text,
        slug: event.id,
        'sold-out': event.ticket_availability.is_sold_out,
        _archived: false,
        _draft: false,
      },
    }

    await webflowAPI.updateItem(newItemData, { live: true })
  }
}
