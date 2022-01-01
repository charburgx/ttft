import { validate as expressValidate, Joi, schema, EvOptions } from 'express-validation'
import type {SchemaMap} from '@hapi/joi'

export const validate = (schema: schema, options: EvOptions = {}, joiRoot?: Parameters<typeof expressValidate>[2]) => expressValidate(schema, { context: true, keyByField: true, ...options }, joiRoot)