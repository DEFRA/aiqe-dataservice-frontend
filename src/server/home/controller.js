/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
import { english } from '~/src/server/data/en/homecontent.js'

export const homeController = {
  handler(_request, h) {
    const { home } = english
    return h.view('home/index', {
      pageTitle: home.pageTitle,
      heading: home.heading,
      text: home.texts,
      links: home.links,
      buttontxt: home.buttonText,
      subheading: home.subheading
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
