import type { CollectionConfig } from '../../../../src/collections/config/types';
import { accessGroupSlug } from '../AccessGroup';

export const postsSlug = 'posts';

export const PostsCollection: CollectionConfig = {
  slug: postsSlug,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'accessGroup',
      type: 'relationship',
      hidden: true,
      relationTo: accessGroupSlug,
    },
  ],
  access: {
    read: () => ({
      'accessGroup.available': {
        equals: true,
      },
    }),
  },
};
