import { buildConfigWithDefaults } from '../buildConfigWithDefaults';
import { PostsCollection } from './collections/Posts';

export default buildConfigWithDefaults({
  collections: [
    PostsCollection,
  ],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },
});
