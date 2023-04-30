import { buildConfig } from '../buildConfig';
import { PostsCollection, postsSlug } from './collections/Posts';
import { MenuGlobal } from './globals/Menu';
import { devUser } from '../credentials';
import { AccessGroupCollection } from './collections/AccessGroup';

export default buildConfig({
  // ...extend config here
  collections: [
    PostsCollection,
    AccessGroupCollection,
    // ...add more collections here
  ],
  globals: [
    MenuGlobal,
    // ...add more globals here
  ],

  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    const accessGroup = await payload.create({
      collection: 'accessGroups',
      data: {
        available: true,
      },
    });

    await payload.create({
      collection: postsSlug,
      data: {
        text: 'example post',
        accessGroup: accessGroup.id,
      },
    });
  },
});
