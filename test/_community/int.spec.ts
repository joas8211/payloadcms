import payload from '../../packages/payload/src'
import { initPayloadTest } from '../helpers/configHelpers'
import { postsSlug } from './collections/Posts'

describe('_Community Tests', () => {
  beforeAll(async () => {
    await initPayloadTest({ __dirname, init: { local: true } })
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy(payload)
    }
  })

  it('finds 1 root post with equals', async () => {
    const {
      docs: [post],
      totalDocs: rootCount,
    } = await payload.find({
      collection: postsSlug,
      where: {
        parent: { equals: null },
      },
    })
    expect(rootCount).toBe(1)
    expect(post.text).toBe('root')
  })

  it('finds 1 root post with exists', async () => {
    const {
      docs: [post],
      totalDocs: rootCount,
    } = await payload.find({
      collection: postsSlug,
      where: {
        parent: { exists: false },
      },
    })
    expect(rootCount).toBe(1)
    expect(post.text).toBe('root')
  })

  it('finds 1 sub post with equals', async () => {
    const {
      docs: [post],
      totalDocs: subCount,
    } = await payload.find({
      collection: postsSlug,
      where: {
        parent: { not_equals: null },
      },
    })
    expect(subCount).toBe(1)
    expect(post.text).toBe('sub')
  })

  it('finds 1 sub post with exists', async () => {
    const {
      docs: [post],
      totalDocs: subCount,
    } = await payload.find({
      collection: postsSlug,
      where: {
        parent: { exists: true },
      },
    })
    expect(subCount).toBe(1)
    expect(post.text).toBe('sub')
  })
})
