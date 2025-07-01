import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default fp(async (fastify) => {
    fastify.register(swagger, {
        swagger: {
            info: {
                title: 'Employee API',
                description: 'CRUD de empleados con Fastify',
                version: '1.0.0',
            },
        },
    })

    fastify.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    })
})
