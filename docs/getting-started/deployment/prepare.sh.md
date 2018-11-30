It may be a requirement to replace documentations variables during CI.

This is only useful during documentation deployment.
 
We recommend to use a bash script in `styleguide/prepare.sh` for adding any build step to your documentation:

As an example, this will replace variables within `docs/**/*.md`:

```bash
#!/usr/bin/env bash

npx @rollup-umd/documentation-cli variable \
  PACKAGE_NAME=$(node -p "require('./package.json').name") \
  PACKAGE_DESCRIPTION="$(node -p "require('./package.json').description")" \
  PACKAGE_VERSION=$(node -p "require('./package.json').version") \
  NODE_VERSION=$(node --version) \
  NPM_VERSION=$(npm --version)
```  

You can build your documentation with:

```bash
$ ./styleguide/styleguide.prepare.sh # replace variables
$ npm run styleguild:build
```

It's ready to be deployed!
