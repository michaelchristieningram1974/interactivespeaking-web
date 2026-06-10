import { type SchemaTypeDefinition } from 'sanity'
import lesson from './lesson'
import toeicPart from './toeicPart'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [lesson, toeicPart],
}