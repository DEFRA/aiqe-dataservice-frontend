import { english } from '~/src/server/data/en/homecontent.js'

const searchLocationController = {
  handler: (request, h) => {
    // const { query } = request
    request.yar.set('errors', '')
    request.yar.set('errorMessage', '')
    // const searchLocation = request.yar.get('searchLocation')
    // const locationMiles = request.yar.get('locationMiles')

    if (request != null) {
      //   const x = query
      // const invalidSearchEntry = false
    }

    return h.view('search-location/index', {
      pageTitle: english.searchLocation.pageTitle,
      heading: english.searchLocation.heading,
      page: english.searchLocation.page,
      serviceName: english.searchLocation.serviceName,
      params: english.searchLocation.searchParams,
      button: english.searchLocation.button
    })
  }
}

export { searchLocationController }
