import { english } from '~/src/server/data/en/homecontent.js'
import { setErrorMessage } from '~/src/server/common/helpers/errors_message.js'
import { config } from '~/src/config/index.js'
import axios from 'axios'

const multipleLocationsController = {
  handler: async (request, h) => {
    // const { query } = request

    if (request != null) {
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      request.yar.set('locationMiles', request.query?.locationMiles)
      if (request.query?.fullSearchQuery?.length > 0) {
        request.yar.set('fullSearchQuery', {
          value: decodeURI(request.query.fullSearchQuery)
        })
        request.yar.set('searchQuery', {
          value: decodeURI(
            request.query.searchQuery?.replace(/ *\([^)]*\) */g, '')
          )
        })
      }
    }
    const searchInput = request?.yar?.get('fullSearchQuery')
    const searchValue = searchInput?.value
    // const userLocation = searchValue

    const locationMiles = request.query?.locationMiles
    if (searchValue) {
      request.yar.set('searchLocation', searchValue)
    } else {
      request.yar.set('searchLocation', '')
    }
    if (searchInput) {
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      const result = await invokeosnameAPI()
      console.log("config.get('backendApiUrl')", config.get('backendApiUrl'))
      console.log("config.get('osnameApiUrl')", config.get('osnameApiUrl'))
      async function invokeosnameAPI() {
        try {
          const response = await axios.get(
            config.get('backendApiUrl') +
              config.get('osnameApiUrl') +
              searchValue
          )

          return response.data
        } catch (error) {
          return error // Rethrow the error so it can be handled appropriately
        }
      }
      const locations = result.getOSPlaces
      if (locations) {
        if (locations.length === 0) {
          return h.view('multiplelocations/nolocation', {
            results: result.getOSPlaces,
            serviceName: english.notFoundLocation.heading,
            paragraph: english.notFoundLocation.paragraphs,
            searchLocation: searchValue
          })
        } else if (locations.length === 1) {
          return h.view('monitoring-station/index', {
            pageTitle: english.monitoringStation.pageTitle,
            title: english.monitoringStation.title,
            serviceName: english.monitoringStation.serviceName,
            paragraphs: english.monitoringStation.paragraphs,
            searchLocation: searchValue,
            locationMiles
          })
        } else {
          return h.view('multiplelocations/index', {
            results: result.getOSPlaces,
            pageTitle: english.multipleLocations.pageTitle,
            heading: english.multipleLocations.heading,
            page: english.multipleLocations.page,
            serviceName: english.searchLocation.serviceName,
            title: english.multipleLocations.title,
            params: english.multipleLocations.paragraphs,
            button: english.multipleLocations.button,
            locationMiles,
            searchLocation: searchValue
          })
        }
      }
    } else {
      const searchInput = request?.yar?.get('fullSearchQuery')
      if (!searchInput?.value) {
        // console.log('comes into else pART OF')
        const errorData = english.searchLocation.errorText.uk
        const errorSection = errorData?.fields
        setErrorMessage(request, errorSection?.title, errorSection?.text)
        const errors = request.yar?.get('errors')
        const errorMessage = request.yar?.get('errorMessage')

        return h.view('search-location/index', {
          pageTitle: english.searchLocation.pageTitle,
          heading: english.searchLocation.heading,
          page: english.searchLocation.page,
          serviceName: english.searchLocation.serviceName,
          params: english.searchLocation.searchParams,
          button: english.searchLocation.button,
          errors,
          errorMessage
        })
      }
    }
  }
}

export { multipleLocationsController }
