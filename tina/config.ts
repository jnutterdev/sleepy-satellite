import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_SECRET_ID, // Get this from tina.io
  token: process.env.TINA_SECRET_TOKEN, // Get this from tina.io

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
