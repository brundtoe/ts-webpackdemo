# Demo webpack, TypeScript og Boostrap

Et eksemple på en frontend der er udviklet med

- webpack
- TypeScript
- Bootstrap

Der blev oprindeligt anvendt Sass styelsheets, men disse er udfacet som følge af inkompabilitet mellem packe sass og bootstrap, som blokerende for opdateringer. *Se [Changelog for detaljer](CHANGELOG.md)


## Se beskrivelsen i PyCharm vejl

- projekter webpack-demo
- vuejs webpack

## run appen
```
  "scripts": {
    "start": "http-server dist",
    "watch": "webpack --config webpack.config.js --watch",
    "serve": "webpack serve --open",
    "build": "rm -r dist && webpack --config webpack.config.js",
    "deprecation": "node --trace-deprecation node_modules/webpack/bin/webpack.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "cypress": "npx cypress open"
  },
```

## Test end2end med Cypress

Testen runnes med::

    npx cypress open

konfiguraitonen i cypress.json angiver

- system node.js anvendes ej den i Cypress
- baseUrl http://loclhost.8080 - hvilket svarer til default
