import mongoose from 'mongoose';
import payload from '../../src';
import { initPayloadTest } from '../helpers/configHelpers';
import { postsSlug } from './collections/Posts';

describe('_Community Tests', () => {
  beforeAll(async () => {
    await initPayloadTest({ __dirname, init: { local: false } });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await payload.mongoMemoryServer.stop();
  });

  it('local API example', async () => {
    await payload.create({
      collection: postsSlug,
      data: {
        text: 'post1',
        hiddenPrefix: 'A-',
      },
    });
    await payload.create({
      collection: postsSlug,
      data: {
        text: 'post2',
        hiddenPrefix: 'B-',
      },
    });

    const { docs } = await payload.find({ collection: postsSlug });
    expect(docs).toContain(expect.objectContaining({ text: 'A-post1' }));
    expect(docs).toContain(expect.objectContaining({ text: 'B-post2' }));
  });
});
