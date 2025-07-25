# Technical Specifications Site

This repository contains the build process for the technical specification site.

This site is built using [Antora](https://antora.org) and also contains the content source that provides the site's home page.

Other technical specifications are versioned independently and thus live in their own repositories.

## Building Locally

You can build a preview version of this site locally. On Mac, this can be done with the following (from the root of this repository):

```sh
$ npm install
$ npx antora --fetch antora-playbook-local.yml
$ open build/site/index.html
```

**IMPORTANT:** If you change the content of the wrapper page (`docs/modules/ROOT/...`), you must commit those changes to git (at least locally) before rebuilding the site. Antora does not pay attention to the contents of the Git working directory.

The preview site will incorporate content from the other technical specification repositories as found on github.com.
