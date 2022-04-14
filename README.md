# blz-ice-node
Static site generator for Node.js

## What is it?

ICE is a static site generator which uses the FIRE front end library for DOM interaction. This SSG can deploy to Netlify, Render, local, etc.

## Development

To use, simply run the following commands:

```shell
npm install
npm run publish
```

That will output desired static pages in the /public/ directory.

The list of pages to render can be found in the /src/data/site.json file under "pages". By default, each page will be selected from /src/assets/md.

## Deployment

* Netlify: To deploy to Netlify, simply use the included "netlify.toml" file in the root of this repository, or if you wish you may customize it or swap it out for one of your choosing.

## Made with Love

By [Blazed Labs LLC](https://blazedlabs.com/). 
* We turn dreams into reality.