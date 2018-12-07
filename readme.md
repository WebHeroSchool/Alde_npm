## Global dependencies
You must have installed: `node`, `npm`, `gulp`.

##How to work with this project

1. `git clone https://github.com/WebHeroSchool/Alde_npm.git app`
2. `cd app`
3. `npm i`
4. `gulp` 
... or
`NODE_ENV=production gulp`
(for production version)

---

## Project structure

* `src/` 
    - `css/`
      - `style.css` entry-point styles (template)
    - `images/` files using template (svg, png)
    - `fonts/`
    - `scripts/`
      - `index.js` entry-point scripts (template)
    - `templates/`
    - `index.hbs` entry-point (template)
    - `test.json` handlebars context
* `prod/` build directory 
* `eslintrc.json` eslint rules
* `stylelintrc.json` stylilint rules