import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: postsSlug,
    },
  ],
  slug: postsSlug,
}
