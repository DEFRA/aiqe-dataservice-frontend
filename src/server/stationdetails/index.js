import { stationDetailsController } from '~/src/server/stationdetails/controller.js'

export const stationDetails = {
  plugin: {
    name: 'stationdetails',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/stationdetails',
          ...stationDetailsController
        }
      ])
    }
  }
}
