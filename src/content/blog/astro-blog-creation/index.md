---
title: "How to Use Astro to Create a Blog"
pubDate: 2025-05-16
description: "
Astro is a modern static site generator that enables developers to build fast, content-focused websites with ease. Its unique approach to rendering only the necessary JavaScript on the client makes it an excellent choice for blogs, documentation, and marketing sites. In this article, we'll walk through the process of creating a blog with Astro, covering everything from setup to deployment.
"
tags: ["astro", "blog", "tutorial"]
hero: "./hero.webp"
heroAlt: ""
---


## Why Choose Astro?

Astro offers several advantages for building blogs:

- **Performance:** Ships zero JavaScript by default.
- **Flexibility:** Supports multiple frameworks (React, Vue, Svelte, etc.).
- **Content-first:** Markdown and MDX support out of the box.
- **SEO-friendly:** Generates static HTML for every page.

> **Note:** Astro is framework-agnostic, so you can use your favorite UI libraries or none at all.

## Getting Started

Let's begin by creating a new Astro project.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Create a New Project

Open your terminal and run:

```bash
npm create astro@latest
```

You'll be prompted to choose a template. For a blog, select the `blog` template or start with the `minimal` template for more control.

### Install Dependencies

Navigate into your project directory and install dependencies:

```bash
cd my-astro-blog
npm install
```

### Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) to see your site in action.


![mascot](./mascot.jpg)

## Project Structure

Astro projects have a simple, intuitive structure:

my-astro-blog/
├── public/
├── src/
│ ├── components/
│ ├── layouts/
│ ├── pages/
│ └── content/
├── astro.config.mjs
└── package.json

- **public/**: Static assets (images, fonts, etc.)
- **src/pages/**: Route-based pages (e.g., `index.astro`, `about.astro`)
- **src/content/**: Markdown or MDX blog posts (if using content collections)
- **src/components/**: Reusable UI components
- **src/layouts/**: Layout components for consistent page structure


## Creating Blog Posts

Astro supports Markdown and MDX for content. Let's create a simple blog post.

### 1. Add a Markdown File

Create a new file in `src/content/blog/` (you may need to create these folders):

```
src/content/blog/hello-world.md
```

Add the following content:

````markdown
---
title: "Hello World"
pubDate: 2025-05-16
description: "My first Astro blog post."
author: "Jane Doe"
tags: ["astro", "blog"]
---

# How to Use Astro to Create a Modern Blog

Astro is a modern static site builder that enables you to create fast, content-focused websites with ease. Its unique approach to web development—shipping zero JavaScript by default—makes it an excellent choice for building blogs that are both performant and easy to maintain. In this article, we'll walk through the process of creating a blog with Astro, covering everything from setup to deployment.
```

## Table of Contents

1. [Why Choose Astro?](#why-choose-astro)
2. [Setting Up Your Astro Project](#setting-up-your-astro-project)
3. [Creating Blog Pages](#creating-blog-pages)
4. [Adding Markdown Support](#adding-markdown-support)
5. [Listing Blog Posts](#listing-blog-posts)
6. [Styling Your Blog](#styling-your-blog)
7. [Deploying Your Blog](#deploying-your-blog)
8. [Conclusion](#conclusion)


## Why Choose Astro?

Astro stands out among static site generators for several reasons:

- **Zero JavaScript by Default:** Astro only sends the JavaScript you need, making your site lightning fast.
- **Component Agnostic:** Use React, Vue, Svelte, or plain HTML components together.
- **Markdown-First:** Write your content in Markdown, and Astro handles the rest.
- **Built-in Image Optimization:** Astro optimizes images out of the box.
- **Easy Deployment:** Deploy to any static hosting provider with minimal configuration.


## Setting Up Your Astro Project

Let's start by creating a new Astro project.

### 1. Install Node.js

Astro requires Node.js (v18.0.0 or higher). You can check your version with:

```bash
node -v
```
````

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/).

### 2. Create a New Astro Project

Open your terminal and run:

```bash
npm create astro@latest
```

You'll be prompted to name your project and select a template. For a blog, you can choose the "Blog" template or start with the "Minimal" template.

### 3. Install Dependencies

Navigate into your project directory and install dependencies:

```bash
cd your-project-name
npm install
```

### 4. Start the Development Server

Run the following command to start the local development server:

```bash
npm run dev
```

Visit `http://localhost:4321` in your browser to see your new Astro site!


## Creating Blog Pages

Astro uses a file-based routing system. To create a new page, simply add a `.astro` file to the `src/pages` directory.

For example, to create an "About" page:

```bash
touch src/pages/about.astro
```

Add the following content:

```astro
---
title: "About"
---
<h1>About This Blog</h1>
<p>Welcome to my Astro-powered blog!</p>
```


## Adding Markdown Support

Astro makes it easy to write blog posts in Markdown. By default, Markdown files placed in `src/pages` become pages on your site.

### 1. Create a Blog Post

Create a new file:

```bash
mkdir -p src/pages/posts
touch src/pages/posts/hello-world.md
```

Add the following content:

```markdown
---
title: "Hello World"
pubDate: 2024-06-01
description: "My first post with Astro!"
author: "Dominik"
---

# Hello World

Welcome to my first blog post using Astro! 🚀

Astro makes it easy to write content in Markdown and publish it as a fast, modern website.
```

### 2. Frontmatter

The section at the top (between `---`) is called "frontmatter." It lets you define metadata for your post, such as the title, date, and description.


## Listing Blog Posts

To display a list of your blog posts, you can use Astro's `glob` import to fetch all Markdown files in a directory.

Create a new file at `src/pages/blog.astro`:

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
---

<h1>Blog</h1>
<ul>
  {posts.map(post => (
    <li>
      <a href={post.url}>{post.data.title}</a> - <small>{post.data.pubDate}</small>
    </li>
  ))}
</ul>
```

> **Note:** If you want to use `getCollection`, you need to set up [Content Collections](https://docs.astro.build/en/guides/content-collections/). For a simple blog, you can use `import.meta.glob`:

```astro
---
const postImporters = import.meta.glob('./posts/*.md');
const postPromises = Object.entries(postImporters).map(async ([path, resolver]) => {
  const post = await resolver();
  return {
    url: path.replace('./', '/').replace('.md', ''),
    ...post.frontmatter,
  };
});
const posts = await Promise.all(postPromises);
---

<h1>Blog</h1>
<ul>
  {posts.map(post => (
    <li>
      <a href={post.url}>{post.title}</a> - <small>{post.pubDate}</small>
    </li>
  ))}
</ul>
```


## Styling Your Blog

Astro supports several ways to add styles:

- **Global CSS:** Place a CSS file in `src/styles` and import it in your `src/layouts` or `src/pages`.
- **Scoped Styles:** Add a `<style>` tag to any `.astro` file.

Example of scoped styles:

```astro
---
title: "Styled Page"
---
<h1>Styled Page</h1>
<p>This page has custom styles!</p>

<style>
  h1 {
    color: #7c3aed;
    font-family: 'Inter', sans-serif;
  }
  p {
    font-size: 1.2rem;
  }
</style>
```


## Deploying Your Blog

Once you're happy with your blog, it's time to share it with the world!

### 1. Build Your Site

Run:

```bash
npm run build
```

This generates a static site in the `dist/` directory.

### 2. Deploy to a Static Host

You can deploy your Astro site to platforms like:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

For example, to deploy to Netlify:

1. Push your code to GitHub.
2. Connect your repository to Netlify.
3. Set the build command to `npm run build` and the publish directory to `dist`.

Astro's [deployment guide](https://docs.astro.build/en/guides/deploy/) has detailed instructions for each platform.


## Conclusion

Astro is a powerful and flexible tool for building blogs and content-driven websites. Its focus on performance, simplicity, and developer experience makes it a great choice for both beginners and experienced developers.

**Key Takeaways:**

- Astro ships zero JavaScript by default, making your blog fast.
- Write content in Markdown and use frontmatter for metadata.
- Use file-based routing to organize your pages and posts.
- Deploy your site easily to any static hosting provider.

Ready to start your own blog? [Check out the Astro documentation](https://docs.astro.build/) and join the [Astro Discord community](https://astro.build/chat) for more tips and support.


Happy blogging with Astro! 🚀
