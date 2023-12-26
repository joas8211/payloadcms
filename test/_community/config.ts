import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { PostsCollection, postsSlug } from './collections/Posts'

export default buildConfigWithDefaults({
  collections: [PostsCollection],
  onInit: async (payload) => {
    const root = await payload.create({
      collection: postsSlug,
      data: {
        text: 'root',
      },
    })

    await payload.create({
      collection: postsSlug,
      data: {
        text: 'sub',
        parent: root.id,
      },
    })
  },
})
