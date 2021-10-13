# Demo webpack 5, TypeScript 4 og Boostrap 4

##  Opdatering 15. marts 2021

webpack 5 opgradering udført

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
    "depreaction": "node --trace-deprecation node_modules/webpack/bin/webpack.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "cypress": "npx cypress open"
  },
```

## Test end2end med Cypress

testen runnes med::

    npx cypress open

konfiguraitonen i cypress.json angiver

- system node.js anvendes ej den i Cypress
- baseUrl http://loclhost.8080 - hvilket svarer til default
