import { english } from '~/src/server/data/en/homecontent.js'

const stationDetailsController = {
  handler: (request, h) => {
    // const { query } = request
    request.yar.set('errors', '')
    request.yar.set('errorMessage', '')
    if (request != null) {
      //   const x = query
      // const invalidSearchEntry = false
    }

    return h.view('stationdetails/index', {
      pageTitle: english.stationDetails.pageTitle,
      title: english.stationDetails.title,
      serviceName: english.stationDetails.serviceName,
      paragraphs: english.stationDetails.paragraphs
    })
  }
}

export { stationDetailsController }
