import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "91a3ef6a-493e-4ad9-871a-9a74c959b297", // Get this from tina.io
  token: "882628e7f78aa74185d2484ed15df473fe154333", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/pages/posts",
        defaultItem: () => {
          return {
            title: 'New Post',
            pubDate: new Date().toDateString(),
            author: 'John',
            layout: '../../layouts/MarkdownPostLayout.astro',
            tags: ['unsorted'],
          }
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: 'Author',
            name: 'author',
            type: 'string',
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Posted",
            ui: {
              timeFormat: "HH:mm",
              dateFormat: "YYYY-MM-DD",
            },
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: 'Tags',
            name: 'tags',
            type: 'string',
            list: true,
          },
        ],
      },
    ],
  },
});
