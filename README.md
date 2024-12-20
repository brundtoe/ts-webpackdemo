# Demo webpack 5, TypeScript 4 og Boostrap 4

## december 2024

Branch master fungerer med 
    sass låst til 1.64.2 og sass-loader til 14.2.1

Branch develop-sass anvendes til eksperimenter med opgradering til seneste udgaver af sass og sass-loader 

Udfordringene er bootstrap inkompabilitet med den igangværende omlægninger af Sass API

> https://github.com/twbs/bootstrap/issues/40849
> https://github.com/twbs/bootstrap/issues/40962

I de to issues beskrives workarpund i webpack.config.js.

Har fastholdt løsning med låste versioner af sass og sass-loader.

## august 2024

Udfordringer med css-loader, sass og sassl-loader løst

Variable skal i css filer anvendes med

     background-color: #{$jb-light};

Det var denne der var årsagen

> https://sass-lang.com/documentation/breaking-changes/css-vars/

Det var ikke som første antaget denne
> https://sass-lang.com/documentation/breaking-changes/mixed-decls/

## Opdatering november 2023

- Opgraderet til typescript 5.3.2 og cypress 13.6.0
- i tscofig.json sat  "sourceMap": false,

Med denne anbefalede omgåelse fungerer det med typscript 5.x

Det Kendte issue eksisterer fortsat
> https://github.com/cypress-io/cypress/issues/26203

Cypress kan nu rapportere forkert linje for fejl

Hvis debug giver bøvl uden sourcemap så reaktiver sourcemap midlertidigt

## Opdatering juni 2023

Npm update udført bortset fra typescript til 5.1.3

Appen kan kompilere og kører med typescript 4.9.5

**Important**
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
