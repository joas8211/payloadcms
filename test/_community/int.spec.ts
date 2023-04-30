import mongoose from 'mongoose';
import payload from '../../src';
import { initPayloadTest } from '../helpers/configHelpers';
import { devUser } from '../credentials';

require('isomorphic-fetch');

let apiUrl;
let jwt;

const headers = {
  'Content-Type': 'application/json',
};
const { email, password } = devUser;
describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const { serverURL } = await initPayloadTest({ __dirname, init: { local: false } });
    apiUrl = `${serverURL}/api`;

    const response = await fetch(`${apiUrl}/users/login`, {
      body: JSON.stringify({
        email,
        password,
      }),
      headers,
      method: 'post',
    });

    const data = await response.json();
    jwt = data.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await payload.mongoMemoryServer.stop();
  });

  // --__--__--__--__--__--__--__--__--__
  // You can run tests against the local API or the REST API
  // use the tests below as a guide
  // --__--__--__--__--__--__--__--__--__

  it('user finds post', async () => {
    const { docs: [user] } = await payload.find({ collection: 'users' });
    const result = await payload.find({
      collection: 'posts',
      where: { text: { equals: 'example post' } },
      user,
      overrideAccess: false,
    });
    expect(result).toEqual(expect.objectContaining({ totalDocs: 1 }));
  });
});
