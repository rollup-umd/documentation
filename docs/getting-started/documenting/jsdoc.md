We use JSdoc annotations in our javascript to generate documentation in markdown.

If you don't know what JSdoc is, you should read their website:

- [JSdoc website](http://usejsdoc.org/)
- [Tags exampple](http://usejsdoc.org/tags-example.html)
- [Tags param](http://usejsdoc.org/tags-param.html)

To learn more about the underlying framework:

- Read [documentationjs](https://github.com/documentationjs/documentation)
- Read their [Recipes](https://github.com/documentationjs/documentation/blob/master/docs/RECIPES.md), tricks for writing effective JSDoc docs

You must now that:

- **`@public`** is required if you want to export your documentation, otherwise, JSdoc will be ignored during the markdown generation.
- The markdown is generated when you type `npm run jsdoc`, `npm run styleguide` or `npm run styleguide:build`.
- JSdoc generation currently does not support hot reload, you will have to redo the command.

Add in the script file `styleguide/jsdoc.sh` the necessary command to build your documentation.

 
