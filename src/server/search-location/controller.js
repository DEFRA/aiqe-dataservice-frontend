import { english } from '~/src/server/data/en/homecontent.js' 
import { setErrorMessage } from '~/src/server/common/helpers/errors_message'

import { config } from '~/src/config'

const searchLocationController = {
  handler: async (request, h) => {
    const { query, path } = request
    console.log("query in kkkk",query)
    let invalidSearchEntry = false
    request.yar.set('errors', '')
    request.yar.set('errorMessage', '')
    if (request != null) {
     // const data = await getDefaultLocaleData('search')
      //const mainContent = data?.mainContent
     // const getHelpSection = data?.getHelpSection
      let invalidSearchEntry = false

      // request.yar.set('errors', '')
      // request.yar.set('errorMessage', '')

      // if (request.query?.fullSearchQuery?.length > 0) {
      //   request.yar.set('fullSearchQuery', {
      //     value: decodeURI(request.query.fullSearchQuery)
      //   })
      //   request.yar.set('searchQuery', {
      //     value: decodeURI(
      //       request.query.searchQuery?.replace(/ *\([^)]*\) */g, '')
      //     )
      //   })
      // }
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
