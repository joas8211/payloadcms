import type { CollectionConfig } from '../../../../src/collections/config/types';

export const accessGroupSlug = 'accessGroups';

export const AccessGroupCollection: CollectionConfig = {
  slug: accessGroupSlug,
  fields: [
    {
      name: 'available',
      type: 'checkbox',
    },
  ],
};
