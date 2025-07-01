import { ZodTypeAny } from 'zod'
import fromZodSchema from 'zod-to-json-schema'

export const zodToSchema = (schema: ZodTypeAny) => fromZodSchema(schema)