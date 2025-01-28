import { english } from '~/src/server/data/en/homecontent.js'
import { setErrorMessage } from '~/src/server/common/helpers/errors_message.js'
import axios from 'axios'

const multipleLocationsController = {
  handler: async (request, h) => {
    // const { query } = request

    if (request != null) {
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')

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
    // const searchValue = searchInput?.value
    // const userLocation = searchValue
    // console.log('searchInput', searchInput, searchValue,query)
    if (searchInput) {
      request.yar.set('errors', '')
      request.yar.set('errorMessage', '')
      const result = await invokeosnameAPI()
      // console.log('resultofAPI', result)
      async function invokeosnameAPI() {
        try {
          const response = await axios.get('http://localhost:3001/osnameplaces')

          return response.data
        } catch (error) {
          return error // Rethrow the error so it can be handled appropriately
        }
      }

      //       let matches = result.filter((item) => {
      //         const name = item?.GAZETTEER_ENTRY.NAME1.toUpperCase().replace(
      //           /\s+/g,
      //           ''
      //         )
      //         const name2 = item?.GAZETTEER_ENTRY.NAME2?.toUpperCase().replace(
      //           /\s+/g,
      //           ''
      //         )
      //         return (
      //           name.includes(userLocation.replace(/\s+/g, '')) ||
      //           userLocation.includes(name) ||
      //           userLocation.includes(name2)
      //         )
      //       })
      // console.log('getOSPlaces', result.getOSPlaces)
      return h.view('multiplelocations/index', {
        results: result.getOSPlaces,
        pageTitle: english.multipleLocations.pageTitle,
        heading: english.multipleLocations.heading,
        page: english.multipleLocations.page,
        serviceName: english.searchLocation.serviceName,
        title: english.multipleLocations.title,
        params: english.multipleLocations.paragraphs,
        button: english.multipleLocations.button
      })
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
