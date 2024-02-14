# Hygraph 11ty Blog Starter


> An [11ty](https://www.11ty.dev/) starter for creating a basic blog with [Hygraph](https://hygraph.com)

## Quick start

[![Clone project](https://hygraph.com/button)](https://app.hygraph.com/clone/ccfd3e465ed249d987b0dfc3f107d437?name=Basic%20Blog)


1. **Clone and install the project**

```shell
npx degit git@github.com:hygraph/hygraph-eleventy-blog-starter.git
```

2. **Provide your Hygraph project keys**

> In order to use this starter, you'll need to have created a new Hygraph project using our `Blog Template`.

Navigate into your new site’s directory and copy the `.env.sample` file.

```shell
cd hygraph-blog
cp .env.sample .env
```

Inside of your newly created `.env` file, provide values for each variable. These variables can be found in the [project settings UI](https://hygraph.com/docs/guides/overview/api-access).

```env
HYGRAPH_URL=""
```

3. **Start building!**

Install the dependencies and start the Next.js dev server:

```shell
npm install
npm run dev
```

## Features
* Dynamic posts
* Dynamic pages
* Dynamic navigation
* Post table of contents generated from rich text