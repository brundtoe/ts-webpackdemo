# Demo webpack 5, TypeScript 4 og Boostrap 4

## Opdatering juni 2023

npm update udført bortset fra typescript til 5.1.3

appen kan kompilere og kører med typescript 4.9.5

**important**
Cypress 12.9.0 kan ikke compilere med typescript 5.0.4

Kendt issue
> https://github.com/cypress-io/cypress/issues/26203


## Opdatering december 2022

- webstorm inspections udført, resterende kan ikke fjernes
- node packages opdateret
- cypress test udført med docker run, http server run og webpack-dev-server

##  Opdatering 15. marts 2021

Webpack 5 opgradering udført

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

Testen runnes med::

    npx cypress open

konfiguraitonen i cypress.json angiver

- system node.js anvendes ej den i Cypress
- baseUrl http://loclhost.8080 - hvilket svarer til default
