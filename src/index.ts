import Fastify from 'fastify'
import dotenv from 'dotenv'
import prismaPlugin from './plugins/prisma'
import swaggerPlugin from './plugins/swagger'
import employeeRoutes from './routes/employee.routes'

dotenv.config()

const buildServer = async () => {
    const app = Fastify({ logger: true })

    await app.register(prismaPlugin)
    await app.register(swaggerPlugin)

    await app.register(employeeRoutes)

    return app
}

buildServer().then((app) => {
    const port = Number(process.env.PORT) || 3000
    app.listen({ port, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
        app.log.info(`🚀 Server running at ${address}`)
    })
})
