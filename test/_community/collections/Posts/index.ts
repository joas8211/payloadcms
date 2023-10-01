import type { CollectionConfig } from '../../../../src/collections/config/types';

export const postsSlug = 'posts';

export const PostsCollection: CollectionConfig = {
  slug: postsSlug,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'hiddenPrefix',
      type: 'text',
      hidden: true,
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc, req, context }) => {
        // Avoid recursion.
        if (context?.skipPostAfterRead) {
          return doc;
        }

        // Load prefix from the hidden field.
        const { payload } = req;
        const { hiddenPrefix } = await payload.findByID({
          collection: postsSlug,
          id: doc.id,
          depth: 0,
          showHiddenFields: true,
          req,
          context: { skipPostAfterRead: true },
        });

        // Append prefix to the text.
        return { ...doc, text: hiddenPrefix + doc.text };
      },
    ],
  },
};
