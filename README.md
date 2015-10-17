# Seed

A highly extensible nodejs framework.

## Features

- Highly Extensible
- Easy to Use
- Full Stack
- ORM Integrated
- ES6/ES7 Syntax
- Isomorphic

## Workflow & Implementation Details

| Item       | Choice |
|------------|--------|
| Editor     | [Sublime Text 3](http://www.sublimetext.com/3) |
| Build Tool | [Webpack](https://github.com/webpack/webpack) |
| Automation | [Gulp](https://github.com/gulpjs/gulp) |
| Backend    | [Node](https://nodejs.org/en/), [Express(>=4.0.0)](http://expressjs.com/) |
| ORM        | [Waterline](https://github.com/balderdashy/waterline) |
| Frontend   | [React](https://facebook.github.io/react/), [Redux](https://github.com/rackt/redux), [React-Router-Component](https://github.com/STRML/react-router-component) |
| Testing    | [Mocha](https://mochajs.org/) |

## Example

These are just code snippets and outlines sketched in my mind, not a really working example

### File Structure

The file structure takes the advantage of `django`, which means there are several apps in a project and these apps will run in parallel

```
<project name>/
- node_modules/
----- seed/                     <!-- this is what we are going to work on -->
- gulp/                         <!-- gulp tasks and webpack configurations -->
- src/
----- <app name 1>/
--------- index.js              <!-- backend app entry -->
--------- flux/
------------- views/
------------- actions/
------------- stores/
------------- boot.js           <!-- frontend app entry -->
--------- models/               <!-- ORM schemas -->
--------- routes/               <!-- actions -->
--------- public/               <!-- static files like styles and images -->
----- <app name 2>/
--------- same as above
----- ...
----- <app name n>/
--------- same as above
- build/                        <!-- codes build from src -->
----- debug/
----- test/
----- release/
```