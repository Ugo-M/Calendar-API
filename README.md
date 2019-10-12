# M5301

[![Build Status](https://travis-ci.org/Ugo-M/M5301.svg?branch=master)](https://travis-ci.org/Ugo-M/M5301)

## Installation

```
cd projetJS
npm install
sudo npm install -g nodemon
```

## Lancement:

`nodemon`

### requêtes curl pour l'insertion:

```
curl -i -X POST -H "Content-Type: application/json" -d '{ "department_name":"Info" }' localhost:3000/api/department

curl -i -X POST -H "Content-Type: application/json" -d '{ "department_id":"1","person_name":"Mekki","person_firstname":"Ugo" }' localhost:3000/api/person
```

### get:

*http://localhost:3000/api/person*

*http://localhost:3000/api/department*




