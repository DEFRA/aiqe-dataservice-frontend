import { english } from '~/src/server/data/en/homecontent.js'

const searchLocationController = {
  handler: (request, h) => {
    // const { query, path } = request

    // const errors = request.yar.get('errors')
    // const errorMessage = request.yar.get('errorMessage')
    // const locationType = request.yar.get('locationType')

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
