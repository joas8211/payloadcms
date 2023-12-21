import payload from '../../packages/payload/src'
import { initPayloadTest } from '../helpers/configHelpers'
import { postsSlug } from './collections/Posts'

require('isomorphic-fetch')

describe('_Community Tests', () => {
  beforeAll(async () => {
    await initPayloadTest({ __dirname, init: { local: false } })
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy(payload)
    }
  })

  test('pagination returns correct result after deletion with transaction', async () => {
    const {
      docs: [user],
    } = await payload.find({ collection: 'users', limit: 1 })
    const post = await payload.create({
      collection: postsSlug,
      data: {},
    })
    await payload.delete({
      collection: postsSlug,
      id: post.id,
      // Deletion is done with user set, so pending transaction might be the
      // reason why this is not working with PostgreSQL.
      user,
    })
    const result = await payload.find({
      collection: postsSlug,
    })
    expect(result).toEqual({
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit: 10,
      nextPage: null,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: 0,
      totalPages: 1,
    })
  })
})
