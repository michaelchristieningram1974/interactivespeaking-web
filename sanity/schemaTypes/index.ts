import { type SchemaTypeDefinition } from 'sanity'
import lesson from './lesson'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [lesson],
}