# Welcome to the doc

[![Build Status](https://travis-ci.org/Ugo-M/Calendar-API.svg?branch=master)](https://travis-ci.org/Ugo-M/Calendar-API)
[![codecov](https://codecov.io/gh/Ugo-M/Calendar-API/branch/master/graph/badge.svg)](https://codecov.io/gh/Ugo-M/Calendar-API)

## Installing the API

* `npm install` - Install the dependencies.
*  Edit the [config/config.json](https://github.com/Ugo-M/Calendar-API/blob/master/config/config.json) file to match your database info.
* `npm run initdb` - Initialize the database.

## Project layout

    config/         # configuration files
    docs/           # The documentation pages.
    migrations/     # Sequelize migrations to initialize the database.
    models/         # The documentation pages.
    routes/         # API routes definition.
    test/           # Tests.
    views/          # Express vues.
    .sequelizerc    # Sequelize configuration file
    .travis.yml     # Travis CI configuration file.
    app.js          # app.js
    mkdocs.yml      # MkDocs configuration file.
    