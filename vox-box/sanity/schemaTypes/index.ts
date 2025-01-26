import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { complain } from './complain'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, complain],
}
