import Hapi from '@hapi/hapi'
import Joi from 'joi'

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })
  server.route([
    {
      method: 'get',
      path: '/',
      handler: function (request, response) {
        return 'teste'
      }
    },
    {
      method: 'get',
      path: '/get/{id}',
      handler: function (request) {
        return request.params
      },
      options: {
        validate: {
          params: Joi.object({
            id: Joi.string().required()
          })
        }
      }
    }
  ])
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
